import { FunctionComponent } from "react";
import "./calender.scss";

import { getDay, getDaysInMonth } from "date-fns";
import { DateType } from "../../pages/calender/CalenderPage";
import { type Holiday } from "../../hooks/useGetHolidays";
import { useTranslation } from "react-i18next";

const daysOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const monthsOfYear = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];


interface CalenderProps {
  date: DateType;
  holidays: Holiday[];
  changeDateHandler: (year?: number, month?: number, day?: number) => void;
}

const Calender: FunctionComponent<CalenderProps> = ({
  date,
  holidays,
  changeDateHandler,
}) => {

  const {t} = useTranslation()
  const numberOfDaysInCurrentMonth = getDaysInMonth(
    new Date(date.year, date.month - 1)
  );

  const firstDayOfCurrentMonthNumber = getDay(
    new Date(date.year, date.month - 1, 1)
  );

  const lastDayOfCurrentMonthNumber =
    getDay(new Date(date.year, date.month - 1, numberOfDaysInCurrentMonth)) + 1;

  const numberOfDaysInPrevMonth = getDaysInMonth(
    new Date(date.year, date.month - 2) // -1 to get the right month and another -1 to get the prev month
  );

  const doesDayHaveEvent = (day?: number) => {
    if (day) {
      const filterdHolidays= holidays.filter((holiday) => holiday.date.datetime?.day === day);
      if (filterdHolidays.length > 0) return true;
    }
    return false;
  };

  const increaseMonthHandler = () => {
    if (date.month === 12) {
      changeDateHandler(date.year + 1, 1, undefined);
    } else {
      changeDateHandler(undefined, date.month + 1, undefined);
    }
  };

  const decreaseMonthHandler = () => {
    if (date.month === 1) {
      changeDateHandler(date.year - 1, 12, undefined);
    } else {
      changeDateHandler(undefined, date.month - 1, undefined);
    }
  };

  return (
    <div className="calender">
      <div className="calender_month-year-picker">
        <div className="monthes-controller" onClick={decreaseMonthHandler}>
          {"<<"}
        </div>
        <div>
          {t(`monthes_of_year.${monthsOfYear[date.month - 1]}`)} {date.year}
        </div>
        <div className="monthes-controller" onClick={increaseMonthHandler}>
          {">>"}
        </div>
      </div>

      <div className="calender_day-picker">
        {/* looping over the days of the week */}
        {daysOfWeek.map((day, index) => (
          <div className="cell day-of-week" key={index}>
            {t(`days_of_week.${day}`)}
          </div>
        ))}

        {/* looping over the prefix of the current month (prev month's last days) */}
        {Array.from({ length: firstDayOfCurrentMonthNumber }).map(
          (_, index) => (
            <div className="cell prefix-cell" key={index}>
              {
                numberOfDaysInPrevMonth -
                  (firstDayOfCurrentMonthNumber - index - 1) //itrating in reverse over the last days of the prev month
              }
            </div>
          )
        )}

        {/* looping over the days of current month */}
        {Array.from({ length: numberOfDaysInCurrentMonth }).map((_, index) => (
          <div
            className={`cell current-month-cell ${
              index + 1 === date.day && "active"
            }
            ${doesDayHaveEvent(index + 1)?'has-event':''}`}
            key={index}
            onClick={() => {
              changeDateHandler(undefined, undefined, index + 1);
            }}
          >
            {index + 1}
          </div>
        ))}

        {/* looping over postfix of the current month (next month's first days) */}
        {Array.from({ length: 7 - lastDayOfCurrentMonthNumber }).map(
          (_, index) => (
            <div className="cell postfix-cell" key={index}>
              {index + 1}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Calender;
