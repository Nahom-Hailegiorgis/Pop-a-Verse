import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { use, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

const { width, height } = Dimensions.get("window");

const Header = () => {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pop a Verse 🕊️</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: width,
    bottom: height * 0.11,
    width: width,
    height: height * 0.11,
    alignSelf: "center",
    backgroundColor: "#786A54",
    zIndex: 3,
  },
  text: {
    position: "absolute",
    top: height * 0.04,
    left: width * 0.215,
    color: "#B3A694",
    fontSize: height * 0.045,
    fontFamily: "Poppins_400Regular",
  },
});

export default Header;
