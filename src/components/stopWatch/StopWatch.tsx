import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import "./stopWatch.scss";
import { formatTime } from "../../utils/timerUtils";
import { BiSolidCaretRightCircle } from "react-icons/bi";
import { FaCirclePause } from "react-icons/fa6";
import { RxReset } from "react-icons/rx";
import { RiFlag2Fill } from "react-icons/ri";
import {
  CheckPoint,
  CheckPoints,
} from "../../pages/stopWatchPage/StopWatchPage";
import { useTranslation } from "react-i18next";

interface StopWatchProps {
  setCheckPoints: React.Dispatch<React.SetStateAction<CheckPoints>>;
}
interface StopWatch {
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

const StopWatch: FunctionComponent<StopWatchProps> = ({ setCheckPoints }) => {
  const {t} = useTranslation()
  const [isPaused, setIsPaused] = useState<boolean>(true);

  const [stopWatchTime, setStopWatchTime] = useState<StopWatch>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

  const handleIcrementTimer = () => {
    setStopWatchTime((prevState) => {
      if (
        prevState.minutes === 59 &&
        prevState.seconds === 59 &&
        prevState.milliseconds === 90
      ) {
        return {
          hours: prevState.hours + 1,
          minutes: 0,
          seconds: 0,
          milliseconds: 0,
        };
      } else if (prevState.seconds === 59 && prevState.milliseconds === 90) {
        return {
          ...prevState,
          minutes: prevState.minutes + 1,
          seconds: 0,
          milliseconds: 0,
        };
      } else if (prevState.milliseconds === 90) {
        return {
          ...prevState,
          seconds: prevState.seconds + 1,
          milliseconds: 0,
        };
      } else {
        return { ...prevState, milliseconds: prevState.milliseconds + 1 };
      }
    });
  };

  const handleTogglePause = () => {
    setIsPaused((prevState) => !prevState);
    //handle if the count down is already finished
  };

  const resetTimer = () => {
    setStopWatchTime({
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
    setCheckPoints([]);
  };

  const HandleAddCheckPoint = () => {
    setCheckPoints((prevState) => {
      const tempCheckPoint: CheckPoint = {
        flagTime: stopWatchTime,
        differenceBetweenLastTime: stopWatchTime, // to do actually calculate the difference between current checkpoint and the last one
      };
      return [...prevState, tempCheckPoint];
    });
  };

  const togglePauseButton: ReactNode = isPaused ? (
    <BiSolidCaretRightCircle />
  ) : (
    <FaCirclePause />
  );

  useEffect(() => {
    const interval: number = setInterval(() => {
      if (!isPaused) {
        handleIcrementTimer();
      } else {
        clearInterval(interval);
        setIsPaused(true);
      }
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, [stopWatchTime, isPaused]);
  return (
    <div>
      <div className={`stop-watch ${isPaused && "disabled"}`} >
        <div className="stop-watch__hours">
          {formatTime(stopWatchTime.hours)}
          <span className="description">{t('time.hr')}</span>
        </div>
        <span className="seprator">:</span>
        <div className="stop-watch__minutes">
          {formatTime(stopWatchTime.minutes)}
          <span className="description">{t('time.min')}</span>
        </div>
        <span className="seprator">:</span>
        <div className="stop-watch__seconds">
          {formatTime(stopWatchTime.seconds)}
          <span className="description">{t('time.sec')}</span>
        </div>
        .
        <div className="stop-watch__milliseconds">
          {" "}
          {formatTime(stopWatchTime.milliseconds)}
        </div>
      </div>

      <div className="stop-watch__controlles">
        <i className="play-button" onClick={handleTogglePause}>
          {togglePauseButton}
        </i>
        <i className="reset-button" onClick={HandleAddCheckPoint}>
          <RiFlag2Fill />
        </i>
        <i className="reset-button" onClick={resetTimer}>
          <RxReset />
        </i>
      </div>
    </div>
  );
};

export default StopWatch;
