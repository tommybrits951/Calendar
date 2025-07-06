import { useContext } from "react";
import { CalContext } from "../App";
import { Link } from "react-router";
import { format } from "date-fns";

export default function Month() {
  const { monthNames, weekdayNames, disp, changeMonth, dates } =
    useContext(CalContext);

  function handleMonth(e) {
    const { value } = e.target;
    changeMonth(value);
  }

  const content = dates ? (
    <div id="month" className={`absolute w-full h-full p-0 m-0`}>
      <div className="mx-5">
        <nav id="monthNav" className="flex mt-10 justify-around text-center">
          <button
            onClick={handleMonth}
            className="text-3xl font-bold  hover:scale-95 cursor-pointer"
            value={"Back"}
          >
            {"<"}
          </button>
          <h3 className="text-5xl">
            {monthNames[disp.month]} {disp.year}
          </h3>
          <button
            onClick={handleMonth}
            className="text-3xl font-bold hover:scale-95 cursor-pointer"
            value={"Next"}
          >
            {">"}
          </button>
        </nav>
        <div id="dayNames" className="border-b-1">
          {weekdayNames.map((dy, idx) => {
            return (
              <p key={idx} className="border-l-1 w-full">
                {dy}
              </p>
            );
          })}
        </div>
        <div id="daysCont">
          {dates
            ? dates.map((dt, idx) => {
                return (
                  <div
                    key={idx}
                    className={`row-start-${Math.abs(idx / 7)} ${
                      new Date(disp.year, disp.month, disp.date).getMonth() ===
                      new Date(dt.year, dt.month, dt.date).getMonth()
                        ? "bg-cyan-300"
                        : "bg-gray-300"
                    } border-r-1 ${
                      new Date(dt.year, dt.month, dt.date).getDay() === 0
                        ? "border-l-1"
                        : null
                    } border-b-1 hover:scale-105 cursor-pointer`}
                  >
                    <Link to={`/${dt.year}/${dt.month}/${dt.date}`}>
                      <p>{dt.date}</p>

                      <ul>
                        {dt.events.map((ev, ix) => {
                          return (
                            <li
                              key={ix * idx}
                              className="text-xs text-white p-0.5 rounded-xl w-1/2 bg-black"
                            >
                              {format(new Date(ev.start_time), "H:mm aa")}
                            </li>
                          );
                        })}
                      </ul>
                    </Link>
                  </div>
                );
              })
            : null}
        </div>
      </div>
      <Link
        to={"/newevent"}
        className="absolute left-1/2 bottom-10 text-white text-center bg-stone-700 p-2 rounded text-xl underline hover:scale-95"
      >
        +Add to Schedule
      </Link>
    </div>
  ) : (
    <p>Loading...</p>
  );
  return content;
}
