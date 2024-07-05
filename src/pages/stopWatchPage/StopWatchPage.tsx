import { FunctionComponent } from "react";
import StopWatch from "../../components/stopWatch/StopWatch";

interface StopWatchPageProps {}

const StopWatchPage: FunctionComponent<StopWatchPageProps> = () => {


  return (
    <div>
      <StopWatch />
    </div>
  );
};

export default StopWatchPage;
