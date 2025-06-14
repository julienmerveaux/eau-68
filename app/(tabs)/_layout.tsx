// import {Tabs} from 'expo-router';
// import React from 'react';
// import {Platform} from 'react-native';
//
// import {HapticTab} from '@/components/HapticTab';
// import {IconSymbol} from '@/components/ui/IconSymbol';
// import TabBarBackground from '@/components/ui/TabBarBackground';
// import {Colors} from '@/constants/Colors';
// import {useColorScheme} from '@/hooks/useColorScheme';
// import {useUserStore} from '@/store/userStore';  // importe ton store user
//
// export default function TabLayout() {
//     const colorScheme = useColorScheme();
//     const user = useUserStore((state) => state.user);
//     return (
//
//         <Tabs
//             screenOptions={{
//                 tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
//                 headerShown: true,
//                 tabBarButton: HapticTab,
//                 tabBarBackground: TabBarBackground,
//                 tabBarStyle: Platform.select({
//                     ios: {
//                         position: 'absolute',
//                     },
//                     default: {},
//                 }),
//             }}
//         >
//             <Tabs.Screen
//                 name="index"
//                 options={{
//                     title: 'Home',
//                     tabBarIcon: ({color}) => <IconSymbol size={28} name="house.fill" color={color}/>,
//                 }}
//             />
//
//             {!user ? (
//                 <>
//                     <Tabs.Screen
//                         name="ScreenLogin"
//                         options={{
//                             title: 'Login',
//                             tabBarIcon: ({color}) => <IconSymbol size={28} name="paperplane.fill" color={color}/>,
//                         }}
//                     />
//                     <Tabs.Screen
//                         name="ScreenInscription"
//                         options={{
//                             title: 'Inscription',
//                             tabBarIcon: ({color}) => <IconSymbol size={28} name="paperplane.fill" color={color}/>,
//                         }}
//                     />
//                 </>
//             ) : (
//                 <>
//                     <Tabs.Screen
//                         name="ScreenDeconnexion"
//                         options={{
//                             title: 'Déconnexion',
//                             tabBarIcon: ({color}) => <IconSymbol size={28} name="arrow.right.square.fill" color={color}/>,
//                         }}
//                     />
//                     <Tabs.Screen
//                         name="listOfCommuneFav"
//                         options={{
//                             title: 'listOfCommuneFav',
//                             tabBarIcon: ({color}) => <IconSymbol size={28} name="arrow.right.square.fill" color={color}/>,
//                         }}
//                     />
//                 </>
//
//
//             )}
//         </Tabs>
//     );
// }

import { Slot, useRouter } from 'expo-router';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useUserStore } from '@/store/userStore';

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
            {/* Affiche le contenu de la page actuelle */}
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

function NavButton({ title, onPress }) {
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
