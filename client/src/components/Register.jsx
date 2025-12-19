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
    <div className="min-h-screen flex items-center justify-center">
      <form encType="multipart/form-data" className="bg-orange-50 p-10 rounded-2xl shadow-xl text-center flex flex-col border border-amber-200" onSubmit={submit}>
        <h3 className="text-4xl font-bold font-serif text-amber-800 mb-6">Join the Family</h3>
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
          <Link className="rounded-full bg-stone-400 hover:bg-stone-500 text-white p-2 px-5 mx-3 shadow-lg hover:scale-95 cursor-pointer transition-all" to={"/"}>Cancel</Link>
          <button className="rounded-full bg-amber-700 hover:bg-amber-600 text-white p-2 px-5 mx-3 shadow-lg hover:scale-95 cursor-pointer transition-all">Register</button>
        </div>
      </form>
    </div>
  )
}
