import React from "react";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const ChartPage = () => {
  const { weekly_graph_data } = useSelector((state) => state.cryptoReducer);
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
      <XAxis dataKey="price" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="date" stroke="#82ca9d" />
    </LineChart>
  );
};
export default ChartPage;
