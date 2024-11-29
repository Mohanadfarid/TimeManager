import { FunctionComponent } from "react";
import { Holiday } from "../../hooks/useGetHolidays";
import "./holidayTable.scss";
import { useTranslation } from "react-i18next";

interface HolidayTableProps {
  holidays: Holiday[];
}

const HolidayTable: FunctionComponent<HolidayTableProps> = ({ holidays }) => {
  const {t} = useTranslation()
  return (
    <div className="table-wrapper">
      <table className="holiday-table">
        <thead>
          <tr>
            <th>{t('name')}</th>
            <th>{t('description')}</th>
            <th>{t('date')}</th>
            <th>{t('type')}</th>
          </tr>
        </thead>
        <tbody>
          {holidays &&
            holidays.map((holiday, idx) => {
              return (
                <tr key={idx}>
                  <td>{holiday.name}</td>
                  <td>{holiday.description}</td>
                  <td>{holiday.date.iso}</td>
                  <td>{holiday.type}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default HolidayTable;
