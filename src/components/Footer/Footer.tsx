import FooterStyles from "./Footer.module.scss";
import RockstarLogo from "../../assets/images/Rockstar.png";
import InsomniacLogo from "../../assets/images/Insomniac.jpg";
import ValveLogo from "../../assets/images/Valve.png";
import EALogo from "../../assets/images/EA.png";

function Footer() {
  return (
    <div className={FooterStyles.footer}>
      <div className={FooterStyles.headline}>
        <h2>Incredible convinient</h2>
      </div>
      <div className={FooterStyles.companies}>
        <div>
          <a href="https://www.rockstargames.com/" rel="noreferrer" target="_blank">
            <img className={FooterStyles.image} src={RockstarLogo} alt="Not found" />
          </a>
        </div>
        <div>
          <a href="https://insomniac.games/" rel="noreferrer" target="_blank">
            <img className={FooterStyles.image} src={InsomniacLogo} alt="Not found" />
          </a>
        </div>
        <div>
          <a href="https://valvesoftware.com/" rel="noreferrer" target="_blank">
            <img className={FooterStyles.image} src={ValveLogo} alt="Not found" />
          </a>
        </div>
        <div>
          <a href="https://www.ea.com/ru-ru" rel="noreferrer" target="_blank">
            <img className={FooterStyles.image} src={EALogo} alt="Not found" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
