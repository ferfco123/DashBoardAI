import { useEffect, useState } from "react";
import "./filterBar.scss";
import { useLocation } from "react-router-dom";

const FilterBar = ({ searchParams, setSearchParams, periodKeys, type }) => {
  const [time, setTime] = useState([]);
  const [active, setActive] = useState("all");
  const location = useLocation().pathname !== "/insights";

  useEffect(() => {
    if (!active) {
      searchParams.delete("minSeverity");
      setSearchParams(searchParams);
    }
  }, []);

  const handlePeriod = (e) => {
    if (e.target.value) {
      const periodType = e.target.value;

      if (periodType === "weekly") {
        setTime(periodKeys.weekly);
        if (!location) {
          searchParams.set("period", periodType);
          searchParams.delete("minSeverity");
          setActive("all");
          setSearchParams(searchParams);
        }
      }
      if (periodType === "monthly") {
        setTime(periodKeys.monthly);
        if (!location) {
          searchParams.set("period", periodType);
          searchParams.delete("minSeverity");
          setActive("all");
          setSearchParams(searchParams);
        }
      }
      searchParams.set("period", e.target.value);
    }
    if (!e.target.value) {
      setTime("");
      searchParams.delete("period");
    }
  };

  const handlePeriodKey = (e) => {
    const periodKey = e.target.value;

    searchParams.delete("minSeverity");
    searchParams.set("periodKey", periodKey);
    setSearchParams(searchParams);
  };

  return (
    <div className="filterBar">
      <div>
        <div className="filterBar-title">Seleccione Periodo</div>
        <select onChange={handlePeriod} className="filterBar-select">
          <option value="">All periods</option>

          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        {time?.length > 0 && location && (
          <select
            value={""}
            onChange={handlePeriodKey}
            name=""
            id=""
            className="filterBar-select"
            style={{ marginLeft: "10px" }}
          >
            <option value="" disabled>
              Seleccionar período
            </option>

            {time?.map((p) => (
              <option key={p.periodKey} value={p.periodKey}>
                {p.periodKey}
              </option>
            ))}
          </select>
        )}
      </div>
      {!type && (
        <div className="filterBar-btns">
          <button
            className={
              active === "all"
                ? "filterBar-btn filterBar-active"
                : "filterBar-btn"
            }
            value="all"
            onClick={(e) => {
              setActive(e.target.value);
              searchParams.delete("periodKey");
              searchParams.delete("minSeverity");
              setSearchParams(searchParams);
            }}
          >
            Todos
          </button>
          <button
            className={
              active === "high"
                ? "filterBar-btn filterBar-active"
                : "filterBar-btn"
            }
            value="high"
            onClick={(e) => {
              setActive(e.target.value);
              searchParams.delete("periodKey");
              searchParams.set("minSeverity", e.target.value);
              setSearchParams(searchParams);
            }}
          >
            Alto
          </button>
          <button
            className={
              active === "medium"
                ? "filterBar-btn filterBar-active"
                : "filterBar-btn"
            }
            value="medium"
            onClick={(e) => {
              setActive(e.target.value);
              searchParams.delete("periodKey");
              searchParams.set("minSeverity", e.target.value);
              setSearchParams(searchParams);
            }}
          >
            Medio
          </button>
          <button
            className={
              active === "low"
                ? "filterBar-btn filterBar-active"
                : "filterBar-btn"
            }
            value="low"
            onClick={(e) => {
              setActive(e.target.value);
              searchParams.delete("periodKey");
              searchParams.set("minSeverity", e.target.value);
              setSearchParams(searchParams);
            }}
          >
            Bajo
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
