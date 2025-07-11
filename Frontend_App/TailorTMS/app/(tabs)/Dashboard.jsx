import { router } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Touchable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useEffect, useState } from "react";
import { SERVER_URI } from "../../constants/SERVER_URI.jsx";
import Loader from "../../componets/loader.jsx";
import useAuthStore from "../../zustand/store.jsx";
import { OrdersStatusBarGraph } from "../../componets/Analytics/ordersStatus.jsx";
import ToastComponent from "../../componets/Toast.jsx";

export default function StationInfoScreen() {
  const { user } = useAuthStore();

  const [Loading, setLoading] = useState(false);
  const [apiResponse, setAPIResponse] = useState(null);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [doneOrders, setDoneOrders] = useState(0);
  const [OrdersInProgress, setOrdersInProgress] = useState(0);
  const [pickedOrders, setPickedOrders] = useState(0);
  const [Orders, setOrders] = useState([]);

  // fetch all orders
  useEffect(() => {
    const getAllOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${SERVER_URI}/api/v1/orders/all/`);
        const result = response.data;
        // console.log(result)
        if (result.success) {
          setAPIResponse(result);
          setOrders(result.orders);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.log("an error occured", error.message);
        ToastComponent("error", error.message);
      }
      setLoading(false);
    };
    getAllOrders();
  }, []);

  // get total sales
  useEffect(() => {
    const getTotalSales = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${SERVER_URI}/api/v1/orders/totalAmount/`
        );
        const result = response.data;
        // console.log(result)
        if (result.success) {
          setTotalSales(result.totalAmount);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.log("an error occured", error.message);
        ToastComponent("error", error.message);
      }
      setLoading(false);
    };
    getTotalSales();
  }, []);

  // get complete/done orders
  useEffect(() => {
    const getDoneOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${SERVER_URI}/api/v1/orders/status/done`
        );
        const result = response.data;
        // console.log(result)
        if (result.success) {
          setDoneOrders(result.totalOrders);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.log("an error occured", error.message);
        ToastComponent("error", error.message);
      }
      setLoading(false);
    };
    getDoneOrders();
  }, []);

  // get pending orders
  useEffect(() => {
    const getPendingOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${SERVER_URI}/api/v1/orders/status/placed`
        );
        const result = response.data;
        // console.log(result)
        if (result.success) {
          setPendingOrders(result.totalOrders);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.log("an error occured", error.message);
        ToastComponent("error", error.message);
      }
      setLoading(false);
    };
    getPendingOrders();
  }, []);

  // get orders in progress
  useEffect(() => {
    const getOrdersInProgress = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${SERVER_URI}/api/v1/orders/status/inprogress`
        );
        const result = response.data;
        // console.log(result)
        if (result.success) {
          setOrdersInProgress(result.totalOrders);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.log("an error occured", error.message);
        ToastComponent("error", error.message);
      }
      setLoading(false);
    };
    getOrdersInProgress();
  }, []);

  // get picked orders
  useEffect(() => {
    const getPickedOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${SERVER_URI}/api/v1/orders/status/picked`
        );
        const result = response.data;
        // console.log(result)
        if (result.success) {
          setPickedOrders(result.totalOrders);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.log("an error occured", error.message);
        ToastComponent("error", error.message);
      }
      setLoading(false);
    };
    getPickedOrders();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        <Text style={styles.titleTxt}>
          Welcome back{" "}
          <Text style={styles.subTxt}>{user?.username || "Tailor"}!</Text>
        </Text>
        <View style={styles.TopContainer1}>
          <TouchableOpacity
            style={styles.Tcontainer101}
            onPress={() => router.push("/Analytics")}
          >
            <Text style={styles.TopTxt}>Total Sales</Text>
            {Loading ? (
              <Loader />
            ) : (
              <Text style={styles.TopSubTxt}>Ksh {totalSales || 0}</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Tcontainer102}
            onPress={() => router.push("/Orders")}
          >
            <Text style={styles.TopTxt}>Received Orders</Text>
            {Loading ? (
              <Loader />
            ) : (
              <Text style={styles.TopSubTxt}>
                {apiResponse?.totalOrders || 0}
              </Text>
            )}
          </TouchableOpacity>
        </View>
        {/* container 2 */}
        <View style={styles.TopContainer2}>
          <TouchableOpacity
            style={styles.Tcontainer201}
            onPress={() => router.push("/Orders")}
          >
            <Text style={styles.TopTxt}>Complete Orders</Text>
            {Loading ? (
              <Loader />
            ) : (
              <Text style={styles.TopSubTxt}>{doneOrders || 0}</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Tcontainer203}
            onPress={() => router.push("/Orders")}
          >
            <Text style={styles.TopTxt}>Pending Orders</Text>
            {Loading ? (
              <Loader />
            ) : (
              <Text style={styles.TopSubTxt}>{pendingOrders || 0}</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* container 3 */}
        <View style={styles.TopContainer2}>
          <TouchableOpacity
            style={styles.Tcontainer103}
            onPress={() => router.push("/Orders")}
          >
            <Text style={styles.TopTxt}>Orders Inprogress</Text>
            {Loading ? (
              <Loader />
            ) : (
              <Text style={styles.TopSubTxt}>{OrdersInProgress || 0}</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Tcontainer202}
            onPress={() => router.push("/Orders")}
          >
            <Text style={styles.TopTxt}>Picked Orders</Text>
            {Loading ? (
              <Loader />
            ) : (
              <Text style={styles.TopSubTxt}>{pickedOrders || 0}</Text>
            )}
          </TouchableOpacity>
        </View>
        {/* analytics section */}
        <View style={styles.analyticsContainer}>
          {/* graph */}
          <View>
            <OrdersStatusBarGraph />
          </View>
        </View>

        {/* history section */}
        <View style={styles.historyContainer}>
          <View style={styles.historyTopC}>
            <Text>Recent Orders</Text>
            <TouchableOpacity onPress={() => router.push("/Orders")}>
              <Text style={styles.subTxt}>View All</Text>
            </TouchableOpacity>
          </View>

          {/* orders */}
          <View
            style={{
              gap: 10,
              borderBottomColor: "#077E8C",
              height: 550,
              borderBottomWidth: 2,
              overflow: "hidden",
            }}
          >
            {/* emergency orders */}

            {Loading ? (
              <View>
                <Loader />
              </View>
            ) : (
              <>
                {/*orders */}
                <View style={{ gap: 10 }}>
                  {Orders?.map((order, index) => (
                    <View
                      key={order._id || index}
                      style={styles.orderContainer}
                    >
                      <Text style={styles.subTxt}>Order ID: {order._id}</Text>
                      <Text>Customer Name: {order?.clientName}</Text>
                      <Text>Customer Contact: {order?.clientPhoneNo}</Text>
                      <Text>Measurements: {order?.measurements}</Text>
                      <Text>Amount Charged: Ksh. {order?.amount}</Text>
                      <Text>Priority : {order?.urgency}</Text>
                      <View style={styles.StatusContainer}>
                        <Text>
                          Status :{" "}
                          <Text style={styles.subTxt}>{order?.status}</Text>
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </>
            )}
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
  titleTxt: {
    textAlign: "center",
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: 16,
    fontWeight: "semibold",
  },
  subTxt: {
    color: "#077E8C",
  },
  TopContainer1: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    gap: 20,
  },
  TopContainer2: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    gap: 20,
    marginTop: 15,
  },
  Tcontainer101: {
    backgroundColor: "#145A32",
    padding: 15,
    borderRadius: 10,
    width: 150,
    justifyContent: "center",
  },
  Tcontainer201: {
    backgroundColor: "#28A745",
    padding: 15,
    borderRadius: 10,
    width: 150,
    justifyContent: "center",
  },
  Tcontainer102: {
    backgroundColor: "#D4AF37",
    padding: 15,
    borderRadius: 10,
    width: 150,
    justifyContent: "center",
  },
  Tcontainer103: {
    backgroundColor: "gray",
    padding: 15,
    borderRadius: 10,
    width: 150,
    justifyContent: "center",
  },
  Tcontainer202: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
    width: 150,
    justifyContent: "center",
  },
  Tcontainer203: {
    backgroundColor: "#F0AD4E",
    padding: 15,
    borderRadius: 10,
    width: 150,
    justifyContent: "center",
  },
  TopTxt: {
    color: "#ffff",
    fontSize: 16,
    textAlign: "center",
  },
  TopSubTxt: {
    color: "#ffff",
    paddingTop: 2,
    textAlign: "center",
    fontSize: 20,
  },
  // analytics
  analyticsContainer: {
    width: "90%",
    alignSelf: "center",
    borderColor: "#2F2C2C",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
  },
  // history section
  historyContainer: {
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    padding: 10,
  },
  historyTopC: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  orderContainer: {
    flexDirection: "column",
    backgroundColor: "#ffff",
    padding: 10,
    borderRadius: 10,
  },
  BTNContainer: {
    backgroundColor: "#077E8C",
    padding: 5,
    borderRadius: 10,
    width: 70,
  },
  BtnTxt: {
    color: "#ffff",
    fontSize: 12,
    textAlign: "center",
  },
  StatusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
  },
});
