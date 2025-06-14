import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { communeStore } from '@/store/communeStore';
import { useUserStore } from '@/store/userStore';
import { getDonneesPrincipalesReseau, DonneeReseau } from '@/services/apiHubeau';
import DonneeCard from "@/app/components/DonneeCard";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function HomeScreen() {
    const fetchCommunes = communeStore((state) => state.fetchCommuneHautRhin);
    const fetchReseaux = communeStore((state) => state.fetchReseauxByCommune);
    const communes = communeStore((state) => state.communes);
    const reseaux = communeStore((state) => state.resauxDistribution);
    const user = useUserStore((state) => state.user);

    const [selectedCommune, setSelectedCommune] = useState<string>('');
    const [selectedReseau, setSelectedReseau] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [donneesPrincipales, setDonneesPrincipales] = useState<DonneeReseau[]>([]);
    const [loadingDonnees, setLoadingDonnees] = useState(false);
    const [errorDonnees, setErrorDonnees] = useState<string | null>(null);
    const [isFavorite, setIsFavorite] = useState(false);

    // Hauteur des Picker selon plateforme
    const pickerHeight = Platform.OS === 'web' ? 50 : 200;

    useEffect(() => {
        fetchCommunes();
    }, []);

    useEffect(() => {
        if (selectedCommune) {
            fetchReseaux(selectedCommune);
            setSelectedReseau('');
            setDonneesPrincipales([]);
        }
    }, [selectedCommune]);

    useEffect(() => {
        if (selectedReseau) {
            setLoadingDonnees(true);
            setErrorDonnees(null);
            getDonneesPrincipalesReseau(selectedReseau)
                .then((data) => setDonneesPrincipales(data))
                .catch((err) => setErrorDonnees(err.message || 'Erreur lors du chargement des données'))
                .finally(() => setLoadingDonnees(false));
        } else {
            setDonneesPrincipales([]);
        }
    }, [selectedReseau]);

    const filteredCommunes = communes.filter((commune) =>
        commune.nom_commune.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <ScrollView style={styles.container}>
            <TextInput
                placeholder="Rechercher une commune"
                value={searchTerm}
                onChangeText={setSearchTerm}
                style={styles.input}
                placeholderTextColor="gray"
            />

            <View style={styles.pickerRow}>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedCommune}
                        onValueChange={(value) => {
                            setSelectedCommune(value);
                            setSelectedReseau('');
                        }}
                        style={[styles.picker, { height: pickerHeight }]}
                        dropdownIconColor="white"
                    >
                        <Picker.Item label="Choisir une commune" value="" />
                        {filteredCommunes.map((commune) => (
                            <Picker.Item
                                key={commune.code_commune}
                                label={commune.nom_commune}
                                value={commune.nom_commune}
                            />
                        ))}
                    </Picker>
                </View>

                {user && (
                    <TouchableOpacity
                        onPress={() => setIsFavorite(!isFavorite)}
                        style={styles.iconButton}
                    >
                        <Icon
                            name={isFavorite ? 'heart' : 'heart-o'}
                            size={24}
                            color={isFavorite ? 'red' : 'white'}
                        />
                    </TouchableOpacity>
                )}
            </View>

            {selectedCommune && (
                <>
                    <Text style={styles.text}>
                        Réseaux de {communes.find((c) => c.nom_commune === selectedCommune)?.nom_commune}
                    </Text>
                    <Picker
                        selectedValue={selectedReseau}
                        onValueChange={setSelectedReseau}
                        style={[styles.picker, { height: pickerHeight }]}
                        dropdownIconColor="white"
                    >
                        <Picker.Item label="Choisir un réseau" value="" />
                        {reseaux.map((reseau) => (
                            <Picker.Item
                                key={reseau.code_reseau}
                                label={reseau.nom_reseau}
                                value={reseau.code_reseau}
                            />
                        ))}
                    </Picker>
                </>
            )}

            {loadingDonnees && <Text style={styles.text}>Chargement des données...</Text>}
            {errorDonnees && <Text style={[styles.text, { color: 'red' }]}>{errorDonnees}</Text>}

            {donneesPrincipales.length > 0 && (
                <View style={styles.donneesContainer}>
                    {donneesPrincipales.map((donnee, index) => (
                        <DonneeCard key={index} donnee={donnee} />
                    ))}
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#121212',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: 10,
        marginBottom: 15,
        color: 'white',
    },
    pickerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    pickerContainer: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 6,
        overflow: 'hidden',
    },
    picker: {
        width: '100%',
        color: 'white',
    },
    text: {
        marginTop: 20,
        fontSize: 16,
        color: 'white',
    },
    donneesContainer: {
        marginTop: 20,
    },
    iconButton: {
        marginLeft: 15,
    }
});
