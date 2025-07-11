import { router } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuthStore from "../../zustand/store.jsx";
import {
  OrdersStatusBarGraph,
  SalesPieChart,
} from "../../componets/Analytics/ordersStatus.jsx";
import { SalesBarGraph } from "../../componets/Analytics/sales.jsx";

export default function StationAnalytics() {
  const user = useAuthStore((state) => state.user);

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        <View style={styles.AnalyticsContainer}>
          <View>
            <Text style={styles.WelcomeTxt}>
              Hello{" "}
              <Text style={styles.SubTxt}>{user?.username || "Tailor"}</Text>
            </Text>
            <Text style={styles.BusTxt}>Business Analysis Summary</Text>
          </View>
          {/* graph container */}
          <View style={styles.analyticsContainer}>
            <OrdersStatusBarGraph />
          </View>
          <View style={styles.analyticsContainer}>
            <SalesBarGraph />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  AnalyticsContainer: {
    width: "85%",
    alignSelf: "center",
    paddingTop: 30,
    paddingBottom: 50,
  },
  WelcomeTxt: {
    fontSize: 22,
    fontWeight: "semibold",
    paddingBottom: 10,
    textAlign: "center",
  },
  SubTxt: {
    color: "#077E8C",
  },
  BusTxt: {
    textAlign: "center",
  },
  analyticsContainer: {
    alignSelf: "center",
    borderColor: "#2F2C2C",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
    padding: 10,
  },
});
