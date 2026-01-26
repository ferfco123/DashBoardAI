import "./viewChart.scss";

import { BarChart, Bar, ResponsiveContainer, Tooltip } from "recharts";

const ViewChart = ({ data }) => {
  return (
    <div className="barChart">
      <h1 className="title">
        Total <p>{data.dataKey}</p>
      </h1>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={150} height={40} data={data.views}>
          <Tooltip
            contentStyle={{ background: "#2a3447" }}
            labelStyle={{ display: "none" }}
            cursor={{ fill: "none" }}
          />
          <Bar dataKey={data.dataKey} fill={data.color} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ViewChart;
