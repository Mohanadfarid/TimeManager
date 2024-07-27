import { FunctionComponent } from "react";
import "./stopWatchCheckPointTable.scss";
import { type CheckPoints } from "../../pages/stopWatchPage/StopWatchPage";
import { formatTime } from "../../utils/timerUtils";

interface StopWatchCheckPointsTableProps {
  checkPoints: CheckPoints;
}

const StopWatchCheckPointsTable: FunctionComponent<
  StopWatchCheckPointsTableProps
> = ({ checkPoints }) => {
  return (
    <div className="table-wrapper">
      <table className="holiday-table">
        <thead>
          <tr>
            <th> Laps</th>
            <th>Time</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {checkPoints &&
            checkPoints.map((checkPoint, idx) => {
              return (
                <tr key={idx}>
                  <td>
                    {idx+1} <span>(fastest)</span>
                  </td>
                  <td>
                    {formatTime(checkPoint.differenceBetweenLastTime.hours)}:
                    {formatTime(checkPoint.differenceBetweenLastTime.minutes)}:
                    {formatTime(checkPoint.differenceBetweenLastTime.seconds)}:
                    {formatTime(checkPoint.differenceBetweenLastTime.milliseconds)}
                  </td>
                  <td>
                    {formatTime(checkPoint.differenceBetweenLastTime.hours)}:
                    {formatTime(checkPoint.differenceBetweenLastTime.minutes)}:
                    {formatTime(checkPoint.differenceBetweenLastTime.seconds)}:
                    {formatTime(checkPoint.differenceBetweenLastTime.milliseconds)}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default StopWatchCheckPointsTable;
