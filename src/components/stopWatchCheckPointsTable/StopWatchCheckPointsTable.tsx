import { FunctionComponent } from "react";
import "./stopWatchCheckPointTable.scss";
import { type CheckPoints } from "../../pages/stopWatchPage/StopWatchPage";
import { formatTime } from "../../utils/timerUtils";
import { useTranslation } from "react-i18next";

interface StopWatchCheckPointsTableProps {
  checkPoints: CheckPoints;
}

const StopWatchCheckPointsTable: FunctionComponent<
  StopWatchCheckPointsTableProps
> = ({ checkPoints }) => {
  const { t } = useTranslation();
  return (
    <div className="table-wrapper">
      <table className="check-points-table">
        <thead>
          <tr>
            <th>{t('laps')}</th>
            <th>{t('Time')}</th>
            <th>{t('total')}</th>
          </tr>
        </thead>
        <tbody>
          {checkPoints &&
            checkPoints.map((checkPoint, idx) => {
              return (
                <tr key={idx}>
                  <td>
                    {idx + 1} <span>({t('fastest')})</span>
                  </td>
                  <td>
                    {formatTime(checkPoint.differenceBetweenLastTime.hours)}:
                    {formatTime(checkPoint.differenceBetweenLastTime.minutes)}:
                    {formatTime(checkPoint.differenceBetweenLastTime.seconds)}:
                    {formatTime(
                      checkPoint.differenceBetweenLastTime.milliseconds
                    )}
                  </td>
                  <td>
                    {formatTime(checkPoint.differenceBetweenLastTime.hours)}:
                    {formatTime(checkPoint.differenceBetweenLastTime.minutes)}:
                    {formatTime(checkPoint.differenceBetweenLastTime.seconds)}:
                    {formatTime(
                      checkPoint.differenceBetweenLastTime.milliseconds
                    )}
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
