import { useEffect, useState, useContext } from "react";
import {CalContext} from '../App'
import { useParams, useNavigate, Link } from "react-router";
import { format } from "date-fns";
import axios from "../api/axios";

export default function Day() {
  const { year, month, day} = useParams();
  const {dates, auth} = useContext(CalContext)
  const navigate = useNavigate()

  const [eventList, setEventList] = useState(null)


  function sortDates() {
    let today = dates[parseInt(day) + 1]
    let tmp = [...today.events]
    tmp.sort((a, b) => new Date(a.start_time) - new Date(b.start_time))

    setEventList(tmp)
  }

  function handleDelete(eventId) {
    if (!confirm("Are you sure you want to delete this event?")) return;

    axios
      .delete(`/events/${eventId}`, {
        headers: { Authorization: `Bearer ${auth}` }
      })
      .then(() => {
        setEventList(eventList.filter(e => e._id !== eventId))
      })
      .catch(err => console.log(err))
  }


  useEffect(() => {
  dates ? sortDates() : null
  }, [dates])

  return (
    <section className="absolute w-full h-full bg-gradient-to-b from-amber-50 to-orange-100 overflow-y-scroll">
      <div className="flex justify-between items-center px-4 py-4 bg-amber-800 shadow-md">
        <button
          onClick={() => navigate(`/${year}/${month}`)}
          className="text-white bg-amber-600 hover:bg-amber-500 px-4 py-2 rounded-full hover:scale-95 transition-all shadow"
        >
          Back
        </button>
        <h2 className="text-white text-center text-3xl font-serif">{format(new Date(year, month, day), "MMMM do")}</h2>
        <Link
          to="/newevent"
          className="text-white bg-amber-600 hover:bg-amber-500 px-4 py-2 rounded-full hover:scale-95 transition-all shadow"
        >
          + Add
        </Link>
      </div>
      <ul className="w-full py-5 px-4">
        {eventList ? eventList.map((event, idx) => {
          return (
          <li key={idx} className="flex flex-col mt-5 rounded-xl">
            <div className="bg-orange-50 border border-amber-200 rounded-2xl p-4 shadow-md mx-auto w-11/12">
              <h4 className="text-xl font-bold text-amber-900 font-serif">{event.name.toUpperCase()}</h4>
              <p className="text-amber-700 mt-1">{format(new Date(event.start_time), "h:mm aa")}</p>
              <p className="text-amber-800 mt-1">Location: <span className="text-amber-600 font-semibold">{event.location.toUpperCase()}</span></p>
              <div className="flex justify-center gap-3 mt-3">
                <Link
                  to={`/edit/${event._id}`}
                  className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-1 rounded-full text-sm hover:scale-95 transition-all shadow"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="bg-red-400 hover:bg-red-500 text-white px-4 py-1 rounded-full text-sm hover:scale-95 transition-all shadow"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
          )
        }) : <p className="text-amber-800 text-center text-lg">Loading...</p>}
      </ul>
    </section>
  );
}
