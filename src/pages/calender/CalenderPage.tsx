import { FunctionComponent, useState } from "react";
import Calender from "../../components/calender/Calender";
import "./calenderPage.scss";
import useGetEvents from "../../hooks/useGetHolidays";
import HolidayTable from "../../components/holidaysTable/HolidayTable";

interface CalenderPageProps {}

export type DateType = {
  year: number;
  month: number;
  day: number;
};

const currentDate = new Date();

const CalenderPage: FunctionComponent<CalenderPageProps> = () => {
  const [date, setDate] = useState<DateType>({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1,
    day: currentDate.getDate(),
  });

  const { holidaysInYear, holidaysInMonth, holidaysInDay, error } =
    useGetEvents(date.year, date.month, date.day);

  const ChangeDateHandler = (year?: number, month?: number, day?: number) => {
    setDate((prevState) => {
      const updatedStartDate = {
        ...prevState,
        year: year ?? prevState.year,
        month: month ?? prevState.month,
        day: day ?? prevState.day,
      };
      return updatedStartDate;
    });
  };

  return (
    <div className="page-container">
      <Calender date={date} changeDateHandler={ChangeDateHandler} />
      <HolidayTable holidays={holidaysInYear}/>
    </div>
  );
};

export default CalenderPage;