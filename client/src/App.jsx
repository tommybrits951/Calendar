import { useState, useEffect, createContext } from 'react'
import Month from './components/Month'
import './App.css'
const initEvent = {
  event_start: "",
  event_end: "",
  event_name: "",
  event_street: "",
  event_city: "",
  event_province: "",
  event_postal: ""
}
const weekDays = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat"
]
const monthNames = [
  "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
]
export const CalContext = createContext()
function App() {
  const [event, setEvent] = useState(initEvent)
  const [dates, setDates] = useState(null)
  let currentDate = new Date()
  let month = currentDate.getMonth()
  let year = currentDate.getFullYear()

  useEffect(() => {
    const dayOne = new Date(year, month, 1).getDay()
    const lastDate = new Date(year, month + 1, 0).getDate()
    const dayEnd = new Date(year, month, lastDate).getDay()
    const monthLast = new Date(year, month, 0).getDate()
    let num = Math.ceil(lastDate / 7)
    let days = []
    let weeks = []
    for (let i = 0; i < num; i++) {
      weeks = [...weeks, weekDays]
    }
    for (let i = dayOne; i > 0; i--) {
      days = [...days, <div key={i + 100} className='h-28 border-2 border-black p-2 hover:bg-slate-500 bg-slate-700 text-white'>{monthLast - i + 1}</div>]
    }
    for (let i = 1; i <= lastDate; i++) {
      days = [...days, <div key={i} className='h-28 border-2 border-black p-2 hover:bg-stone-400 bg-stone-600 text-white'>{i}</div>]
    }
    for (let i = dayEnd; i < 6; i++) {
      days = [...days, <div key={i + 200} className='h-28 border-2 border-black p-2 hover:bg-slate-300 bg-slate-200'>{i - dayEnd + 1}</div>]
    }
    setDates({dayOne, lastDate, dayEnd, monthLast, weeks, days})
  }, [])
  return (
   <main>
    <CalContext.Provider value={{
      dates,
      monthNames,
      weekDays,
      currentDate
    }}>

    <Month />
    </CalContext.Provider>
   </main>
  )
}

export default App
