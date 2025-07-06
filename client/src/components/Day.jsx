import { useEffect, useState, useContext } from "react";
import {CalContext} from '../App'
import { useParams } from "react-router";
import { format } from "date-fns";

export default function Day() {
  const { year, month, day} = useParams();
  const {dates} = useContext(CalContext)
  
  const [eventList, setEventList] = useState(null)


  function sortDates() {
    let today = dates[parseInt(day) + 1]
    let tmp = today.events
    tmp.sort((a, b) => a.start_time > b.start_time)
    console.log(tmp)
    
    setEventList(tmp)
  }


  useEffect(() => {
  dates ? sortDates() : null
  }, [dates])
    
  return (
    <section className="absolute w-full h-full bg-black overflow-y-scroll">
      <h2 className="text-white text-center text-4xl mt-3">{format(new Date(year, month, day), "MMMM do")}</h2>
      <ul className="text-white w-full py-5">
        {eventList ? eventList.map((event, idx) => {
          return (
          <li key={idx} className="flex flex-col mt-5 h-28 rounded-xl">
            <div className="dot align-middle">0</div>
            <div className="text-center bg-cyan-300 h-28 rounded-xl text-black font-bold font-serif w-3/4 absolute left-1/8 pt-3">

            <h4>{event.name.toUpperCase()}</h4>
            <p>{format(new Date(event.start_time), "HH:mm aa")}</p>
            <p>Location: <span className="text-blue-800">{event.location.toUpperCase()}</span></p>
            </div>
          </li>
          )
        }) : <p>Loading...</p>}
      </ul>
    </section>
  );
}
