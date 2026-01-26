import "./footer.scss";
import CopyrightIcon from "@mui/icons-material/Copyright";

const Footer = () => {
  return (
    <div className="footerContainer">
      <div className="footer">
        <span>Ferfco</span>
        <div className="cont">
          <CopyrightIcon style={{ fontSize: "15px" }} />
          <span>All rigths reserved</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
