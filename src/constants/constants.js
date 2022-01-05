import RockstarLogo from "../assets/images/Rockstar.png";
import InsomniacLogo from "../assets/images/Insomniac.jpg";
import ValveLogo from "../assets/images/Valve.png";
import EALogo from "../assets/images/EA.png";

const constants = {
  // Router links

  HOME: "/",
  PRODUCTS: "/products",
  ABOUT: "/about",
  PC: "/products/pc",
  XBOX: "/products/xbox",
  PLAYSTATION: "/products/playstation",

  // Footer links

  footerLinks: [
    {
      id: 0,
      image: RockstarLogo,
      url: "https://www.rockstargames.com/",
    },
    {
      id: 1,
      image: InsomniacLogo,
      url: "https://insomniac.games/",
    },
    {
      id: 2,
      image: ValveLogo,
      url: "https://valvesoftware.com/",
    },
    {
      id: 3,
      image: EALogo,
      url: "https://www.ea.com/ru-ru",
    },
  ],
};

export default constants;
