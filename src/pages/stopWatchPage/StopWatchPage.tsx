import { FunctionComponent, useState } from "react";
import StopWatch from "../../components/stopWatch/StopWatch";
import StopWatchCheckPointsTable from "../../components/stopWatchCheckPointsTable/StopWatchCheckPointsTable";

interface StopWatchPageProps {}

export interface CheckPoint {
  flagTime: StopWatch;
  differenceBetweenLastTime: StopWatch;
}

export type CheckPoints = CheckPoint[] | []

const StopWatchPage: FunctionComponent<StopWatchPageProps> = () => {
  const [checkPoints, setCheckPoints] = useState<CheckPoints>([]);

  return (
    <div>
      <StopWatch setCheckPoints={setCheckPoints}/>
      <StopWatchCheckPointsTable checkPoints={checkPoints} />
    </div>
  );
};

export default StopWatchPage;
