import { useQuery } from "@tanstack/react-query";
import "./snapshots.scss";
import { api } from "../../axios/api";
import { useSearchParams } from "react-router-dom";
import FilterBar from "../../Components/FilterBar/FilterBar";
import SingleSnapshot from "../../Components/SingleSnapshot/SingleSnapshot";
import SingleAiInsight from "../../Components/SingleAiInsight/SingleAiInsight";

const Snapshots = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const stringParams = searchParams.toString();

  const { data: periodKeys } = useQuery({
    queryKey: ["periodKeys"],
    queryFn: async () => {
      const res = await api.get("/salesSnapshots/labels");
      return res.data;
    },
    staleTime: Infinity,
  });
  const { data } = useQuery({
    queryKey: ["data", stringParams],
    queryFn: async () => {
      const res = await api.get(`/salesSnapshots/snapshots?${stringParams}`);
      return res.data;
    },
  });

  return (
    <div>
      <FilterBar
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        periodKeys={periodKeys}
        type={"snapshots"}
      />
      <div className="snapshot-periods">
        <h2>Periodo : {data?.snapshot[0].period}</h2>
        <h2>PeriodKey : {data?.snapshot[0].periodKey}</h2>
      </div>
      <SingleSnapshot data={data?.snapshot[0]} insight={data?.insight[0]} />
      <SingleAiInsight aiInsight={data?.aiinsight[0]} />
    </div>
  );
};

export default Snapshots;
