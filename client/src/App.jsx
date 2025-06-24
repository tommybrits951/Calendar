import { useState, useEffect, createContext } from "react";
import Month from "./components/Month";
import { Routes, Route } from "react-router";
import Register from "./components/Register";

import Login from "./components/Login";
import "./App.css";
import axios from "./api/axios";
import Day from "./components/Day";
import Home from "./components/Home";

export const CalContext = createContext();



function App() {
    const [auth, setAuth] = useState(null);
  
  
  
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
          weekdayNames
          
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
          </Routes>
        )}
      </CalContext.Provider>
    </main>
  );
}

export default App;
