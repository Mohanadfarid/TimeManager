import { FunctionComponent } from "react";
import { Holiday } from "../../hooks/useGetHolidays";
import "./holidayTable.scss";

interface HolidayTableProps {
  holidays: Holiday[];
}

const HolidayTable: FunctionComponent<HolidayTableProps> = ({ holidays }) => {
  return (
    <table className="holiday-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Date</th>
          <th>Type</th>
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
  );
};

export default HolidayTable;
