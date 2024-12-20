import { FunctionComponent, useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.scss";
import { CgSandClock } from "react-icons/cg";
import { GoBell } from "react-icons/go";
import { RiTimerLine } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
import { IoMenuSharp } from "react-icons/io5";
import { FaClock } from "react-icons/fa";

import { useTranslation } from "react-i18next";

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
  const [forceCollapse, setForceCollapse] = useState<boolean>(false);

  const { t, i18n } = useTranslation();

  const handleToggleCollapse = () => {
    setForceCollapse((prevState) => !prevState);
  };

  const handleToggleLanguage = () => {
    i18n.language === "ar"
      ? i18n.changeLanguage("en")
      : i18n.changeLanguage("ar");
  };

  return (
    <nav className={`navbar ${forceCollapse ? "collapsed" : "expanded"}`}>
      <div className={"hamburger-menu"} onClick={handleToggleCollapse}>
        <IoMenuSharp className={"navbar__icon "} />
      </div>

      <div className="navbar__link">
        <span className={"navbar__title"}>
          <FaClock className={"navbar__icon logo-icon"} />
          TimeManager
        </span>
      </div>

      <NavLink className={"navbar__link"} to={"/"}>
        <CgSandClock className="navbar__icon" />{" "}
        <span className={"navbar__title"}>{t("timers")}</span>
      </NavLink>

      <NavLink className={"navbar__link"} to={"/alarm"}>
        <GoBell className="navbar__icon" />{" "}
        <span className={"navbar__title"}>{t("alarm")}</span>
      </NavLink>

      <NavLink className={"navbar__link"} to={"/stopwatch"}>
        <RiTimerLine className="navbar__icon" />
        <span className={"navbar__title"}>{t("stopwatch")}</span>
      </NavLink>

      <NavLink className={"navbar__link"} to={"/calender"}>
        <SlCalender className="navbar__icon" />{" "}
        <span className={"navbar__title"}>{t("calender")}</span>
      </NavLink>

      <div className={"navbar__actions"}>
        <button onClick={handleToggleLanguage}>
          toggle language {i18n.language}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
