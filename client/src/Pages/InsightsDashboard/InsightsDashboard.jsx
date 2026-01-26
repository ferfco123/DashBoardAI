import { api } from "../../axios/api";
import { useSearchParams } from "react-router-dom";
import FilterBar from "../../Components/FilterBar/FilterBar";
import InsightCard from "../../Components/InsightCard/InsightCard";
import "./insightsDashboard.scss";
import { useQuery } from "@tanstack/react-query";

const InsightsDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryString = searchParams.toString();
  const { data, error, isLoading } = useQuery({
    queryKey: ["insights", queryString],
    queryFn: async () => {
      const res = await api.get(`/aiInsights?${queryString}`);
      return res.data;
    },
  });

  const { data: labels } = useQuery({
    queryKey: ["labels"],
    queryFn: async () => {
      const res = await api.get("/salesSnapshots/labels");
      return res.data;
    },
    staleTime: Infinity,
  });

  return (
    <div className="id">
      <h1>Sales Insights</h1>
      <FilterBar
        periodKeys={labels}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      {data?.length === 0 && (
        <div>No hay insights para el periodo seleccionado</div>
      )}
      {data?.map((insight) => (
        <InsightCard key={insight._id} insight={insight} />
      ))}
    </div>
  );
};

export default InsightsDashboard;
