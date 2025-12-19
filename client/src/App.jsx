import { useState, useEffect, createContext } from "react";
import Month from "./components/Month";
import { Routes, Route, useNavigate } from "react-router";
import Register from "./components/Register";

import Login from "./components/Login";
import "./App.css";
import axios from "./api/axios";
import Day from "./components/Day";
import Home from "./components/Home";
import EventForm from "./components/EventForm";
import EditEvent from "./components/EditEvent";
import useDates from "./hooks/useDates";


export const CalContext = createContext();

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

const current = {
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  date: new Date().getDate(),
  day: new Date().getDay()
} 

function App() {
    const [auth, setAuth] = useState(null);
    const [disp, setDisp] = useState(current)
    const dates = useDates(disp.year, disp.month, auth)
    const navigate = useNavigate()
  

    function changeMonth(value) {

      const {year, month} = disp;
      if (value === "Next" && month === 11) {
        const tmp = new Date(year + 1, 0, 1)
        setDisp({
          ...disp,
          year: tmp.getFullYear(),
          month: tmp.getMonth(),
          date: tmp.getDate(),
          day: tmp.getDay()
        })
        navigate(`/${year + 1}/${0}`)
      } else if (value === "Next" && month !== 11) {
        const tmp = new Date(year, month + 1, 1)
        setDisp({
          ...disp,
          month: tmp.getMonth(),
          date: tmp.getDate(),
          day: tmp.getDay()
        })
        navigate(`/${year}/${month + 1}`)
      } else if (value === "Back" && month === 0) {
        const tmp = new Date(year - 1, 11, 1)
        setDisp({
          ...disp,
          year: tmp.getFullYear(),
          month: tmp.getMonth(),
          date: tmp.getDate(),
          day: tmp.getDay()
        })
        navigate(`/${year - 1}/${11}`)
      } else if (value === "Back" && month !== 0) {
        const tmp = new Date(year, month - 1, 1)
        setDisp({
          ...disp,
          month: tmp.getMonth(),
          date: tmp.getDate(),
          day: tmp.getDay()
        })
        navigate(`/${year}/${month - 1}`)
      }
    }




  


  useEffect(() => {
    axios
      .get("/users")
      .then((res) => {
        
        setAuth(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
      
      
    }, []);
    
  return (
    <main className="absolute h-full m-0 p-0 w-full overflow-hidden">
      <CalContext.Provider
        value={{
          auth,
          setAuth,
          monthNames,
          weekdayNames,
          dates,
          current,
          disp,
          changeMonth
        }}
      >
        {auth === null ? (
          <Routes>
            <Route element={<Login />} path="/" />
            <Route element={<Register />} path="/register" />
          </Routes>
        ) : (
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Month />} path="/:year/:month" />
            <Route element={<Day />} path="/:year/:month/:day" />
            <Route element={<EventForm />} path="/newevent" />
            <Route element={<EditEvent />} path="/edit/:eventId" />
          </Routes>
        )}
      </CalContext.Provider>
    </main>
  );
}

export default App;
