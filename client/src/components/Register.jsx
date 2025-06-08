import {useState, useContext} from 'react'
import {Link, useNavigate} from 'react-router'
import { CalContext } from '../App'
import axios from '../api/axios'
export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const navigate = useNavigate()
  const {setAuth} = useContext(CalContext)

  function change(e) {
    const {name, value} = e.target
    setFormData({...formData, [name]: value})
  }
  function submit(e) {
    e.preventDefault()
    axios.post("/users", formData)
    .then(res => {
        console.log(res.data)
        setAuth(res.data)
    })
    .catch(err => {
        console.log(err)
    })
    .finally(() =>{
      navigate("/")
    })
  }

    return (
    <form encType="multipart/form-data" className="pt-10 text-center flex flex-col" onSubmit={submit}>
      <h3 className="text-4xl font-bold font-mono text-cyan-700">New User</h3>
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
        <Link className="rounded bg-cyan-500 text-white p-2 mx-5 shadow-xl hover:scale-95 cursor-pointer" to={"/"}>Cancel</Link>
        <button className="rounded bg-cyan-500 text-white p-2 mx-5 shadow-xl hover:scale-95 cursor-pointer">Submit</button>
      </div>
    </form>
  )
}
