import React from "react";
import { BarChart } from "react-native-chart-kit";
import { Dimensions, View, Text,StyleSheet} from "react-native";
import { SERVER_URI } from '../../constants/SERVER_URI.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';
import useAuthStore from '../../zustand/store.jsx';
import { PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;



export const OrdersStatusBarGraph = () => {
        const [Loading,setLoading]=useState(false);
        const [apiResponse,setAPIResponse]=useState(null);
        const [pendingOrders,setPendingOrders]=useState(0);
        const [totalSales,setTotalSales]=useState(0);
        const [doneOrders,setDoneOrders]=useState(0)
        const [OrdersInProgress,setOrdersInProgress]=useState(0);
        const [pickedOrders,setPickedOrders]=useState(0)
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
                setAPIResponse(result.orders.length)
                setLoading(false);
            } else {
                setLoading(false);
            }
        }
        catch (error) {
            console.log("an error occured",error.message);
            ToastComponent("error",error.message)
        }
        setLoading(false);
        };
        getAllOrders();
    }, []);

// get complete/done orders
        useEffect(() => {
        const getDoneOrders = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${SERVER_URI}/api/v1/orders/status/done`);
            const result = response.data;
            // console.log(result)
            if (result.success) {
                setDoneOrders(result.totalOrders);
                setLoading(false);
            } else {
                setLoading(false);
            }
        }
        catch (error) {
            console.log("an error occured",error.message);
            ToastComponent("error",error.message)
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
            const response = await axios.get(`${SERVER_URI}/api/v1/orders/status/placed`);
            const result = response.data;
            // console.log(result)
            if (result.success) {
                setPendingOrders(result.totalOrders);
                setLoading(false);
            } else {
                setLoading(false);
            }
        }
        catch (error) {
            console.log("an error occured",error.message);
            ToastComponent("error",error.message)
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
            const response = await axios.get(`${SERVER_URI}/api/v1/orders/status/inprogress`);
            const result = response.data;
            // console.log(result)
            if (result.success) {
                setOrdersInProgress(result.totalOrders);
                setLoading(false);
            } else {
                setLoading(false);
            }
        }
        catch (error) {
            console.log("an error occured",error.message);
            ToastComponent("error",error.message)
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
            const response = await axios.get(`${SERVER_URI}/api/v1/orders/status/picked`);
            const result = response.data;
            // console.log(result)
            if (result.success) {
                setPickedOrders(result.totalOrders);
                setLoading(false);
            } else {
                setLoading(false);
            }
        }
        catch (error) {
            console.log("an error occured",error.message);
            ToastComponent("error",error.message)
        }
        setLoading(false);
        };
        getPickedOrders();
    }, []);


const statusData = {
labels: ["Received","pending","inprogress","done","picked"],
  datasets: [
    {
      data: [apiResponse,pendingOrders,OrdersInProgress,doneOrders,pickedOrders]
    }
  ]
};

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: () => "#000",
  decimalPlaces: 0,
};


    
  return (
    <View style={styles.analyticsContainer}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8,textAlign:'center',paddingTop:10}}>
        Tailor Shop Orders Summary
      </Text>
      
    <SalesPieChart
      pendingOrders={pendingOrders}
      OrdersInProgress={OrdersInProgress}
      apiResponse={apiResponse}
      doneOrders={doneOrders}
      pickedOrders={pickedOrders}
    />
    
    </View>
  );
};



export const SalesPieChart=({apiResponse,doneOrders,OrdersInProgress})=>{
// sales pie chart
const salesData = [
    {
    name: "Received",
    population:apiResponse,
    color: "#F29339",
    legendFontColor: "#333",
    legendFontSize: 12
  },
  {
    name: "Picked",
    population:doneOrders,
    color: "#2ECC71",
    legendFontColor: "#333",
    legendFontSize: 12
  },
  {
    name: "In-Progress",
    population:OrdersInProgress,
    color: "#CD5C5C",
    legendFontColor: "#333",
    legendFontSize: 12
  },
];

return(
    <View>
      {/* chart one */}
        <PieChart
        data={salesData}
        width={screenWidth - 42}
        height={220}
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: () => "#000",
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
)

}



const styles=StyleSheet.create({
analyticsContainer:{
    width:"100%",
}
})