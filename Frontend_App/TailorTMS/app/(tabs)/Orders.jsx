import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useEffect, useState } from "react";
import { SERVER_URI } from "../../constants/SERVER_URI.jsx";
import Loader from "../../componets/loader.jsx";
import ToastComponent from "../../componets/Toast";
import { Picker } from "@react-native-picker/picker";

export default function OrdersScreen() {
  const [Loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [orderStatus, setOrderStatus] = useState("received");
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [Orders, setOrders] = useState([]);
  const [apiResponse, setAPIResponse] = useState(0);
  const [sendingSmS, setSendingSmS] = useState(false);

  const [formData, setFormData] = useState({
    clientName: "",
    clientPhoneNo: "",
    measurements:" ",
    amount:0,
    urgency:"high",
    status:"placed"
  });
  
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // update order status
  const updateOrder = async () => {
    try {
      if (!selectedOrderId) return;

      setLoading(true);

      // PATCH to update status
      const patchResponse = await axios.patch(
        `${SERVER_URI}/api/v1/orders/${selectedOrderId}/update/`,
        {
          newStatus: orderStatus,
        }
      );
      const patchResult = patchResponse.data;

      if (patchResult.success) {
        // If order marked as done, send SMS
        if (orderStatus === "done" && patchResult.order) {
          console.log("sending sms initiated");

          try {
            console.log("sending sms now!");
            setSendingSmS(true);

            const response = await axios.post(
              `${SERVER_URI}/api/v1/sms/send/`,
              {
                message: `Hello ${patchResult.order.clientName}, your cloth is ready for pickup.Thank you. TailorTMS Team.`,
                phoneNo: patchResult.order.clientPhoneNo,
              }
            );

            const result = response.data;

            if (result.status === "Success") {
              console.log("sms sent");
              ToastComponent("success", "Message sent successfully!");
            } else {
              console.log("An error occurred sending SMS");
            }
          } catch (error) {
            console.log(error);
            ToastComponent("error", error.message);
          } finally {
            setSendingSmS(false);
          }
        }

        // Fetch updated orders list
        const getResponse = await axios.get(`${SERVER_URI}/api/v1/orders/all/`);
        const getResult = getResponse.data;
        console.log("GET result:", getResult);

        if (getResult.success) {
          setAPIResponse(getResult.orders.length);
          setOrders(getResult.orders);
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

  // fetch all orders
    const getAllOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${SERVER_URI}/api/v1/orders/all/`);
        const result = response.data;
        if (result.success) {
          setAPIResponse(result.orders.length);
          setOrders(result.orders);
        }
      } catch (error) {
        console.log("An error occurred", error.message);
        ToastComponent("error", error.message);
      } finally {
        setLoading(false);
      }
    };

    useEffect(()=>{
      getAllOrders();
    },[])

  // add new order
      const handleAddOrder = async () => {
      try {
        setLoading(true);
        console.log(formData)
        const response = await axios.post(`${SERVER_URI}/api/v1/orders/create/`,formData);
        const result = response.data;
        if (result.success) {
          setModal2Open(!modal2Open);
          ToastComponent("success","Order added successfully!");
          setFormData({});
        }
      await getAllOrders();
      } catch (error) {
        console.log("An error occurred", error.message);
        ToastComponent("error", error.message);
      } finally {
        setLoading(false);
      }
    };
  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        <View style={styles.historyContainer}>
          <View style={styles.ordersSummary}>
            <Text>
              Total orders: <Text>{apiResponse || 0}</Text>
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
            <Loader />
          ) : (
            <>
              <View style={{ gap: 10 }}>
                {Orders?.map((order, index) => (
                  <View key={order._id || index} style={styles.orderContainer}>
                    <Text style={{ color: "#145A32" }}>
                      Order ID: {order._id}
                    </Text>
                    <Text>Customer Name: {order?.clientName}</Text>
                    <Text>Customer Contact: {order?.clientPhoneNo}</Text>
                    <Text>Measurements: {order?.measurements}</Text>
                    <Text>Amount Charged: Ksh. {order?.amount}</Text>
                    <Text>
                      Priority:{" "}
                      <Text style={{ color: "#145A32" }}>{order?.urgency}</Text>
                    </Text>

                    <View style={styles.StatusContainer}>
                      <Text>
                        Status:{" "}
                        <Text style={{ color: "#145A32" }}>
                          {order?.status}
                        </Text>
                      </Text>
                      <TouchableOpacity
                        style={styles.BTNContainer}
                        onPress={() => {
                          setSelectedOrderId(order._id);
                          setModalOpen(!modalOpen);
                        }}
                      >
                        <Text style={styles.BtnTxt}>Update</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}

                {/* Update Order Modal */}
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
                            Select Order Status
                          </Text>
                          <Picker
                            selectedValue={orderStatus}
                            onValueChange={(itemValue) =>
                              setOrderStatus(itemValue)
                            }
                            style={styles.picker}
                          >
                            <Picker.Item
                              label="In-Progress"
                              value="inprogress"
                            />
                            <Picker.Item label="Done" value="done" />
                            <Picker.Item label="Picked" value="picked" />
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

                {/* Add Order Modal */}
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
                                value={formData.clientName}
                                onChangeText={(text) => handleInputChange("clientName", text)}
                              />
                            </View>
                            <View>
                              <Text style={styles.introText}>
                                Customer Phone No:
                              </Text>
                              <TextInput
                                placeholder="Enter Customer Phone Number"
                                style={styles.textInput}
                                value={formData.clientPhoneNo}
                                onChangeText={(text) => handleInputChange("clientPhoneNo", text)}
                                keyboardType="numeric"
                              />
                            </View>
                            <View>
                              <Text style={styles.introText}>
                              Amount Charged:
                              </Text>
                              <TextInput
                                placeholder="Enter amount charged"
                                style={styles.textInput}
                                value={formData.amount}
                                onChangeText={(text) => handleInputChange("amount", parseFloat(text))}
                                keyboardType="numeric"
                              />
                            </View>
                            <View>
                              <Text style={styles.introText}>
                              Priority:
                              </Text>
                              <TextInput
                                placeholder="values accepted: high,medium,low"
                                style={styles.textInput}
                                value={formData.urgency}
                                onChangeText={(text) => handleInputChange("urgency", text)}
                              />
                            </View>
                            <View>
                              <Text style={styles.introText}>
                                Measurements
                              </Text>
                              <TextInput
                                placeholder="Enter Customer Measurements"
                                style={styles.input}
                                value={formData.measurements}
                                onChangeText={(text) => handleInputChange("measurements", text)}
                                multiline
                                numberOfLines={4}
                                maxLength={300}
                              />
                            </View>
                          </View>
                          <TouchableOpacity style={styles.updateBtn} onPress={handleAddOrder}>
                            <Text style={styles.updateTxt}>Add Order</Text>
                          </TouchableOpacity>
                        </>
                      )}
                    </View>
                  </TouchableWithoutFeedback>
                </Modal>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  subTxt: { color: "#fff", fontSize: 12 },
  orderContainer: {
    flexDirection: "column",
    backgroundColor: "#C3C3C3",
    padding: 10,
    borderRadius: 10,
    gap: 2,
    width: "90%",
    alignSelf: "center",
  },
  InputsContainer: { flexDirection: "column", gap: 10 },
  BTNContainer: {
    backgroundColor: "#145A32",
    padding: 5,
    borderRadius: 10,
    width: 70,
  },
  BtnTxt: { color: "#fff", fontSize: 12, textAlign: "center" },
  modalOverlay: {
    backgroundColor: "rgba(0,0,0,0.7)",
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    padding: 20,
    marginTop: 30,
  },
  modalText: { fontSize: 18, fontWeight: "500", marginBottom: 10, color: "#fff" },
  introText: { color: "#fff" },
  picker: {
    color: "#077E8C",
    backgroundColor: "#fff",
    marginTop: 15,
    borderRadius: 10,
  },
  updateBtn: {
    backgroundColor: "#145A32",
    marginTop: 25,
    padding: 10,
    borderRadius: 10,
  },
  updateTxt: { textAlign: "center", color: "#fff" },
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
    backgroundColor: "#fff",
    marginTop: 10,
    borderRadius: 10,
    height: 100,
    marginBottom: 15,
    textAlignVertical: "top",
  },
  StatusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
