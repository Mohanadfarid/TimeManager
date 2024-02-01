import { FunctionComponent } from "react";
import Timer from "../../components/timer/Timer";
import "./TimersPage.scss";
import { LuPencil } from "react-icons/lu";
import { IoAdd } from "react-icons/io5";
interface TimersPageProps {}

const TimersPage: FunctionComponent<TimersPageProps> = () => {
  return (
    <div className="timers-page">
      <div className="timers-container">
        <Timer name="timer" hours={0} minutes={0} seconds={5} />
        <Timer name="timer" hours={0} minutes={0} seconds={5} />
        <Timer name="timer" hours={0} minutes={0} seconds={5} />
        <Timer name="timer" hours={0} minutes={0} seconds={5} />
        <Timer name="timer" hours={0} minutes={0} seconds={5} />
        <Timer name="timer" hours={0} minutes={0} seconds={5} />
        <Timer name="timer" hours={0} minutes={0} seconds={5} />
        <Timer name="timer" hours={0} minutes={0} seconds={5} />
        <Timer name="timer" hours={0} minutes={0} seconds={5} />
        <Timer name="timer" hours={0} minutes={0} seconds={5} />
        <Timer name="timer" hours={0} minutes={0} seconds={5} />
        <Timer name="timer" hours={0} minutes={0} seconds={5} />
        <Timer name="timer" hours={0} minutes={0} seconds={5} />
        <Timer name="timer" hours={0} minutes={0} seconds={5} />
        <Timer name="timer" hours={0} minutes={0} seconds={5} />
      </div>
      
      <div className="controlles">
        <i>
          <LuPencil />
        </i>
        <i>
          <IoAdd />
        </i>
      </div>
      
    </div>
  );
};

export default TimersPage;
