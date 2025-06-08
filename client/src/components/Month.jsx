import { useEffect, useContext, useState } from "react";
import {CalContext} from '../App'
import { Link } from "react-router";

export default function Month() {
  const [days, setDays] = useState([]);
  const {lastMonthDate, weekdayNames, month, year, monthNames, lastdate, dayone,} = useContext(CalContext)
  
  
  useEffect(() => {
    let arr = [];
    let tmp = lastMonthDate;
    if (dayone !== 0) {
      for (let i = lastMonthDate; i >= 0; i--) {
        arr = [tmp, ...arr];
        tmp--;
      }
      for (let i = 1; i <= lastdate; i++) {
        arr = [...arr, i];
      }
    } else if (dayone === 0) {
      for (let i = 1; i <= lastdate; i++) {
        arr = [...arr, i];
      }
    }
    setDays(arr);
    console.log(dayone);
  }, []);
  return (
    <section className="absolute w-11/12 grid grid-cols-7 grid-rows-auto mx-5 mt-4">
      <h2 className="col-start-1 col-end-8 text-center text-4xl mb-4 font-bold text-cyan-600">{monthNames[month]}</h2>
      {weekdayNames.map((wkday, idx) => {
        return <h3 className="text-center font-bold border-b-2 text-2xl" key={idx}>{wkday}</h3>
      })}
      {days.map((dy, idx) => {
        return (
          <Link key={idx} className={`border-r-2 border-b-2 h-28 hover:scale-95 p-1 ${new Date().getDate() === idx + 1 ? "bg-stone-300" : null} ${new Date(year, month, idx + 1).getDay() === 0 ? "border-l-2" : null} ${idx === days.length - 1 ? "border-r-2": null}`} to={`/${dy}`}>
            <p className="text-lg">{dy}</p>
          </Link>
        );
      })}
    </section>
  );
}
