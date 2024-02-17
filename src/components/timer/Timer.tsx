import {
  useState,
  type FunctionComponent,
  type ReactNode,
  useEffect,
} from "react";
import { RxReset } from "react-icons/rx";
import { FaCirclePause } from "react-icons/fa6";
import { BiSolidCaretRightCircle } from "react-icons/bi";
import { CgExpand } from "react-icons/cg";
import { GrContract } from "react-icons/gr";
import "./timer.scss";
import CircularProgressBar from "../CircularProgressBar/CircularProgressBar";

interface Time {
  hours: number;
  minutes: number;
  seconds: number;
}

type TimerProps = {
  name: string;
} & Time;

const Timer: FunctionComponent<TimerProps> = ({
  name,
  hours,
  minutes,
  seconds,
}) => {
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [isFullScreen, setisFullScreen] = useState<boolean>(false);
  const [ActiveTime, setActiveTime] = useState<Time>({
    // the to hold the actual value to be counted down by a 1 each second
    hours,
    minutes,
    seconds,
  });

  const handleTogglePause = () => {
    setIsPaused((prevState) => !prevState);
    //handle if the count down is already finished
    if (
      ActiveTime.hours === 0 &&
      ActiveTime.minutes === 0 &&
      ActiveTime.seconds === 0
    ) {
      resetTimer();
    }
  };

  const handleToggleFullScreen = () => {
    setisFullScreen((prevState) => !prevState);
  };

  const calculateTotalTimeInSeconds = (
    hours: number,
    minutes: number,
    seconds: number
  ): number => {
    return hours * 60 * 60 + minutes * 60 + seconds;
  };
  const resetTimer = () => {
    setActiveTime({ hours, minutes, seconds });
  };

  const togglePauseButton: ReactNode = isPaused ? (
    <BiSolidCaretRightCircle />
  ) : (
    <FaCirclePause />
  );
  
  const toggleFullScreenButton: ReactNode = isFullScreen ? (
    <GrContract />
  ) : (
    <CgExpand />
  );

  useEffect(() => {
    let TimerInterval: number | undefined = undefined;
    if (!isPaused) {
      TimerInterval = setTimeout(() => {
        if (ActiveTime.seconds > 0) {
          setActiveTime((prevTime) => ({
            ...prevTime,
            seconds: prevTime.seconds - 1,
          }));
        } else if (ActiveTime.minutes > 0) {
          setActiveTime((prevTime) => ({
            ...prevTime,
            minutes: prevTime.minutes - 1,
            seconds: 59,
          }));
        } else if (ActiveTime.hours > 0) {
          setActiveTime((prevTime) => ({
            hours: prevTime.hours - 1,
            minutes: 59,
            seconds: 59,
          }));
        } else {
          clearInterval(TimerInterval);
          setIsPaused(true);
        }
      }, 1000);
    }

    return () => {
      clearInterval(TimerInterval);
    };
  }, [ActiveTime, isPaused]);

  return (
    <div className="timer-card">
      <div className="timer-card__header">
        <p>{name}</p>
        <i className="expand-shrink-button" onClick={handleToggleFullScreen}>
          {toggleFullScreenButton}
        </i>
      </div>

      <CircularProgressBar
        totalSeconds={calculateTotalTimeInSeconds(hours, minutes, seconds)}
        passedSeconds={calculateTotalTimeInSeconds(
          ActiveTime.hours,
          ActiveTime.minutes,
          ActiveTime.seconds
        )}
      >
        <p className="timer-card__time">
          {ActiveTime.hours}:{ActiveTime.minutes}:{ActiveTime.seconds}
        </p>
      </CircularProgressBar>

      <div className="timer-card__controlles">
        <i className="play-button" onClick={handleTogglePause}>{togglePauseButton}</i>
        <i className="reset-button" onClick={resetTimer}>
          <RxReset />
        </i>
      </div>
    </div>
  );
};

export default Timer;
