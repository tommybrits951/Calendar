import { useContext } from "react";
import { CalContext } from "../App";
import { Link } from "react-router";
import { format } from "date-fns";

export default function Month() {
  const { monthNames, weekdayNames, disp, changeMonth, dates, current } =
    useContext(CalContext);

  function handleMonth(e) {
    const { value } = e.target;
    changeMonth(value);
  }

  const content = dates ? (
    <div id="month" className={`absolute w-full h-full p-0 m-0`}>
      <div className="mx-5">
        <nav id="monthNav" className="flex mt-10 justify-around text-center items-center">
          <button
            onClick={handleMonth}
            className="text-3xl font-bold text-amber-800 hover:text-amber-600 hover:scale-95 cursor-pointer"
            value={"Back"}
          >
            {"<"}
          </button>
          <h3 className="text-5xl text-amber-900 font-serif">
            {monthNames[disp.month]} {disp.year}
          </h3>
          <button
            onClick={handleMonth}
            className="text-3xl font-bold text-amber-800 hover:text-amber-600 hover:scale-95 cursor-pointer"
            value={"Next"}
          >
            {">"}
          </button>
        </nav>
        <div id="dayNames" className="border-b border-amber-300 text-amber-800 font-semibold">
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
                const isToday = dt.date === current.date && dt.month === current.month && dt.year === current.year;
                const isCurrentMonth = new Date(disp.year, disp.month, disp.date).getMonth() ===
                      new Date(dt.year, dt.month, dt.date).getMonth();
                return (
                  <div
                    key={idx}
                    className={`row-start-${Math.abs(idx / 7)} ${
                      isToday
                        ? "bg-amber-200 ring-2 ring-amber-500"
                        : isCurrentMonth
                        ? "bg-orange-50"
                        : "bg-stone-200"
                    } border-r border-amber-200 ${
                      new Date(dt.year, dt.month, dt.date).getDay() === 0
                        ? "border-l border-amber-200"
                        : null
                    } border-b border-amber-200 hover:bg-amber-100 hover:scale-105 cursor-pointer transition-all`}
                  >
                    <Link to={`/${dt.year}/${dt.month}/${dt.date}`}>
                      <p className={`${isToday ? "font-bold text-amber-800" : "text-amber-900"}`}>{dt.date}</p>

                      <ul>
                        {dt.events.map((ev, ix) => {
                          return (
                            <li
                              key={ix * idx}
                              className="text-xs text-white p-0.5 rounded-lg w-3/4 bg-amber-700 shadow-sm"
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
        className="absolute left-1/2 -translate-x-1/2 bottom-10 text-white text-center bg-amber-700 hover:bg-amber-600 p-3 px-6 rounded-full text-lg shadow-lg hover:scale-95 transition-all"
      >
        + Add to Schedule
      </Link>
    </div>
  ) : (
    <p>Loading...</p>
  );
  return content;
}
