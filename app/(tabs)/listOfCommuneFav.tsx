import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useUserStore } from '@/store/userStore';

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
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        <Text style={styles.cell}>{item}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
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
    tableHeader: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingBottom: 8,
        marginBottom: 8,
    },
    headerText: {
        flex: 1,
        fontWeight: '600',
        fontSize: 16,
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 8,
        borderBottomWidth: 0.5,
        borderColor: '#eee',
    },
    cell: {
        flex: 1,
        fontSize: 16,
    },
});
