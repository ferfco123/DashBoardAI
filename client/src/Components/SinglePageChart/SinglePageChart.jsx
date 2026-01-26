import "./singlePageChart.scss";
import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SinglePageChart = ({ data }) => {
  return (
    <div className="singlePageChart">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip
            contentStyle={{ background: "transparent", border: "none" }}
            labelStyle={{ display: "none" }}
            position={{ x: 550, y: 0 }}
          />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="visits"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />

          <Line
            yAxisId="right"
            type="monotone"
            dataKey="clicks"
            stroke="#82ca9d"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SinglePageChart;
