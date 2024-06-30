import { useEffect, useState } from "react";

export interface Holiday {
  name: string;
  description: string;
  country: {
    id?: string;
    name?: string;
  };
  date: {
    iso?: string;
    datetime?: {
      year: number;
      month: number;
      day: number;
      hour?: number;
      minute?: number;
      second?: number;
    };
    timezone?: {
      offset: string;
      zoneabb: string;
      zoneoffset: number;
      zonedst: number;
      zonetotaloffset: number;
    };
  };
  type: string[];
  primary_type: string;
  canonical_url: string;
  urlid: string;
  locations: string;
  states: string;
}

interface ApiResponse {
  meta: {
    code: number;
  };
  response: {
    holidays: Holiday[];
  };
}

const BASEURL: string = "https://calendarific.com/api/v2/holidays";
const APIKEY: string = "jUEJCIzIS6y5hWOz4FXqOI52SVr0yOO5";
const COUNTRYCODE: string = "EG";

const fetchHolidays = async (url: string): Promise<Holiday[] | string> => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! something went wrong`);
    }
    const data: ApiResponse = await res.json();
    return data.response.holidays;
  } catch (error) {
    return `an error occured:${(error as Error).message}`;
  }
};

const useGetHolidays = (year: number, month: number, day: number) => {
  const fullURL = `${BASEURL}?&api_key=${APIKEY}&country=${COUNTRYCODE}&year=${year}`;

  const [holidaysInYear, setHolidaysInYear] = useState<Holiday[]>([]);
  const [holidaysInMonth, setHolidaysInMonth] = useState<Holiday[]>([]);
  const [holidaysInDay, setHolidaysInDay] = useState<Holiday[]>([]);

  const [error, setError] = useState<string>();
  const [loading, setloading] = useState<boolean>(false);

  useEffect(() => {
    //fetching all the holidays array
    const fetchData = async () => {
      const data = await fetchHolidays(fullURL);
      if (typeof data === "string") {
        setError(data);
        setloading(false);
      } else {
        setHolidaysInYear(data);
        setHolidaysInMonth(
          data?.filter((holiday) => holiday.date.datetime?.month === month)
        );
        setHolidaysInDay(
          data?.filter((holiday) => holiday.date.datetime?.day === day)
        );
        setloading(false);
      }
    };
    setloading(true);
    fetchData();
  }, [year]);

  useEffect(() => {
    setHolidaysInMonth(
      holidaysInYear?.filter(
        (holiday) => holiday.date.datetime?.month === month
      )
    );
    setHolidaysInDay(
      holidaysInYear?.filter((holiday) => holiday.date.datetime?.day === day)
    );
  }, [month, day]);
  return { holidaysInYear, holidaysInMonth, holidaysInDay, error, loading };
};

export default useGetHolidays;
