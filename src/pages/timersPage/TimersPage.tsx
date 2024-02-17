import { FunctionComponent, useState } from "react";
import Timer from "../../components/timer/Timer";
import "./TimersPage.scss";
import { LuPencil } from "react-icons/lu";
import { IoAdd } from "react-icons/io5";
import AddOrUpadateTimerModal from "../../components/modals/TimerModal/AddOrUpdateTimerModal";
import { useTimersContext } from "../../store/Timers-context";
interface TimersPageProps {}

interface AddType {
  type: "add";
}
interface UpdateType {
  type: "update";
  id: number;
}
type ModalChangingProps = AddType | UpdateType;

const TimersPage: FunctionComponent<TimersPageProps> = () => {
  const timerCTX = useTimersContext();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalChangingProps, setModalChangingProps] =
    useState<ModalChangingProps>({ type: "add" });

  const openAddModalHandler = () => {
    setIsModalOpen(true);
    setModalChangingProps({ type: "add" });
  };

  const openUpdateModalHandler = (id: number) => {
    setIsModalOpen(true);
    setModalChangingProps({ type: "update", id });
  };

  return (
    <div className="timers-page">
      <div className="timers-container">
        {timerCTX.timers.map((timer) => (
          <Timer
            key={timer.id}
            id={timer.id}
            name={timer.name}
            hours={timer.hours}
            minutes={timer.minutes}
            seconds={timer.seconds}
            openUpdateModalHandler={openUpdateModalHandler}
          />
        ))}
      </div>
      <AddOrUpadateTimerModal
        {...modalChangingProps}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <div className="controlles">
        <i className="timers-page-icon">
          <LuPencil />
        </i>
        <i className="timers-page-icon" onClick={openAddModalHandler}>
          <IoAdd />
        </i>
      </div>
    </div>
  );
};

export default TimersPage;
