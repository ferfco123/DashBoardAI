import "./severityBadge.scss";

const SeverityBadge = ({ value }) => {
  const colors = { 1: "green", 2: "blue", 3: "orange", 4: "red", 5: "darkred" };
  return (
    <div
      style={{
        backgroundColor: colors[value],
        color: "white",
        padding: "4px 8px",
        borderRadius: "5px",
      }}
    >
      Severidad :{value}
    </div>
  );
};

export default SeverityBadge;
