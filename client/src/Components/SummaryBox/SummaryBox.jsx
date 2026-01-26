import "./summaryBox.css";

const SummaryBox = ({ title, data }) => {
  return (
    <div className="summary">
      <h3 className="summary-title">{title}</h3>
      <h4 className="summary-data">{data}</h4>
    </div>
  );
};

export default SummaryBox;
