import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useUserStore } from '@/store/userStore';
import CommuneFavoriteItem from "@/app/components/CommuneFavoriteItem";

export default function ListOfCommuneFav() {
    const user = useUserStore((state) => state.user);

    if (!user || !user.favorites || user.favorites.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.emptyText}>Aucune commune favorite.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Communes favorites :</Text>

            <FlatList
                data={user.favorites}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <CommuneFavoriteItem commune={item} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        padding: 16,
        backgroundColor: 'gray',
        flex: 1,
    },
    emptyText: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
        marginTop: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
    },
});
