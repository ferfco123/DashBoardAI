import "./navbar.scss";
import SearchIcon from "@mui/icons-material/Search";
import GridViewIcon from "@mui/icons-material/GridView";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsIcon from "@mui/icons-material/Settings";
import Theme from "../Theme/Theme";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation().pathname;

  return (
    <div className="navbar">
      <div className="navbarContainer">
        <div className="logoContainer">
          <img src="/ferco.jpg" alt="" className="img" />
          <span className="title">Ferfco Dashboard</span>
        </div>
        <div className="menu">
          <Link
            to="/"
            className={location === "/" ? "active menuOptions" : "menuOptions"}
          >
            Home
          </Link>
          <Link
            to="/snapshots"
            className={
              location === "/snapshots" ? "active menuOptions" : "menuOptions"
            }
          >
            SnapShots
          </Link>
          <Link
            to="/insights"
            className={
              location === "/insights" ? "active menuOptions" : "menuOptions"
            }
          >
            Ai Insights
          </Link>
        </div>
        <div className="optionsContainer">
          <Theme />
          <div className="profileContainer">
            <SearchIcon />
            <GridViewIcon />
            <CropSquareIcon />
            <div className="badgeContainer">
              <div className="badge">1</div>
              <NotificationsNoneIcon />
            </div>
            <div className="userContainer">
              <img src="user.jpg" alt="" className="userImg" />
              <span>John Dore</span>
            </div>
            <SettingsIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
