import {useContext, useState} from 'react'
import { CalContext } from '../App'

const initForm = {
    name: "",
    start_time: "",
    end_time: "",
    location: ""
}
export default function EventForm() {
  const [formData, setFormData] = useState(initForm)
  const [err, setErr] = useState("")

    function change(e) {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value})
    }
    function submit(e) {
        e.preventDefault()
    }

    return (
    <form onSubmit={submit}>
        <h3>Add Event to Schedule</h3>
        <p>{err}</p>
        <label>
            Event Name
            <br />
            <input 
                type='text'
                name='name'
                value={formData.name}
                onChange={change}
            />
            <br />
        </label>
        <label>
            Start Time
            <br />
        <input 
            type='datetime-local'
            name='start_time'
            value={formData.start_time}
            onChange={change}
        />
        </label>
            <br />
            <label>
                End Time
                <br />
                <input
                    type='datetime-local'
                    name='end_time'
                    value={formData.end_time}
                    onChange={change}
                />
            </label>
            <label>
                Location
                <br />
                <input
                    type='text'
                    name='location'
                    value={formData.location}
                    onChange={change}
                />
            </label>
            <div>
                <button>Cancel</button>
                <button>Submit</button>
            </div>
    </form>
  )
}
