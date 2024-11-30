import { FunctionComponent, useState } from "react";
import StopWatch, { StopWatchType } from "../../components/stopWatch/StopWatch";
import StopWatchCheckPointsTable from "../../components/stopWatchCheckPointsTable/StopWatchCheckPointsTable";

interface StopWatchPageProps {}

export interface CheckPoint {
  flagTime: StopWatchType;
  differenceBetweenLastTime: StopWatchType;
}

export type CheckPoints = CheckPoint[] | [];

const StopWatchPage: FunctionComponent<StopWatchPageProps> = () => {
  const [checkPoints, setCheckPoints] = useState<CheckPoints>([]);

  return (
    <div className="stopwatch-container">
      <StopWatch setCheckPoints={setCheckPoints} />
      <StopWatchCheckPointsTable checkPoints={checkPoints} />
    </div>
  );
};

export default StopWatchPage;
