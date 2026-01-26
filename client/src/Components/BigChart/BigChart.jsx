import "./bigchart.scss";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BigChart = ({ data }) => {
  return (
    <div className="bigchart">
      <h1 className="title">Revenue analitycs</h1>
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis dataKey="periodKey" />
          <YAxis />
          <Tooltip
            contentStyle={{ background: "transparent", border: "none" }}
            labelStyle={{ display: "none" }}
            position={{ x: 520, y: 100 }}
          />

          <Area
            type="monotone"
            dataKey="totalRevenue"
            stackId="1"
            stroke="#f2ff00"
            fill="#03f660"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BigChart;
