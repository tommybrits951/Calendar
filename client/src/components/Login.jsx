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
    <form encType="multipart/form-data" className="pt-10 text-center flex flex-col" onSubmit={submit}>
      <h3 className="text-4xl font-bold font-mono text-cyan-700">Sign In</h3>
      <label className="text-lg mt-3">
        Email
        <br />
        <input className="text-black p-1 rounded bg-white "
          type="email"
          name="email"
          value={formData.email}
          onChange={change}
          required
        />
      </label>
      <br />
      <label className="text-lg mt-3">
        Password
        <br />
        <input className="text-black p-1 rounded bg-white "
          type="password"
          name="password"
          value={formData.password}
          onChange={change}
          required
        />
      </label>
      <br />
      <div className="flex justify-center">
        <Link className="rounded bg-cyan-500 text-white p-2 mx-5 shadow-xl hover:scale-95 cursor-pointer" to={"/register"}>New User</Link>
        <button className="rounded bg-cyan-500 text-white p-2 mx-5 shadow-xl hover:scale-95 cursor-pointer">Submit</button>
      </div>
    </form>
  );
}
