import React from 'react';
import { View, Text, StyleSheet, Platform, useWindowDimensions } from 'react-native';
import {DonneeReseau} from "@/interface/interface";

interface DonneeCardProps {
    donnee: DonneeReseau;
}

export default function DonneeCard({ donnee }: DonneeCardProps) {
    const { width } = useWindowDimensions();

    const isWeb = Platform.OS === 'web';
    const isWideScreen = isWeb && width > 800;

    return (
        <View style={[styles.card, isWideScreen && styles.cardWeb]}>
            <Text style={styles.title}>
                📅 {new Date(donnee.date_prelevement).toLocaleDateString()}
            </Text>
            <Text style={styles.item}>🏘️ Commune : {donnee.nom_commune}</Text>
            <Text style={styles.item}>🏗️ Installation : {donnee.installation}</Text>
            <Text style={styles.item}>🚰 Distribution : {donnee.service_public_distribution}</Text>
            <Text style={styles.item}>✅ Sanitaire : {donnee.conclusions_sanitaires}</Text>
            <Text style={styles.item}>🦠 Bactério : {donnee.conformite_bacteriologique}</Text>
            <Text style={styles.item}>🧪 Physico-chimique : {donnee.conformite_physico_chimique}</Text>
            <Text style={styles.item}>📊 Réf. qualité : {donnee.respect_references_qualite}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#1c1c1e',
        padding: 16,
        marginVertical: 10,
        marginHorizontal: 12,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    cardWeb: {
        display: 'flex',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    item: {
        fontSize: 14,
        color: '#ddd',
        marginBottom: 4,
    },
});
