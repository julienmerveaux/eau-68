import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { communeStore } from '@/store/communeStore';
import { useUserStore } from '@/store/userStore';
import { getDonneesPrincipalesReseau } from '@/services/apiHubeau';
import DonneeCard from "@/app/components/DonneeCard";
import Icon from 'react-native-vector-icons/FontAwesome';
import { CustomPicker } from '@/app/components/CustomPicker';
import {DonneeReseau} from "@/interface/interface"

export default function HomeScreen() {
  const { addFavoriteCommune, deleteFavoriteCommune } = useUserStore();

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

  useEffect(() => {
    if (user && selectedCommune) {
      setIsFavorite(user.favorites?.includes(selectedCommune) ?? false);
    } else {
      setIsFavorite(false);
    }
  }, [user, selectedCommune]);


  const filteredCommunes = communes.filter((commune) =>
      commune.nom_commune.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFavorite = async () => {
    if (!selectedCommune) return;

    try {
      if (!isFavorite) {
        await addFavoriteCommune(selectedCommune);
        console.log("Ajout aux favoris :", selectedCommune);
      } else {
        await deleteFavoriteCommune(selectedCommune);
        console.log("Suppression des favoris :", selectedCommune);
      }
    } catch (error) {
      console.error('Erreur lors du toggle favori :', error);
    }
  };
  return (

      <ScrollView style={styles.container}>
        <View style={styles.containerH1}>
          {user ? (
              <Text style={styles.h1}>Bienvenue {user.name}</Text>
          ) : (
              <Text style={styles.h1}>Recherche des données d une commune</Text>
          )}
        </View>
        <TextInput
            placeholder="Rechercher une commune"
            value={searchTerm}
            onChangeText={setSearchTerm}
            style={styles.input}
            placeholderTextColor="black"

        />


        <View style={styles.pickerRow}>
          <View style={styles.pickerContainer}>
            <CustomPicker
                selectedValue={selectedCommune}
                onValueChange={(value) => {
                  setSelectedCommune(value);
                  setSelectedReseau('');
                }}
                placeholder="Choisir une commune"
                items={filteredCommunes.map(c => ({ label: c.nom_commune, value: c.nom_commune }))}
            />
          </View>

          {user && (
              <TouchableOpacity onPress={toggleFavorite} style={styles.iconButton}>
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
              <CustomPicker
                  selectedValue={selectedReseau}
                  onValueChange={setSelectedReseau}
                  placeholder="Choisir un réseau"
                  items={reseaux.map(r => ({ label: r.nom_reseau, value: r.code_reseau, }))}
              />
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
    paddingTop: 50,
    backgroundColor: 'gray',
  },
  input: {
    height: 40,
    borderColor: 'white',
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
    color: 'gray',
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    color: 'black',
  },
  donneesContainer: {
    marginTop: 20,
  },
  iconButton: {
    marginLeft: 15,
  },
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black',
  },
  containerH1: {
    alignItems: 'center',
  }
});
