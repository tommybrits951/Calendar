import { useState, useContext } from "react";
import { CalContext } from "../App";
import axios from "../api/axios";
import { Link } from "react-router";
const initForm = {
  email: "",
  password: "",
};

export default function Login() {
  const { setAuth } = useContext(CalContext);
  const [formData, setFormData] = useState(initForm);
  const [err, setErr] = useState("")

  function authHandler(token) {
    return setAuth(token)
  }


  function submit(e) {
    e.preventDefault();
    

    axios.post("/users/auth", formData)
    .then(res => {
      console.log(res.data)
      authHandler(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }
  function change(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form encType="multipart/form-data" className="bg-orange-50 p-10 rounded-2xl shadow-xl text-center flex flex-col border border-amber-200" onSubmit={submit}>
        <h3 className="text-4xl font-bold font-serif text-amber-800 mb-6">Welcome Home</h3>
        <label className="text-lg text-amber-900 mt-3">
          Email
          <br />
          <input className="text-amber-900 p-2 rounded-lg bg-white border border-amber-300 focus:border-amber-500 focus:outline-none mt-1"
            type="email"
            name="email"
            value={formData.email}
            onChange={change}
            required
          />
        </label>
        <br />
        <label className="text-lg text-amber-900 mt-3">
          Password
          <br />
          <input className="text-amber-900 p-2 rounded-lg bg-white border border-amber-300 focus:border-amber-500 focus:outline-none mt-1"
            type="password"
            name="password"
            value={formData.password}
            onChange={change}
            required
          />
        </label>
        <br />
        <div className="flex justify-center mt-4">
          <Link className="rounded-full bg-stone-400 hover:bg-stone-500 text-white p-2 px-5 mx-3 shadow-lg hover:scale-95 cursor-pointer transition-all" to={"/register"}>New User</Link>
          <button className="rounded-full bg-amber-700 hover:bg-amber-600 text-white p-2 px-5 mx-3 shadow-lg hover:scale-95 cursor-pointer transition-all">Sign In</button>
        </div>
      </form>
    </div>
  );
}
