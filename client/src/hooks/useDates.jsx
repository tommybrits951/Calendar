import { useState, useEffect } from "react";
import axios from "../api/axios";

export default function useDates(year, month, auth) {
  const [dates, setDates] = useState();
  const endDate = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay()
  const lastMDate = new Date(year, month, 0).getDate()


  useEffect(() => {
    auth !== null ? axios
    .get("/events", {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    })
    .then((res) => {
      const tmp = res.data;
      let arr = [];
      let num = lastMDate
      for (let i = firstDay - 1; i >= 0; i--) {
        let obj = {
          date: num,
          events: []
        }
        num--
        arr = [obj, ...arr]  
      }
      for (let i = 1; i <= endDate; i++) {
        let obj = {
          date: i,
          events: [],
          morning: new Date(`${year}-${month}-${i} 00:00:00`).getTime(),
          night: new Date(`${year}-${month}-${i} 24:00:00`).getTime()
        }
        
        for (let j = 0; j < tmp.length; j++) {
          const xDate = new Date(year, month, i).getDate()
          const yDate = new Date(tmp[j].start_time).getDate()
          const xMonth = new Date(year, month, i).getMonth()
          const yMonth = new Date(tmp[j].start_time).getMonth()
          
          if (xDate === yDate && xMonth === yMonth) {
            
            obj = {...obj, events: [...obj.events, tmp[j]]}
          }
        }
        arr = [...arr, obj]
      }
      console.log(arr);
      setDates(arr)
    })
    .catch(err => console.log(err)) : null
  }, [auth, month])
  
    return dates
}
