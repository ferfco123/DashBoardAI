import { COLORS } from "../../data/data";
import ChartBox from "../ChartBox/ChartBox";
import CircleChart from "../circleChart/CircleChart";
import "./singleSnapshots.scss";

const SingleSnapshot = ({ data, insight }) => {
  const region = data?.salesByRegion.map((item) => ({
    name: item.region,
    revenue: item.revenue,
  }));
  const category = data?.saleByCategory.map((item) => ({
    name: item.category,
    revenue: item.revenue,
  }));

  return (
    <div className="singleSnapshot">
      <div className="box4">
        <CircleChart
          data={region}
          colors={COLORS}
          title={"Ventas por region"}
        />
      </div>
      <div className="singleSnapshot-container">
        <ChartBox
          title="Ventas totales"
          data={data?.totalSales}
          insight={insight?.metrics.ordersChangePct}
        />
        <ChartBox
          title="Facturacion total"
          data={data?.totalRevenue}
          type={"$"}
          insight={insight?.metrics.revenueChangePct}
        />
        <ChartBox
          title="Ticket promedio"
          data={data?.avgTicket.toFixed(2)}
          type={"$"}
          insight={insight?.metrics.avgOrderValueChangePct}
        />
      </div>
      <div className="box4">
        <CircleChart
          data={category}
          colors={COLORS}
          title={"Ventas por categoria"}
        />
      </div>
    </div>
  );
};

export default SingleSnapshot;
