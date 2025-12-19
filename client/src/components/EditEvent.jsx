import { useContext, useState, useEffect } from "react";
import { CalContext } from "../App";
import axios from '../api/axios'
import { useNavigate, useParams } from "react-router";
import { format } from "date-fns";

export default function EditEvent() {
  const { auth, disp } = useContext(CalContext);
  const { eventId } = useParams();
  const [formData, setFormData] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/events/${eventId}`, {
        headers: { Authorization: `Bearer ${auth}` }
      })
      .then((res) => {
        const event = res.data;
        setFormData({
          name: event.name || "",
          location: event.location || "",
          start_time: format(new Date(event.start_time), "yyyy-MM-dd'T'HH:mm"),
          end_time: format(new Date(event.end_time), "yyyy-MM-dd'T'HH:mm"),
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setErr("Failed to load event");
        setLoading(false);
      });
  }, [eventId, auth]);

  function change(e) {
    setErr("");
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
  }

  function submit(e) {
    e.preventDefault();

    const start = new Date(formData.start_time).getTime();
    const end = new Date(formData.end_time).getTime();
    if (start >= end) {
      return setErr("The event ending time must be after start time.");
    }

    const obj = {
      ...formData,
      start_time: start,
      end_time: end
    };

    axios
      .put(`/events/${eventId}`, obj, {
        headers: { Authorization: `Bearer ${auth}` }
      })
      .then(() => {
        navigate(`/${disp.year}/${disp.month}`);
      })
      .catch((err) => {
        console.log(err);
        setErr("Failed to update event");
      });
  }

  function cancel() {
    navigate(-1);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 flex justify-center items-center">
        <p className="text-amber-800 text-2xl font-serif">Loading...</p>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 flex justify-center items-center">
        <p className="text-amber-800 text-2xl font-serif">Event not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 flex items-center justify-center py-10">
      <form
        onSubmit={submit}
        className="bg-orange-50 border border-amber-200 rounded-2xl shadow-xl p-8 w-full max-w-md"
      >
        <h3 className="text-4xl text-amber-800 font-serif font-bold text-center mb-6">Edit Event</h3>

        <p className="text-red-500 text-center mb-4">{err}</p>

        <label className="block text-amber-900 mb-4">
          Event Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={change}
            className="w-full mt-1 p-2 rounded-lg border border-amber-300 focus:border-amber-500 focus:outline-none text-amber-900"
          />
        </label>

        <label className="block text-amber-900 mb-4">
          Location
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={change}
            className="w-full mt-1 p-2 rounded-lg border border-amber-300 focus:border-amber-500 focus:outline-none text-amber-900"
          />
        </label>

        <label className="block text-amber-900 mb-4">
          Start Time
          <input
            type="datetime-local"
            name="start_time"
            value={formData.start_time}
            onChange={change}
            className="w-full mt-1 p-2 rounded-lg border border-amber-300 focus:border-amber-500 focus:outline-none text-amber-900"
          />
        </label>

        <label className="block text-amber-900 mb-6">
          End Time
          <input
            type="datetime-local"
            name="end_time"
            value={formData.end_time}
            onChange={change}
            min={formData.start_time}
            className="w-full mt-1 p-2 rounded-lg border border-amber-300 focus:border-amber-500 focus:outline-none text-amber-900"
          />
        </label>

        <div className="flex justify-center gap-4">
          <button
            type="button"
            onClick={cancel}
            className="bg-stone-400 hover:bg-stone-500 shadow-lg rounded-full px-6 py-2 text-white cursor-pointer hover:scale-95 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-amber-700 hover:bg-amber-600 shadow-lg rounded-full px-6 py-2 text-white cursor-pointer hover:scale-95 transition-all"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
