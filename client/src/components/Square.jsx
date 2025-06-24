import { Link } from "react-router";
import {format} from 'date-fns'
export default function Square({ obj, month, date, year, events }) {
  const num = obj;
  const curYear = new Date().getFullYear();
  const curMonth = new Date().getMonth();
  const curDate = new Date().getDate();
  const curTime = new Date(curYear, curMonth, curDate).getTime();

  const colorClass =
    new Date(date).getMonth() === new Date(year, month, num).getMonth()
      ? "bg-white"
      : curTime === new Date(year, month, num).getTime()
      ? "bg-cyan-200"
      : "bg-zinc-400";

  return (
    <Link
      to={`/${year}/${month}/${num}`}
      className={`grid grid-cols-2 ${colorClass} shadow-2xl  text-black border-1 ${new Date(year, month, num).getDay() === 0 ? "border-l-2" : null} ${new Date(year, month, num).getDay() === 6 ? "border-r-2" : null} hover:scale-95 p-1 $`}
    >
      <h3>{num}</h3>
      <div className="flex flex-col">

        {events ? events.map((ev, idx) => {
          return (
            <div key={idx} className="bg-cyan-500 w-full text-xs ">{format(new Date(ev.start_time), "HH:mm aaa")}</div>
          )
        }) : null}
        </div>
    </Link>
  );
}
