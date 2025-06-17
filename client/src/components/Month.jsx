import { useEffect, useContext, useState } from "react";
import { CalContext } from "../App";
import { Link } from "react-router";
import { updateSquares } from "../data/updateDate";
import Square from "./Square";
export default function Month() {
  const { monthNames, weekdayNames } = useContext(CalContext);
  const [squares, setSquares] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const left = "<";
  const right = ">";
  const colors = [
    "bg-cyan-800",
    "bg-sky-800",
    "bg-rose-800",
    "bg-orange-800",
    "bg-stone-800",
    "bg-amber-800",
    "bg-lime-800",
    "bg-teal-800",
    "bg-indigo-800",
    "bg-fuchsia-800",
    "bg-slate-800",
    "bg-zinc-800",
  ];
  function monthBack() {
    if (parseInt(selectedMonth) === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  }
  function monthFoward() {
    if (parseInt(selectedMonth) === 11) {
      setSelectedMonth(0);
      setSelectedYear(parseInt(selectedYear) + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  }

  useEffect(() => {
    let arr = updateSquares(selectedMonth, selectedYear);
    setSquares([...arr]);
  }, [selectedMonth]);
  useEffect(() => {
    let arr = updateSquares(selectedMonth, selectedYear);
    setSquares([...arr]);
  }, []);
  return (
    <section
      id="month"
      className={`month text-white px-3 ${colors[selectedMonth]} h-full w-full`}
    >
      <div
        id="titleCont"
        className={`w-full ${colors[selectedMonth]} text-center`}
      >
        <button
          title="back"
          className="cursor-pointer hover:scale-95 text-5xl  text-rose-500"
          onClick={monthBack}
        >
          {left}
        </button>
        <h2
          id="monthTitle"
          className="w-1/3 text-5xl"
        >{`${monthNames[selectedMonth]}`}</h2>
        <button
          className="cursor-pointer hover:scale-95  text-rose-500 text-5xl"
          title="next"
          onClick={monthFoward}
        >
          {right}
        </button>
      </div>
      <div id="daysTitleCont" >
        {weekdayNames.map((dy, idx) => {
          return (
            <h4 className="day-names border-r-1" key={idx}>
              {dy}
            </h4>
          );
        })}
      </div>
      <div id="daysCont" className={` `}>
        {squares.map((obj, idx) => {
          return (
            <Square num={obj} />
          );
        })}
      </div>
      <div className="row-start-12 w-92 h-18 right-0 border-2 flex justify-between pt-5 ">
        <div className="flex justify-around w-full">
          <h3>start marker:</h3>
          <div className="w-1/12 h-1/2 text-center">

          <div className="h-full bg-white w-full top-1/4 text-black font-bold">\</div>
          </div>
        </div>

        <div className="flex justify-around w-full">
          <h3>end marker:</h3>
          <div className="w-1/10 text-center h-1/2">

          <div className="h-full w-full bg-white top-1/4 text-black font-bold">/</div>
          </div>
        </div>
      </div>
    </section>
  );
}
