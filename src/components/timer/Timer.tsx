import { useState, type FunctionComponent, type ReactNode } from "react";
import { RxReset } from "react-icons/rx";
import { FaCirclePause } from "react-icons/fa6";
import { BiSolidCaretRightCircle } from "react-icons/bi";
import { CgExpand } from "react-icons/cg";
import { GrContract } from "react-icons/gr";
import "./timer.scss";
interface TimerProps {
  name: string;
  hours: number;
  minutes: number;
  seconds: number;
}

const Timer: FunctionComponent<TimerProps> = ({
  name,
  hours,
  minutes,
  seconds,
}) => {
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [isFullScreen, setisFullScreen] = useState<boolean>(false);

  const handleTogglePause = () => {
    setIsPaused((prevState) => !prevState);
  };

  const handleToggleFullScreen = () => {
    setisFullScreen((prevState) => !prevState);
  };

  const togglePauseButton: ReactNode = (
    <>{isPaused ? <BiSolidCaretRightCircle /> : <FaCirclePause />}</>
  );

  const toggleFullScreenButton: ReactNode = (
    <>{isFullScreen ? <GrContract /> : <CgExpand />}</>
  );

  return (
    <div className="timer-card">
      <div className="timer-card__header">
        <p>{name}</p>
        <i onClick={handleToggleFullScreen}>{toggleFullScreenButton}</i>
      </div>
      <div>
        {hours}:{minutes}:{seconds}
      </div>
      <div>
        <i onClick={handleTogglePause}>{togglePauseButton}</i>
        <i>
          <RxReset />
        </i>
      </div>
    </div>
  );
};

export default Timer;
