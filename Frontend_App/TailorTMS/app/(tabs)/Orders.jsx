import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import axios from "axios";
import { useEffect, useState } from "react";
import { SERVER_URI } from "../../constants/SERVER_URI.jsx";
import Loader from "../../componets/loader.jsx";
import useAuthStore from "../../zustand/store.jsx";
import ToastComponent from "../../componets/Toast";
import { Picker } from "@react-native-picker/picker";

export default function OrdersScreen() {
  const station = useAuthStore((state) => state.station);

  const [stationData, setStationData] = useState(null);
  const [normalOrders, setNormalOrders] = useState([]);
  const [emergencyData, setEmergencyData] = useState([]);

  const [Loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [orderStatus, setOrderStatus] = useState("received");
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [emergencyOrders, setEmergencyOrders] = useState(null);
  const [apiResponse, setAPIResponse] = useState(0);

  useEffect(() => {
    const getStation = async () => {
      if (!station?.id) {
        console.log("station.id not yet available");
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `${SERVER_URI}/api/v1/order/station/${station.id}`
        );
        const result = response.data;
        if (result.stationOrders) {
          setNormalOrders(result.stationOrders);
          setAPIResponse(result.totalOrders);
          setLoading(false);
        }
      } catch (error) {
        setError(true);
        setMessage("An error occurred");
        console.log("API fetch error:", error.response?.data || error.message);
        setError(true);
        setMessage("An error occurred");
      }
      setLoading(false);
    };
    getStation();
  }, []);

  // update order status
  const updateOrder = async () => {
    try {
      if (!selectedOrderId) return;

      setLoading(true);
      const response = await axios.patch(
        `${SERVER_URI}/api/v1/order/update/${selectedOrderId}`,
        {
          newStatus: orderStatus,
        }
      );
      const result = response.data;
      console.log(result.order);
      if (result.success) {
        setLoading(true);
        const response = await axios.get(
          `${SERVER_URI}/api/v1/order/station/${station.id}`
        );
        const result = response.data;
        if (result.stationOrders) {
          setStationData(result.stationOrders);
          setLoading(false);
        }
      } else {
        console.log("Update Failed");
      }
    } catch (error) {
      ToastComponent("error", error.message);
      console.log(error);
    } finally {
      setLoading(false);
      setModalOpen(false);
      setSelectedOrderId(null);
    }
  };

  // update emergency order
  const updateEmergencyOrder = async () => {
    try {
      if (!selectedOrderId) return;

      setLoading(true);
      const response = await axios.patch(
        `${SERVER_URI}/api/v1/order/emergency/${selectedOrderId}/update/`,
        {
          newStatus: orderStatus,
        }
      );
      const result = response.data;
      console.log(result);
      if (result.success) {
        setLoading(true);
        const response = await axios.get(
          `${SERVER_URI}/api/v1/order/emergency/station/${station.id}`
        );
        const result = response.data;
        // console.log(result)
        if (result.success) {
          setEmergencyOrders(result.total);
          setEmergencyData(result.orders);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } else {
        console.log("Update Failed");
      }
    } catch (error) {
      ToastComponent("error", error.message);
      console.log(error);
    } finally {
      setLoading(false);
      setModal2Open(false);
      setSelectedOrderId(null);
    }
  };

  // get emergency orders
  useEffect(() => {
    const getEmergencyOrders = async () => {
      if (!station?.id) {
        console.log("station.id not yet available");
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `${SERVER_URI}/api/v1/order/emergency/station/${station.id}`
        );
        const result = response.data;
        if (result.success) {
          setEmergencyOrders(result.total);
          setEmergencyData(result.orders);
          setLoading(false);
        }
      } catch (error) {
        console.log("an error occured", error.message);
        ToastComponent("error", error.message);
      }
      setLoading(false);
    };
    getEmergencyOrders();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        <View style={styles.historyContainer}>
          <View style={styles.ordersSummary}>
            <Text>
              Total orders : <Text>{apiResponse || 0}</Text>
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#145A32",
                padding: 6,
                borderRadius: 5,
              }}
              onPress={() => setModal2Open(!modal2Open)}
            >
              <Text style={styles.subTxt}>Add Order</Text>
            </TouchableOpacity>
          </View>
          {Loading ? (
            <View>
              <Loader />
            </View>
          ) : (
            <>
              <View style={{ gap: 10 }}>
                {/* emergency orders */}
                {emergencyData?.map((order, index) => (
                  <View key={index._id || index} style={styles.orderContainer}>
                    <Text style={styles.subTxt}>Order ID: {order._id}</Text>
                    <Text>Customer Name: {order?.clientName}</Text>
                    <Text>Customer Contact: {order?.clientPhone}</Text>
                    <Text>Customer Location: {order?.readableLocation}</Text>
                    <Text>Fuel Type: {order?.fuelType}</Text>
                    <Text>Fuel Volume: {order?.fuelVolume} L</Text>

                    <View style={styles.StatusContainer}>
                      <Text>
                        Status :{" "}
                        <Text style={styles.subTxt}>{order?.status}</Text>
                      </Text>
                      <TouchableOpacity
                        style={styles.BTNContainer}
                        onPress={() => {
                          setSelectedOrderId(order._id);
                          setModal2Open(!modal2Open);
                        }}
                      >
                        <Text style={styles.BtnTxt}>Update</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.BTNContainer}
                        onPress={() => handleReceiptDownload(order._id)}
                      ></TouchableOpacity>
                    </View>
                  </View>
                ))}
                {/* modal section */}
                {/* modal one */}
                <View>
                  <Modal
                    visible={modalOpen}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => setModalOpen(!modalOpen)}
                  >
                    <TouchableWithoutFeedback
                      onPress={() => setModalOpen(!modalOpen)}
                    >
                      <View style={styles.modalOverlay}>
                        {Loading ? (
                          <Loader />
                        ) : (
                          <>
                            <Text style={styles.modalText}>Update Order</Text>
                            <Text style={styles.introText}>
                              Select Order status
                            </Text>
                            <Picker
                              selectedValue={orderStatus}
                              onValueChange={(itemValue) =>
                                setOrderStatus(itemValue)
                              }
                              style={styles.picker}
                            >
                              <Picker.Item label="Received" value="received" />
                              <Picker.Item label="Approved" value="approved" />
                              <Picker.Item
                                label="Delivered"
                                value="delivered"
                              />
                              <Picker.Item label="Canceled" value="canceled" />
                            </Picker>
                            <TouchableOpacity
                              onPress={updateOrder}
                              style={styles.updateBtn}
                            >
                              <Text style={styles.updateTxt}>Update Order</Text>
                            </TouchableOpacity>
                          </>
                        )}
                      </View>
                    </TouchableWithoutFeedback>
                  </Modal>
                </View>

                {/* modal two */}
                <View>
                  <Modal
                    visible={modal2Open}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => setModal2Open(!modal2Open)}
                  >
                    <TouchableWithoutFeedback
                      onPress={() => setModal2Open(!modal2Open)}
                    >
                      <View style={styles.modalOverlay}>
                        {Loading ? (
                          <Loader />
                        ) : (
                          <>
                            <Text style={styles.modalText}>Add New Order</Text>
                            <View style={styles.InputsContainer}>
                              <View>
                                <Text style={styles.introText}>
                                  Customer Name
                                </Text>
                                <TextInput
                                  placeholder="Enter Customer Name"
                                  style={styles.textInput}
                                />
                              </View>
                                <View>
                                <Text style={styles.introText}>
                                  Customer Phone No:
                                </Text>
                                <TextInput
                                  placeholder="Enter Customer Phone Number"
                                  style={styles.textInput}
                                  keyboardType="numeric"
                                />
                              </View>
                                <View>
                                <Text style={styles.introText}>
                                  Measurements
                                </Text>
                                <TextInput
                                  placeholder="Enter Customer Measurements"
                                  style={styles.input}
                                  multiline
                                  numberOfLines={4}
                                  maxLength={300}
                                />
                              </View>
                            </View>
                            <TouchableOpacity
                              onPress={updateEmergencyOrder}
                              style={styles.updateBtn}
                            >
                              <Text style={styles.updateTxt}>Add Order</Text>
                            </TouchableOpacity>
                          </>
                        )}
                      </View>
                    </TouchableWithoutFeedback>
                  </Modal>
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subTxt: {
    color: "#fff",
    fontSize: 12,
  },
  orderContainer: {
    flexDirection: "column",
    backgroundColor: "#D9D9D9",
    padding: 10,
    borderRadius: 10,
    gap: 2,
  },
  InputsContainer: {
    flexDirection: "column",
    gap:10
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
  modalOverlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    height:"auto",
    padding: 20,
    marginTop: 100,
  },
  modalText: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
    color: "#ffff",
  },
  introText: {
    color: "#ffff",
  },
  picker: {
    color: "#077E8C",
    backgroundColor: "#ffff",
    marginTop: 15,
    borderRadius: 10,
  },
  updateBtn: {
    backgroundColor: "#145A32",
    marginTop: 25,
    padding: 10,
    borderRadius: 10,
  },
  updateTxt: {
    textAlign: "center",
    color: "#ffff",
  },
  ordersSummary: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 20,
    padding: 15,
  },
  textInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#145A32",
    borderRadius: 10,
    paddingLeft: 10,
    height: 40,
    marginTop: 10,
    backgroundColor: "#fff",
  },
    input: {
    backgroundColor: "#ffff",
    marginTop: 10,
    borderRadius: 10,
    height: 180,
    marginBottom: 15,
    textAlignVertical: "top",
  },
});
