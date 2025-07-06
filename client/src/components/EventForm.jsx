import { useContext, useState } from "react";
import { CalContext } from "../App";
import axios from '../api/axios'
import { useNavigate } from "react-router";
const initForm = {
  name: "",
  start_time: "",
  end_time: "",
  location: "",
  address: "",
  postal: "",
};

let yrs = [];

for (let i = 2025; i < 2100; i++) {
  yrs = [...yrs, i];
}

export default function EventForm() {
  const { auth, disp } = useContext(CalContext);
  const [formData, setFormData] = useState(initForm);
  const [err, setErr] = useState("");
  const navigate = useNavigate()
  function change(e) {
    setErr("")
    const { name, value } = e.target;
        setFormData({...formData, [name]: value})
  }

  function submit(e) {
    e.preventDefault();
    
    const start = new Date(formData.start_time).getTime()
    const end = new Date(formData.end_time).getTime()
    if (start >= end) {
      return setErr("The event ending time must be after start time.")
    } else {

      const obj = {
        ...formData,
        start_time: start,
        end_time: end
      }
      axios
      .post(
        "/events",
        obj,
        {
          headers: {
            Authorization: `Bearer ${auth}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        navigate(`/${disp.year}/${disp.month}`)
      })
    }
  }
  
  return (
    <div className="flex flex-col bg-slate-500 h-full text-center pt-5">

    <form
      onSubmit={submit}
      className="absolute flex flex-col bg-slate-500 w-1/2 left-1/4 h-full text-center pt-5"
    >

      <h3 className="text-5xl text-white underline my-4">Schedule Event</h3>

      <p>{err}</p>

      <label className="text-white">
        Event Name
        <br />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={change}
          className="text-black bg-white p-1 rounded"
        />
        <br />
      </label>
      <br />
      <label className="text-white">
        Location
        <br />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={change}
          className="text-black bg-white p-1 rounded"
        />
      </label>
      <br />
      <label className="text-white">
        Start Time
        <br />
        <input
          type="datetime-local"
          name="start_time"
          value={formData.start_time}
          onChange={change}
          min={new Date()}
          className="bg-white p-1 rounded text-black"
        />
      </label>
      <br />
      <label className="text-white">
        End Time
        <br />
        <input
          type="datetime-local"
          name="end_time"
          value={formData.end_time}
          onChange={change}
          min={formData.start_time}
          className="bg-white p-1 rounded text-black"
        />
        <br />
      </label>
      <div className="flex justify-around p-3">
        <button className="bg-cyan-500 shadow-xl rounded p-2 text-white cursor-pointer hover:scale-95">Cancel</button>
        <button className="bg-cyan-500 shadow-xl rounded p-2 text-white cursor-pointer hover:scale-95">Submit</button>
      </div>
    </form>
  </div>
  );
}
