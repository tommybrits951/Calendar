import { Link } from "react-router";
import hours from "../data/dayHours";
export default function Square({ obj, month, date, year, squares }) {
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
      className={`grid grid-cols-2 ${colorClass} shadow-2xl text-black border-l-1 border-b-1 hover:scale-95 p-1 $`}
    >
      <h3>{num}</h3>

      <div className={`grid grid-cols-12`}>
        {hours.map((n, idx) => {
          return idx < 11 ? <div key={idx}></div> : null;
        })}
      </div>
      <div className="grid grid-cols-12">
        {hours.map((n, idx) => {
          return idx >= 11 ? <div key={idx}></div> : null;
        })}
      </div>
    </Link>
  );
}
