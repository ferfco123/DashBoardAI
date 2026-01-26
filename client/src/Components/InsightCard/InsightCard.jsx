import { Link, useLocation } from "react-router-dom";
import SeverityBadge from "../SeverityBadge/SeverityBadge";
import "./insightCard.scss";

const InsightCard = ({ insight = [] }) => {
  const location = useLocation().pathname;
  return (
    <div className="i-card">
      <SeverityBadge value={insight.severity} />
      <div className="i-period">
        <p>Periodo : {insight.periodType}</p>
        <p>PeriodKey : {insight.periodKey}</p>
      </div>
      <h3>{insight.summary}</h3>
      <p>{insight.explanation}</p>
      <h4>Riesgos :</h4>
      {insight?.risks?.map((risk, i) => (
        <p key={i}>- {risk}</p>
      ))}
      <h4>Recomendaciones</h4>
      <p>{insight.recommendation}</p>
      <div className="btn-container">
        <div style={{ marginBottom: "10px" }}>
          Confianza :
          {Math.round(insight.confidence ? insight.confidence * 100 : 100)}%
        </div>
        {location === "/insights" && (
          <Link
            to={`/snapshots?period=${insight.periodType}&periodKey=${insight.periodKey}`}
            className="btn"
          >
            Ver
          </Link>
        )}
      </div>
    </div>
  );
};

export default InsightCard;
