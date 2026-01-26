import "./chartbox.scss";
import BarChartIcon from "@mui/icons-material/BarChart";

const ChartBox = ({ data, title, type, insight }) => {
  return (
    <div className="chartBox">
      <div className="info">
        <div className="title">
          <BarChartIcon /> {title}
        </div>
        <div className="number">
          {type} {data}
        </div>
      </div>
      <div className="chart">
        <div className="chartContainer"></div>
        <div className="textContainer">
          <span className={insight < 0 ? "less" : "pos"}>
            {insight < 0 ? "" : "+"} {insight?.toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChartBox;
