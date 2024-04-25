import {useContext, useState, useEffect} from 'react'
import { CalContext } from '../App'
export default function Month() {
  const { dates, monthNames, weekDays, currentDate} = useContext(CalContext)
  

  useEffect(() => {
    console.log(dates)//
    console.log(weekDays)
  }, [])

  return (
    <section>
      <h2 className='text-center text-6xl font-mono'>{monthNames[new Date().getMonth()]}</h2>
      <header className='grid grid-cols-7 mt-5'>
        {weekDays.map((dy, idx) => {
          return <h3 key={idx} className='text-black text-xl text-center border-x-2 font-serif'>{dy}</h3>
        })}
      </header>
      <div className={`grid grid-cols-7 mx-2 grid-rows-${dates !== null ? dates.weeks.length : null}`}>
        {dates !== null ? dates.days.map((dy, idx) => {
          
          return(
            dy
          )
        }) : null}
      </div>
    </section>
  )
}
