import { useState, useEffect, createContext } from "react";
import Month from "./components/Month";
import { Routes, Route } from "react-router";
import Register from "./components/Register";

import Login from "./components/Login";
import "./App.css";
import axios from "./api/axios";
import Day from "./components/Day";

export const CalContext = createContext();

const date = new Date();
const year = date.getFullYear();
const day = date.getDay();
const month = date.getMonth();
const dayone = new Date(year, month, 1).getDay();
const lastdate = new Date(year, month + 1, 0).getDate();
const dayend = new Date(year, month, lastdate).getDay();
const lastMonthDate = new Date(year, month, 0).getDate();
const lastMonthLastDay = new Date(year, month, 0).getDay();
const initDates = {
  date,
  year,
  day,
  month,
  dayone,
  lastdate,
  dayend,
  lastMonthDate,
  lastMonthLastDay,
};

function App() {
  const [auth, setAuth] = useState(null);
  const [dates, setDates] = useState(initDates);

  const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  function changeMonth(e) {
    const {title} = e.target;
    if (title === "next" && month !== 11) {
      setDates({...dates, month: dates.month + 1})
    }
  }
  useEffect(() => {
    axios
      .get("/users")
      .then((res) => {
        console.log(res.data);
        setAuth(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main className="absolute h-full w-full">
      <CalContext.Provider
        value={{
          auth,
          setAuth,
          weekdayNames,
          monthNames,
          dates,
          
        }}
      >
        {auth === null ? (
          <Routes>
            <Route element={<Login />} path="/" />
            <Route element={<Register />} path="/register" />
          </Routes>
        ) : (
          <Routes>
            <Route element={<Month />} path="/" />
            <Route element={<Day />} path="/:date_num" />
          </Routes>
        )}
      </CalContext.Provider>
    </main>
  );
}

export default App;
