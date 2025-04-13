import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  Animated,
  Easing,
  Platform,
  ScrollView,
  Keyboard,
} from "react-native";
import React, { use, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

const { width, height } = Dimensions.get("window");

const SideBar = ({ currentTheme, setcurrentTheme }) => {
  const [isMenuOpen, setisMenuOpen] = useState(false);

  const sidebarPosition = useRef(new Animated.Value(-width * 0.7)).current;

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const toggleMenu = () => {
    setisMenuOpen((prev) => {
      const newValue = !prev;

      Animated.timing(sidebarPosition, {
        toValue: newValue ? 0 : -width * 0.7,
        duration: 400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();

      console.log("isMenuOpen:", newValue);
      return newValue;
    });
  };

  return (
    <View>
      <Pressable style={styles.hamburger}>
        <Ionicons
          name="menu"
          size={height * 0.04}
          onPress={toggleMenu}
          color={isMenuOpen ? "#544B3B" : "#B4A993"}
        />
      </Pressable>
      <Animated.View
        style={[
          styles.sidebar,
          { transform: [{ translateX: sidebarPosition }] },
        ]}
      >
        <Pressable style={styles.theme} onPress={() => setcurrentTheme(0)}>
          <Text style={styles.text}>🙏 Default Theme</Text>
        </Pressable>
        <View style={styles.br} />
        <Pressable style={styles.theme} onPress={() => setcurrentTheme(1)}>
          <Text style={styles.text}>🌿 Faith & Trust in God</Text>
        </Pressable>
        <View style={styles.br} />
        <Pressable style={styles.theme} onPress={() => setcurrentTheme(2)}>
          <Text style={styles.text}>❤️ Love & Sorrow</Text>
        </Pressable>
        <View style={styles.br} />
        <Pressable style={styles.theme} onPress={() => setcurrentTheme(3)}>
          <Text style={styles.text}>🔥 Trials & Endurance</Text>
        </Pressable>
        <View style={styles.br} />
        <Pressable style={styles.theme} onPress={() => setcurrentTheme(4)}>
          <Text style={styles.text}>💧 Repentance & Forgiveness</Text>
        </Pressable>
        <View style={styles.br} />
        <Pressable style={styles.theme} onPress={() => setcurrentTheme(5)}>
          <Text style={styles.text}>🌟 Hope & Humility</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  hamburger: {
    position: "absolute",
    top: height * 0.0225,
    left: width * 0.005,
    padding: height * 0.03,
    zIndex: 4,
  },
  sidebar: {
    backgroundColor: "#483F33",
    position: "relative",
    left: -width * 0.025,
    height: height * 0.525,
    width: width * 0.725,
    borderRadius: 15,
    zIndex: 2,
  },
  theme: {
    flexDirection: "row",
    paddingHorizontal: width * 0.015,
    marginVertical: height * 0.01,
    position: "relative",
    top: height * 0.1175,
    left: width * 0.055,
    zIndex: 3,
  },
  text: {
    fontSize: height * 0.025,
    fontFamily: "Poppins_400Regular",
    color: "#fff",
  },
  br: {
    width: width * 0.6,
    height: height * 0.0045,
    borderRadius: 15,
    backgroundColor: "#544B3B",
    position: "relative",
    top: height * 0.1175,
    left: width * 0.055,
    zIndex: 4,
  },
});

export default SideBar;
