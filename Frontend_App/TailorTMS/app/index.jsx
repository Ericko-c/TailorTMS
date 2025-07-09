import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
export default function Index() {
  const router = useRouter();
  const handleConfirm = () => {
    router.push("../Signin");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.topContainer}>
          <View style={styles.dropContainer}></View>
          <View style={styles.LogoContainer}>
            <Text style={styles.logoText}>
              Tailor<Text style={styles.subText}>TMS</Text>
            </Text>
            <Text>Where Tailoring Meets Technology</Text>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handleConfirm}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topContainer: {
    width: "100%",
    height: 50,
    backgroundColor: "#ffff",
  },
  dropContainer: {
    width: 200,
    height: 200,
    backgroundColor: "#145A32",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 100,
    position: "absolute",
    marginTop: -10,
    right: -55,
  },
  LogoContainer: {
    width: "100%",
    height: 200,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    position: "absolute",
    marginTop: "90%",
  },
  logoText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#145A32",
    textAlign: "center",
    marginTop: 10,
  },
  subText: {
    color: "#D4AF37",
    fontSize: 30,
    fontWeight: "bold",
  },
  buttonContainer: {
    width: "70%",
    height: 50,
    backgroundColor: "#145A32",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginTop: "30%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "semibold",
    textAlign: "center",
  },
});