import { useState, type FunctionComponent, ChangeEvent } from "react";
import "./addOrUpdateTimerModal.scss";
import Modal from "../modal/Modal";
import NumberInputWithArrows from "../../numberInputWithArrows/NumberInputWithArrows";
import { FaRegEdit } from "react-icons/fa";
import { useTimersContext } from "../../../store/Timers-context";
interface AddModalProps {
  type: "add";
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface UpdateModalProps {
  type: "update";
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}
export type AddOrUpadateTimerModalProps = AddModalProps | UpdateModalProps;

const AddOrUpadateTimerModal: FunctionComponent<
  AddOrUpadateTimerModalProps
> = ({ type, isModalOpen, setIsModalOpen }) => {
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [timerName, setTimerName] = useState<string>("timer");

  const timerCTX = useTimersContext();
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTimerName(e.target.value);
  };

  const submitHandler = () => {
    timerCTX.addTimer({
      hours,
      minutes,
      seconds,
      name: timerName,
      id: Math.floor(Math.random() * 10000) + 1,
    });
  };

  const header = type === "add" ? "Add new timer" : "Edit timer";
  return (
    <Modal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      onSubmit={submitHandler}
    >
      <div className="timers-modal-content">
        <h3>{header}</h3>
        <form action="">
          <div className="hours-minutes-seconds-container">
            <NumberInputWithArrows value={hours} max={99} setValue={setHours} />{" "}
            <span className="separator">:</span>
            <NumberInputWithArrows
              value={minutes}
              max={60}
              setValue={setMinutes}
            />
            <span className="separator">:</span>
            <NumberInputWithArrows
              value={seconds}
              max={60}
              setValue={setSeconds}
            />
          </div>
          <div className="timer-name-container">
            <i>
              <FaRegEdit />
            </i>
            <input
              className="timer-name"
              placeholder="Timer name"
              type="text"
              value={timerName}
              onChange={handleNameChange}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddOrUpadateTimerModal;
