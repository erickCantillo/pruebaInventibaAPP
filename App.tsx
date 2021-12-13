import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';

import { StyleSheet, Text, View, Button, Alert,TextInput  } from 'react-native';

export default function App() {
  const [state, setState] = useState({
    email: '',
    password: '',
  });

 function handleChangeText(name: any, value: any) {
    setState({ ...state, [name]:value })
  }
  const consultarApi = () => {
    return fetch('https://pure-falls-97819.herokuapp.com/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: state.email,
        password: state.password
      })
    }).then((response) => response.json()) .then((json) => {
       if(json.estado == 'OK'){
         Alert.alert("Estas Son las Credenciales Correctas")
       }else{
        Alert.alert("Estas NO Son las Credenciales Correctas")
       }
    });
  };
  
  const enviarDatos =() => {
    if(state.email === '' || state.password === ''){
      Alert.alert("Escribe todos los Datos Por Favor")
    }else{
      consultarApi()
    }
    
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entra a tu Cuenta!</Text>
      <StatusBar style="auto" />
      <Text style={styles.label}>Correo</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite El Correo"
        onChangeText ={(value) => handleChangeText('email', value)}
      />
      <Text style={styles.label}>Constraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite la Contraseña"
        secureTextEntry={true}
        onChangeText ={(value) => handleChangeText('password', value)}
      />
      <Button 
      color="green"
      title ="Iniciar Sesión"
      onPress={() => enviarDatos()}
      />

     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize : 30,
    marginTop: 20,
  },
  label: {
    fontSize : 10,
    marginTop: 20,
    textAlign: 'right'
  },
  botones: {
   
    marginTop: 200
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
