import { StopWatchType } from "../components/stopWatch/StopWatch";

export const formatTime = (value: number) => {
  return value.toString().padStart(2, "0");
};

export const transfromStopWatchTimeToSeconds = (value: StopWatchType) => {
  const hoursInSeconds = value.hours * 60 * 60;
  const minutesInSeconds = value.minutes * 60;
  const millisecondsInSeconds = value.milliseconds / 1000;

  return (
    hoursInSeconds + minutesInSeconds + value.seconds + millisecondsInSeconds
  );
};

export const differenceBetweenTwoStopWatchTimes = (
  time1: StopWatchType,
  time2: StopWatchType
): StopWatchType => {
  const differenceInSeconds = Math.abs(
    transfromStopWatchTimeToSeconds(time1) -
      transfromStopWatchTimeToSeconds(time2)
  );
  // console.log(time1);
  // console.log(time2);
  // console.log("--------------------");
  // console.log("differecne : ", differenceInSeconds);

  // extracting the hours
  const hoursReminder = differenceInSeconds % 3600; // 60*60
  const numberOfHours = (differenceInSeconds - hoursReminder) / 3600;

  // extracting the minutes
  const minutesReminder = hoursReminder % 60;
  const numberOfMinutes = (hoursReminder - minutesReminder) / 60;

  //extracting the seconds
  const numberOfSeconds = Math.floor(minutesReminder); // 30

  // extracting the milliseconds
  const numberOfMilliseconds = Math.floor((minutesReminder - numberOfSeconds) * 100);
  console.log(" milli seconds   ", numberOfMilliseconds);

  return {
    hours: numberOfHours,
    minutes: numberOfMinutes,
    seconds: numberOfSeconds,
    milliseconds: numberOfMilliseconds,
  };
};
