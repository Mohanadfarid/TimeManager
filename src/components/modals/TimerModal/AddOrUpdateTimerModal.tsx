import {
  useState,
  type FunctionComponent,
  ChangeEvent,
  useEffect,
} from "react";
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

const AddOrUpadateTimerModal: FunctionComponent<AddOrUpadateTimerModalProps> = (
  props
) => {
  const { type, isModalOpen, setIsModalOpen } = props;
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [timerName, setTimerName] = useState<string>("timer");

  const timerCTX = useTimersContext();

  useEffect(() => {
    console.log(timerCTX.timers);
    if (type === "update") {
      const { id } = props;
      const targetedTimer = timerCTX.timers.filter(
        (timer) => timer.id === id
      )[0];
      setHours(targetedTimer.hours);
      setMinutes(targetedTimer.minutes);
      setSeconds(targetedTimer.seconds);
      setTimerName(targetedTimer.name);
    }
  }, [props, timerCTX.timers, type]);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTimerName(e.target.value);
  };

  const submitHandler = () => {
    if (type === "add") {
      timerCTX.addTimer({
        hours,
        minutes,
        seconds,
        name: timerName,
        id: Math.floor(Math.random() * 10000) + 1,
      });
    } else {
      const { id } = props;
      timerCTX.updateTimer({
        hours,
        minutes,
        seconds,
        name: timerName,
        id,
      });
    }
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
