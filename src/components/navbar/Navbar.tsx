import { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.scss";
import { CgSandClock } from "react-icons/cg";
import { GoBell } from "react-icons/go";
import { RiTimerLine } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
  return (
    <nav className="navbar">
      <NavLink className={"navbar__link"} to={"/"}>
        <CgSandClock className="navbar__icon" /> timers
      </NavLink>
      <NavLink className={"navbar__link"} to={"/alarm"}>
        <GoBell className="navbar__icon"/> alarm
      </NavLink>
      <NavLink className={"navbar__link"} to={"/stopwatch"}>
        <RiTimerLine className="navbar__icon"/>
        stopwatch
      </NavLink>
      <NavLink className={"navbar__link"} to={"/calender"}>
        <SlCalender className="navbar__icon"/> calender
      </NavLink>
    </nav>
  );
};

export default Navbar;
