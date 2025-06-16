import { StyleSheet, View, TextInput, Button } from 'react-native';
import {useState} from "react";
import {useUserStore} from "@/store/userStore"
import {router} from "expo-router";

export default function Login() {
  const [email, setEmail] = useState('julien@test.fr');
  const [password, setPassword] = useState('Test@90');
  const { login } = useUserStore();

  const handleLogin = async () => {
    try {
      await login(email, password);
      router.replace('/')
    }catch (error: any) {
      alert(error.message);
    }
  }
  return (
    <View style={styles.container}>
      <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
      ></TextInput>

      <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry={true}
      ></TextInput>

      <View style={styles.button}>
        <Button title="Login" onPress={handleLogin}  />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f8',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#007bff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

