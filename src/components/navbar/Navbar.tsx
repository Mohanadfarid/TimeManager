import { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.scss";
import { CgSandClock } from "react-icons/cg";
import { GoBell } from "react-icons/go";
import { RiTimerLine } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
import { IoMenuSharp } from "react-icons/io5";
import { FaClock } from "react-icons/fa";

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
  return (
    <nav className="navbar">
      <div className={"navbar__link"}>
        <IoMenuSharp className={"navbar__icon hamburger-menu"} />
        <span className={"navbar__title"}>
        <FaClock className={'navbar__icon logo-icon'} />
          TimeManager
        </span>
      </div>

      <NavLink className={"navbar__link"} to={"/"}>
        <CgSandClock className="navbar__icon" />{" "}
        <span className={"navbar__title"}>timers</span>
      </NavLink>

      <NavLink className={"navbar__link"} to={"/alarm"}>
        <GoBell className="navbar__icon" />{" "}
        <span className={"navbar__title"}>alarm</span>
      </NavLink>

      <NavLink className={"navbar__link"} to={"/stopwatch"}>
        <RiTimerLine className="navbar__icon" />
        <span className={"navbar__title"}>stopwatch</span>
      </NavLink>

      <NavLink className={"navbar__link"} to={"/calender"}>
        <SlCalender className="navbar__icon" />{" "}
        <span className={"navbar__title"}>calender</span>
      </NavLink>
    </nav>
  );
};

export default Navbar;
