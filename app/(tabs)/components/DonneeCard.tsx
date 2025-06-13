import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface DonneeReseau {
    date_prelevement: string;
    nom_commune: string;
    installation: string;
    service_public_distribution: string;
    conclusions_sanitaires: string;
    conformite_bacteriologique: string;
    conformite_physico_chimique: string;
    respect_references_qualite: string;
}

interface DonneeCardProps {
    donnee: DonneeReseau;
}

export default function DonneeCard({ donnee }: DonneeCardProps) {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>Date prélèvement : {new Date(donnee.date_prelevement).toLocaleDateString()}</Text>
            <Text>Commune : {donnee.nom_commune}</Text>
            <Text>Installation : {donnee.installation}</Text>
            <Text>Service public distribution : {donnee.service_public_distribution}</Text>
            <Text>Conclusions sanitaires : {donnee.conclusions_sanitaires}</Text>
            <Text>Conformité bactériologique : {donnee.conformite_bacteriologique}</Text>
            <Text>Conformité physico-chimique : {donnee.conformite_physico_chimique}</Text>
            <Text>Respect références qualité : {donnee.respect_references_qualite}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#222',
        padding: 15,
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 4,
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 6,
        color: '#fff',
        fontSize: 16,
    },
});
