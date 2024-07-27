import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import "./rootlayout.scss"
interface RootLayoutProps {}

const RootLayout: FunctionComponent<RootLayoutProps> = () => {
  return (
    <>
      <Navbar />
      <div className="rootlayout-body">
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
