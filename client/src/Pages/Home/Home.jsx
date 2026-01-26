import { api } from "../../axios/api";
import ViewChart from "../../Components/BarChart/ViewChart";
import BigChart from "../../Components/BigChart/BigChart";

import ChartBox from "../../Components/ChartBox/ChartBox";
import CircleChart from "../../Components/circleChart/CircleChart";
import SummaryBox from "../../Components/SummaryBox/SummaryBox";
import TopBox from "../../Components/TopBox/TopBox";
import {
  chartBoxProduct,
  chartBoxRatio,
  chartBoxRevenue,
  chartBoxUser,
  COLORS,
  leads,
  revenues,
  views,
} from "../../data/data";
import "./home.scss";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const { data } = useQuery({
    queryKey: ["bestSeller"],
    queryFn: async () => {
      const res = await api.get("/sales");
      return res.data;
    },
  });
  const { data: snapshots } = useQuery({
    queryKey: ["snapshots"],
    queryFn: async () => {
      const res = await api.get("/salesSnapshots/allsnapshots");
      return res.data;
    },
  });

  return (
    <div className="home">
      <div className="box box7">
        <BigChart data={snapshots} />
      </div>
      <div className="box box1 box1a">
        <TopBox title={"Ventas totales por categoria"} data={data?.category} />
      </div>

      <div className="box3">
        <SummaryBox
          title={"Ventas totales"}
          data={data?.totals[0].totalSales}
        />
        <SummaryBox
          title={"Facuracion total"}
          data={data?.totals[0].totalRevenue}
        />
        <SummaryBox
          title={"Ticket promedio"}
          data={data?.totals[0].avgTicket.toFixed(2)}
        />
      </div>
      <div className="box box1 box1b">
        <TopBox title={"Ventas totales por region"} data={data?.region} />
      </div>
    </div>
  );
};

export default Home;
