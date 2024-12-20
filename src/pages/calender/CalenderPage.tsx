import { FunctionComponent, useState } from "react";
import Calender from "../../components/calender/Calender";
import "./calenderPage.scss";
import useGetEvents, { Holiday } from "../../hooks/useGetHolidays";
import HolidayTable from "../../components/holidaysTable/HolidayTable";
import { useTranslation } from "react-i18next";


interface CalenderPageProps {}

export type DateType = {
  year: number;
  month: number;
  day: number;
};

type Holidays = {
  holidaysInYear: Holiday[];
  holidaysInMonth: Holiday[];
  holidaysInDay: Holiday[];
  error: string | undefined;
};

type ViewMode = "holidaysInYear" | "holidaysInMonth" | "holidaysInDay";

const currentDate = new Date();

const CalenderPage: FunctionComponent<CalenderPageProps> = () => {
  const [date, setDate] = useState<DateType>({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1,
    day: currentDate.getDate(),
  });

  const {t} = useTranslation()

  const [viewMode, setviewMode] = useState<ViewMode>("holidaysInYear");

  const holidays: Holidays = useGetEvents(date.year, date.month, date.day);

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
    <div className="calender-page page-container">
      <Calender date={date} holidays={holidays.holidaysInMonth} changeDateHandler={ChangeDateHandler} />
      <div className="view-mode-controller">
        <span className="info">{t('show_holidays_in')}</span>
        <span className="btns-container">
          <button
            className={`btn ${viewMode === "holidaysInYear" ? "active" : ""}`}
            onClick={() => setviewMode("holidaysInYear")}
          >
            {t('year')} {date.year}
          </button>
          <button
            className={`btn ${viewMode === "holidaysInMonth" ? "active" : ""}`}
            onClick={() => setviewMode("holidaysInMonth")}
          >
            {t('month')} {date.month}
          </button>
          <button
            className={`btn ${viewMode === "holidaysInDay" ? "active" : ""}`}
            onClick={() => setviewMode("holidaysInDay")}
          >
            {t('day')} {date.day}
          </button>
        </span>
      </div>
      <HolidayTable holidays={holidays[viewMode]} />
    </div>
  );
};

export default CalenderPage;
