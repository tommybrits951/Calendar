import { useEffect, useContext, useState } from "react";
import { CalContext } from "../App";
import { Link, useParams } from "react-router";
import updateDate from "../data/updateDate";
import Square from "./Square";
export default function Month() {
  const { monthNames, weekdayNames, events } = useContext(CalContext);
  const [squares, setSquares] = useState([]);
  const [dates, setDates] = useState([]);
  const { month, year } = useParams();
  const [dayEvents, setDayEvents] = useState([])

  function sortEvents(arr) {
    let result = []
    for (let i = 1; i <= dates.length; i++) {
    let tmp = []
        for (let j = 0; j < arr.length; j++) {
        console.log(arr[j])
        if (new Date(year, month, i).getDate() === new Date(arr[j].start_time).getDate() || new Date(year, month, i).getDate() === new Date(arr[j].end_time).getDate()) {
          tmp = [...tmp, arr[j]]
        }
      }
      result = [...result, tmp]
    }
    console.log(result)
    setDayEvents(result)
  }
  const left = "<";
  const right = ">";

  const colors = [
    "bg-cyan-300",
    "bg-sky-300",
    "bg-rose-300",
    "bg-orange-300",
    "bg-stone-300",
    "bg-amber-300",
    "bg-lime-300",
    "bg-teal-300",
    "bg-indigo-300",
    "bg-fuchsia-300",
    "bg-slate-300",
    "bg-zinc-300",
  ];

  useEffect(() => {
    const { arr, tmp } = updateDate(year, month);
    
    setSquares([...arr]);
    setDates([...tmp]);
    
  }, [month]);
  useEffect(() => {
    dates.length > 0 ? sortEvents(events) : null
  }, [dates])

  return (
    <section
      id="month"
      className={`${month ? "page" : null} text-white ${colors[month]} h-full`}
    >
      <div id="titleCont" className={`w-full ${colors[month]} text-center`}>
        <Link
          title="back"
          className="cursor-pointer hover:scale-95 text-5xl  text-rose-500"
          to={`/${parseInt(month) === 0 ? parseInt(year) - 1 : year}/${
            parseInt(month) === 0 ? 11 : parseInt(month) - 1
          }`}
        >
          {left}
        </Link>
        <h2
          id="monthTitle"
          className="w-2/3 text-5xl"
        >{`${monthNames[month]} ${year}`}</h2>
        <Link
          to={`/${parseInt(month) === 11 ? parseInt(year) + 1 : year}/${
            parseInt(month) === 11 ? 0 : parseInt(month) + 1
          }`}
          className="cursor-pointer hover:scale-95  text-rose-500 text-5xl"
          title="next"
        >
          {right}
        </Link>
      </div>
      <div
        id="daysTitleCont"
        className="bg-cyan-300 border-l-1 mx-3 border-black border-t-1"
      >
        {weekdayNames.map((dy, idx) => {
          return (
            <h4 className="day-names text-black border-r-1 mt-2" key={idx}>
              {dy}
            </h4>
          );
        })}
      </div>
      <div id="daysCont" className={` mx-3`}>
        {squares.map((obj, idx) => {
          return (
            
              <Square
                obj={obj}
                events={dayEvents[idx]}
                squares={squares}
                date={dates[idx]}
                month={month}
                year={year}
                key={idx}
              />
            
          );
        })}
      </div>

      <p className="text-center text-black">Click Day To Schedule Event</p>
    </section>
  );
}
