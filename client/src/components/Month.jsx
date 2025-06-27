import { useContext } from "react";
import { CalContext } from "../App";

import Square from "./Square";

export default function Month() {
  const { monthNames, weekdayNames, current, disp, changeMonth, dates } =
    useContext(CalContext);

  const bgColors = [
    "bg-cyan-500",
    "bg-green-500",
    "bg-sky-500",
    "bg-rose-500",
    "bg-orange-500",
    "bg-slate-500",
  ];

  function handleMonth(e) {
    const { value } = e.target;
    changeMonth(value);
  }

  const content = dates ? (
    <div
      id="month"
      className={`absolute w-full h-full p-0 m-0 ${
        bgColors[Math.floor(Math.random() * bgColors.length)]
      }`}
    >
      <div className="mx-5">
        <nav id="monthNav" className="flex mt-10 justify-around text-center">
          <button
          onClick={handleMonth}
            className="text-3xl font-bold text-white hover:scale-95 cursor-pointer"
            value={"Back"}
          >
            {"<"}
          </button>
          <h3 className="text-5xl text-white">{monthNames[disp.month]} {disp.year}</h3>
          <button
          onClick={handleMonth}
            className="text-3xl font-bold text-white hover:scale-95 cursor-pointer"
            value={"Next"}
          >
            {">"}
          </button>
        </nav>
        <div
          id="dayNames"
          className="grid grid-cols-7 mt-3 border-b-1 border-r-1 text-center"
        >
          {weekdayNames.map((dy, idx) => {
            return (
              <p key={idx} className="border-l-1">
                {dy}
              </p>
            );
          })}
        </div>
        <div id="daysCont" className="grid grid-cols-7 grid-rows-6">
          {dates ? dates.map((dt, idx) => {
            return <Square key={idx} data={dt} day={idx + 1} month={disp.month} year={disp.year} />
          }) : null}
        </div>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
  return content;
}
