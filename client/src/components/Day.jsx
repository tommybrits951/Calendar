import { useParams } from "react-router"
import { useEffect, useContext } from "react"
import { CalContext } from "../App"

export default function Day() {
  const {date_num} = useParams()
    const {weekdayNames, year, month} = useContext(CalContext)
    const day = new Date(year, month, date_num).getDay()
    useEffect(() => {
    console.log(weekdayNames[day])
    }, [])
    return (
    <div className='absolute flex flex-col text-center w-1/5x h-9/12 mt-5 justify-between'>
        <h3 className="text-center text-3xl">{weekdayNames[day]}</h3>
        
    </div>
  )
}
