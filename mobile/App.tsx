import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  useFonts,
  Poppins_400Regular as PoppinsRegular,
  Poppins_500Medium as PoppinsBold,
} from "@expo-google-fonts/poppins";

export default function App() {
  useFonts({ PoppinsRegular, PoppinsBold });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Olá mundo</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "PoppinsRegular",
  },
});
