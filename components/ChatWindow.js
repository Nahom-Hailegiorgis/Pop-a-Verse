import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions,
  Platform,
  StyleSheet,
  Keyboard,
  ActivityIndicator,
  Animated,
  Easing,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getGptResponse } from "./backend/gpt";

const { width, height } = Dimensions.get("window");

const getThemeTitle = (index) => {
  switch (index) {
    case 1:
      return "Faith & Trust in God";
    case 2:
      return "Love & Sorrow";
    case 3:
      return "Trials & Endurance";
    case 4:
      return "Repentance & Forgiveness";
    case 5:
      return "Hope & Humility";
    default:
      return "Default - All Spiritual Topics";
  }
};

const getThemePrompt = (index) => {
  switch (index) {
    case 1:
      return `🌟 Faith & Trust in God\n\n"Let your faith be built not on what you see, but on who God is."\n\nReflect on a time when trusting God seemed difficult. What happened when you chose to trust anyway? How can you continue building your faith on the unshakable Rock, even when life feels uncertain?`;

    case 2:
      return `❤️ Love & Sorrow\n\n"To love is to be vulnerable. Even Jesus wept."\n\nWrite about a moment when love brought you sorrow. How did that experience change you? What does God teach you through the pain of loving deeply?`;

    case 3:
      return `🔥 Trials & Endurance\n\n"The pain now is nothing compared to the joy that is to come."\n\nDescribe a trial you're facing or have overcome. How has God strengthened you through it? What does it mean for you to “run the good race”?`;

    case 4:
      return `🩸 Repentance & Forgiveness\n\n"We are not saved by works, but by faith through grace."\n\nIs there a sin or mistake that’s been hard to let go of? What would it look like to truly repent from the heart and accept God’s forgiveness? What keeps you from turning back fully?`;

    case 5:
      return `☀️ Hope & Humility\n\n"Love is patient, love is kind... it is not proud."\n\nWhen have you had to humble yourself in a difficult moment? How can hope help you stay grounded and peaceful in a world filled with pride and comparison?`;

    default:
      return `📖 Default - All Spiritual Topics\n\nReflect freely on your spiritual journey today. Where are you feeling God the most? Where do you feel distant? Be honest, be open, and let your spirit speak.`;
  }
};

