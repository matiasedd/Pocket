import React from "react";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Poppins_400Regular as PoppinsRegular,
  Poppins_700Bold as PoppinsBold,
} from "@expo-google-fonts/poppins";

import Landing from "./src/screens/Landing";

export default function App() {
  const [loadedFonts] = useFonts({ PoppinsRegular, PoppinsBold });

  return loadedFonts ? <Landing /> : <AppLoading />;
}
