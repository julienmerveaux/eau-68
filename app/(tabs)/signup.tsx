import { useState } from 'react';
import {Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useUserStore } from '../../store/userStore';
import {router} from "expo-router";

export default function Signup() {
  const { signUp } = useUserStore();
  const [name, setName] = useState('test');
  const [email, setEmail] = useState('test@test.fr');
  const [password, setPassword] = useState('test@test59');

  const handleInscription = async () => {
    try {
      await signUp(name, email, password);
      router.push('/');
    } catch (error: any) {
      console.log(error);
      alert(`Erreur lors de l'inscription : ${error.message}`);    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nom"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleInscription}>
          <Text style={styles.buttonText}>S inscrire</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});