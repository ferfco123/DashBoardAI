import "./theme.scss";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import Brightness2OutlinedIcon from "@mui/icons-material/Brightness2Outlined";
import { useContext } from "react";
import { ThemeContex } from "../../Context/ThemeContext";

const Theme = () => {
  const { mode, setMode } = useContext(ThemeContex);
  const handleTheme = () => {
    setMode((prev) => {
      return prev === "dark" ? "light" : "dark";
    });
  };

  return (
    <div
      className={mode === "light" ? "theme themelight" : "theme"}
      onClick={handleTheme}
    >
      <WbSunnyOutlinedIcon className={"icon-sun"} />
      <Brightness2OutlinedIcon className={"icon-moon"} />
      <div className={mode === "dark" ? "ball dark" : "ball"}></div>
    </div>
  );
};

export default Theme;
