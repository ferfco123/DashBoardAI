import InsightCard from "../InsightCard/InsightCard";
import "./singleAiInsight.css";

const SingleAiInsight = ({ aiInsight }) => {
  return (
    <div>
      {!aiInsight ? (
        "No hay Insight para el primer periodo"
      ) : (
        <InsightCard insight={aiInsight} />
      )}
    </div>
  );
};

export default SingleAiInsight;
