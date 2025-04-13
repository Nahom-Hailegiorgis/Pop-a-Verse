import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import ChatWindow from "./components/ChatWindow";

export default function App() {
  const [currentTheme, setcurrentTheme] = useState(0);

  return (
    <View style={styles.container}>
      <Header />
      <SideBar currentTheme={currentTheme} setcurrentTheme={setcurrentTheme} />
      <ChatWindow
        currentTheme={currentTheme}
        setcurrentTheme={setcurrentTheme}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#584D3D",
  },
});
