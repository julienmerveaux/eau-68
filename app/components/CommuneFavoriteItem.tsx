import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';

import { communeStore } from '@/store/communeStore';
import DonneeCard from "@/app/components/DonneeCard";
import ExpandableSection from './ExpandableSection';
import { useUserStore } from '@/store/userStore';

interface Props {
    commune: string;
}

export default function CommuneFavoriteItem({ commune }: Props) {
    const deleteFavoriteCommune = useUserStore((state) => state.deleteFavoriteCommune);
    const {
        fetchReseauxByCommune,
        fetchDonneesPrincipalesReseau,
        resauxDistribution,
        donneesPrincipalesReseau,
        isLoading
    } = communeStore();

    const [selectedReseau, setSelectedReseau] = useState('');
    const [hasLoaded, setHasLoaded] = useState(false);

    const handleDelete = async () => {
        try {
            await deleteFavoriteCommune(commune);
        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
        }
    };

    const handleFetchReseaux = async () => {
        await fetchReseauxByCommune(commune);
        setHasLoaded(true);
    };

    const handleReseauSelect = async (codeReseau: string) => {
        setSelectedReseau(codeReseau);
        await fetchDonneesPrincipalesReseau(codeReseau);
    };

    return (
        <View style={styles.block}>
            <ExpandableSection
                header={
                    <View style={styles.row}>
                        <Text style={styles.cell}>{commune}</Text>
                        <TouchableOpacity onPress={handleDelete} style={{ marginLeft: 20 }}>
                            <Icon name="times" size={20} color="red" />
                        </TouchableOpacity>
                    </View>
                }
            >
                {!hasLoaded ? (
                    <TouchableOpacity onPress={handleFetchReseaux}>
                        <Text style={styles.link}>Charger les réseaux</Text>
                    </TouchableOpacity>
                ) : (
                    <>
                        {resauxDistribution.length > 0 && (
                            <Picker
                                selectedValue={selectedReseau}
                                onValueChange={handleReseauSelect}
                                style={styles.picker}
                                itemStyle={{ color: 'black' }}
                            >
                                <Picker.Item label="Sélectionner un réseau" value="" />
                                {resauxDistribution.map((reseau) => (
                                    <Picker.Item
                                        key={reseau.code_reseau}
                                        label={reseau.nom_reseau}
                                        value={reseau.code_reseau}
                                    />
                                ))}
                            </Picker>
                        )}

                        {isLoading && selectedReseau && (
                            <ActivityIndicator size="small" color="#0000ff" />
                        )}

                        {selectedReseau && !isLoading && donneesPrincipalesReseau.length > 0 && (
                            <View style={styles.details}>
                                {donneesPrincipalesReseau.map((data, i) => (
                                    <DonneeCard key={i} donnee={data} />
                                ))}
                            </View>
                        )}
                    </>
                )}
            </ExpandableSection>

        </View>
    );
}

const styles = StyleSheet.create({
    block: {
        marginBottom: 24,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
    },
    cell: {
        fontSize: 16,
        flex: 1,
    },
    link: {
        color: '#007bff',
        marginTop: 10,
    },
    picker: {
        marginTop: 10,
        color: 'black',
    },
    details: {
        marginTop: 10,
    },
});