const ChatWindow = ({ currentTheme, setcurrentTheme }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mainTop, setmainTop] = useState(height * 0.11);
  const scrollViewRef = useRef(null); // For auto-scroll

  const animatedValue = new Animated.Value(mainTop);

  const animateMainTop = (toValue) => {
    Animated.timing(animatedValue, {
      toValue,
      duration: 25,
      easing: Easing.elastic,
      useNativeDriver: false,
    }).start(() => {
      setmainTop(toValue);
    });
  };
  const handleFocus = () => {
    animateMainTop(height * -0.19);
  };

  const handleBlur = () => {
    animateMainTop(height * 0.11);
  };

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    // Append user's message
    const newMessages = [...messages, { role: "user", content: trimmed }];
    setMessages(newMessages);
    setInput("");

    // Set loading state to true before sending request
    setLoading(true);

    try {
      // Send to OpenAI
      const response = await getGptResponse(trimmed, currentTheme);
      setMessages([...newMessages, { role: "assistant", content: response }]);
    } catch (error) {
      console.error("Error fetching AI response", error);
    } finally {
      // Set loading state to false after response
      setLoading(false);
    }
  };

  const handleClear = () => setMessages([]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "position"}
      style={[styles.container, { top: mainTop }]}
    >
      <View style={styles.header}>
        <Text style={styles.headertext}>{getThemeTitle(currentTheme)}</Text>
        <Pressable style={styles.cleartextbtn}>
          <Ionicons
            name="exit-outline"
            size={height * 0.04}
            onPress={handleClear}
            color={"#998870"}
          />
        </Pressable>
      </View>
      <ScrollView
        style={styles.messagearea}
        contentContainerStyle={{ paddingBottom: 20 }}
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: true })
        }
      >
        {messages.length === 0 && (
          <Text style={styles.prompttext}>{getThemePrompt(currentTheme)}</Text>
        )}
        {messages.map((msg, index) => (
          <View
            key={index}
            style={{
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.role === "user" ? "#998870" : "#B3A694",
              borderRadius: 10,
              marginVertical: height * 0.011,
              padding: width * 0.0275,
              marginHorizontal: width * 0.01,
              maxWidth: width * 0.75,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 16 }}>{msg.content}</Text>
          </View>
        ))}

        {loading && (
          <View
            style={{
              alignSelf: "flex-start",
              backgroundColor: "#B3A694",
              borderRadius: 10,
              marginVertical: 6,
              padding: 10,
              maxWidth: width * 0.75,
            }}
          >
            <ActivityIndicator size="small" color="#fff" />
          </View>
        )}
      </ScrollView>
      <View style={styles.inputarea}>
        <TextInput
          style={styles.message}
          value={input}
          maxLength={250}
          placeholder="Send a message."
          keyboardType="default"
          clearButtonMode="always"
          onChangeText={setInput}
          returnKeyType="default"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <Pressable style={styles.sendButton} onPress={handleSend}>
          <Ionicons name="send" size={height * 0.04} color={"#998870"} />
        </Pressable>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footertext}>&copy; 2025 Pop a Verse.</Text>
        <Text style={styles.footertext}>
          All rights reserved by Nahom Hailegiorgis.
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: width,
    bottom: height * 0.11,
    width: width,
    height: height * 0.8,
    alignSelf: "center",
    backgroundColor: "#5F5344",
    zIndex: 1,
  },
  header: {
    position: "absolute",
    top: height * 0,
    left: 0,
    right: width,
    bottom: height * 0.11,
    width: width,
    height: height * 0.075,
    alignSelf: "center",
    backgroundColor: "#584D3D",
    zIndex: 2,
  },
  headertext: {
    position: "absolute",
    top: height * 0.0175,
    alignSelf: "center",
    color: "#B3A694",
    fontSize: height * 0.03,
  },
  prompttext: {
    position: "absolute",
    top: height * 0.0175,
    textAlign: "center",
    color: "#B3A694",
    fontSize: height * 0.02,
  },
  cleartextbtn: {
    position: "absolute",
    top: height * 0.015,
    left: width * 0.9,
    borderRadius: 15,
  },
  messagearea: {
    position: "absolute",
    top: height * 0.0875,
    width: width * 0.95,
    height: height * 0.615,
    backgroundColor: "#776955",
    alignSelf: "center",
    borderRadius: 15,
    zIndex: 2,
  },
  inputarea: {
    position: "absolute",
    top: height * 0.709,
    width: width * 0.9,
    height: height * 0.0825,
    backgroundColor: "#5F5744",
    paddingLeft: width * 0.04,
    alignSelf: "center",
    borderRadius: 10,
    zIndex: 2,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,

    elevation: 4,
  },
  message: {
    position: "absolute",
    top: height * 0.0175,
    left: width * 0.03,
    width: width * 0.7,
    height: height * 0.05,
    backgroundColor: "#8F7E66",
    borderRadius: 10,
    zIndex: 2,
    color: "#fff",
    paddingLeft: width * 0.03,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,

    elevation: 3,
  },
  sendButton: {
    position: "absolute",
    right: 10,
    top: height * 0.018,
    zIndex: 3,
  },
  footer: {
    position: "absolute",
    top: height * 0.8,
    left: 0,
    right: width,
    bottom: height * 0.11,
    width: width,
    height: height * 0.075,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0)",
    zIndex: 2,
  },
  footertext: {
    color: "#C4BAAB",
    textAlign: "center",
    paddingTop: height * 0.01,
    fontSize: height * 0.0175,
    fontStyle: "italic",
    fontFamily: "helvetica",
  },
});

export default ChatWindow;
