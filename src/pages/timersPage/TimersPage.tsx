import { FunctionComponent, useState } from "react";
import Timer from "../../components/timer/Timer";
import "./TimersPage.scss";
import { LuPencil } from "react-icons/lu";
import { IoAdd } from "react-icons/io5";
import AddOrUpadateTimerModal from "../../components/modals/TimerModal/AddOrUpdateTimerModal";
import { useTimersContext } from "../../store/Timers-context";
interface TimersPageProps {}

const TimersPage: FunctionComponent<TimersPageProps> = () => {
  const timerCTX = useTimersContext();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  return (
    <div className="timers-page">
      <div className="timers-container">
        {timerCTX.timers.map((timer) => (
          <Timer
            name={timer.name}
            hours={timer.hours}
            minutes={timer.minutes}
            seconds={timer.seconds}
          />
        ))}
      </div>
      <AddOrUpadateTimerModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} type="add" />
      <div className="controlles">
        <i>
          <LuPencil />
        </i>
        <i onClick={()=>setIsModalOpen(true)}>
          <IoAdd />
        </i>
      </div>
    </div>
  );
};

export default TimersPage;
