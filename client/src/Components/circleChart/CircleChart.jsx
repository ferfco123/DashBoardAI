import "./circleChart.scss";

import ChartPie from "./ChartPie";

const CircleChart = ({ data, colors, title }) => {
  return (
    <div className="circleChart">
      <h1 className="title">{title}</h1>
      <div className="chart">
        <ChartPie data={data} COLORS={colors} />
      </div>
      <div className="infoContainer">
        {data?.map((item, i) => (
          <div className="info" key={i}>
            <div className="text">
              <div
                className="dot"
                style={{ backgroundColor: `${colors[i]}` }}
              ></div>
              <p className="text-title">{item.name}</p>
            </div>
            <span className="span">{item.revenue}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CircleChart;
