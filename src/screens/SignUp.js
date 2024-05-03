import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import MyButton from "../components/MyButton";
import { useNavigation } from "@react-navigation/native";
import { api } from "../services/api";

export default function SignUp() {
  const navigation = useNavigation();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");

  async function handleSubmit() {
    setError("");
    if (!email.trim() || !username.trim() || !password.trim()) {
      setError("Por Favor, preencha todos os campos");
      return;
    }
    try {
      await api.post("register", {
        email,
        username,
        password,

      });
      Alert.alert("Sucesso", "Uuário criado com sucesso!");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      }
      setError("Nâo foi possivel se conectar com o servidor");
    }
  }

  return (
    <View style={style.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Feather name="chevron-left" size={24} color="#8a8787" />
      </TouchableOpacity>
      <View>
        <Text style={style.title}>Estamos quase La!</Text>
        <Text style={style.subtitle}>Faça seu Cadastro para começar a utilizar o app</Text>
      </View>

      <View style={{ gap: 16 }}>
        <View style={style.inputBox}>
          <Feather name="user" size={24} color="#8a8787" />

          <TextInput
            style={style.input}
            placeholder="Digite seu Nome"
            placeholderTextColor="#8a8787"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
        </View>

        <View style={style.inputBox}>
          <Feather name="mail" size={24} color="#8a8787" />

          <TextInput
            style={style.input}
            placeholder="Digite seu Email"
            placeholderTextColor="#8a8787"
            keyboardType="email-address"
            secureTextEntry
            value={email}
            onChangeText={(text) => setEmail(text)}

          />
        </View>

        <View style={style.inputBox}>
          <Feather name="lock" size={24} color="#8a8787" />

          <TextInput
            style={style.input}
            placeholder="Digite sua Senha"
            placeholderTextColor="#8a8787"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        {error && <Text style={style.erro}>{error}</Text>}
        <MyButton
          onPress={() => handleSubmit()}
          text="Cadastrar"
          style={{ with: "100%" }} />
      </View>


    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-between",
    padding: 16,
  },

  title: {
    fontSize: 54,
    fontWeight: "700",
    width: 240,
    color: "#3D3D4D",
  },

  subtitle: {
    fontSize: 20,
    fontWeight: "300",
    width: 280,
    marginTop: 16,
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#8a8787",
    borderRadius: 4,
    width: "100%",
  },

  input: {
    flex: 1,
    fontSize: 18,
  },
  erro: {
    color: "#DC1637",
    fontWeight: "400",
    textAlign: "center",
    marginVertical: 16,
  },
});