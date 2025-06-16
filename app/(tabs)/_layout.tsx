import { Slot, useRouter } from 'expo-router';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useUserStore } from '@/store/userStore';
import {NavButtonProps} from "@/interface/interface"
import { JSX } from 'react';


export default function Layout() {
    const router = useRouter();
    const user = useUserStore((state) => state.user);
    const deconnected = useUserStore((state) => state.deconnected);

    const handleDeconnexion = async () => {
        try {
            await deconnected();
            router.replace('/'); // Retour à l'accueil après déconnexion
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
        }
    };
    return (
        <View style={styles.container}>
       
            <View style={styles.content}>
                <Slot />
            </View>

            {/* NavBar personnalisée */}
            <View style={styles.navbar}>
                <NavButton title="Accueil" onPress={() => router.replace('/')} />

                {!user ? (
                    <>
                        <NavButton title="Connexion" onPress={() => router.replace('/login')} />
                        <NavButton title="Inscription" onPress={() => router.replace('/signup')} />
                    </>
                ) : (
                    <>
                        <NavButton title="Favoris" onPress={() => router.replace('/listOfCommuneFav')} />
                        <NavButton title="Déconnexion" onPress={handleDeconnexion} />
                    </>
                )}
            </View>
        </View>
    );
}

function NavButton({ title, onPress }: NavButtonProps): JSX.Element {
    return (
        <TouchableOpacity style={styles.navButton} onPress={onPress}>
            <Text style={styles.navButtonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        backgroundColor: '#f8f8f8',
    },
    navButton: {
        padding: 10,
    },
    navButtonText: {
        fontSize: 16,
        color: '#007AFF',
    },
});
