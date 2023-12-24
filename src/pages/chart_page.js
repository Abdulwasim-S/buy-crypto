import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { setWeeklyGraphData } from "../redux/Reducer/crypto.reducer";

const ChartPage = () => {
  const { weekly_graph_data } = useSelector((state) => state.cryptoReducer);
  const dispatch = useDispatch();
  const getChartData = async () => {
    try {
      await axios
        .get(
          "https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=7"
        )
        .then((res) => {
          dispatch(setWeeklyGraphData(res.data.prices));
        })
        .catch((error) => console.log("Error", error));
    } catch (error) {
      console.log("Error", error);
    }
  };
  useEffect(() => {
    getChartData();
  }, []);
  return (
    <LineChart
      width={500}
      height={300}
      data={weekly_graph_data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="coin_value"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
};
export default ChartPage;
