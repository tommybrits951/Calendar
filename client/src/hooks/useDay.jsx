/* import {useState, useEffect} from 'react'




export default function useDay(events, year, month, day) {
    const [hrs, setHrs] = useState()
    
    const firstHour = events ? new Date(`${year}-${parseInt(month) + 1}-${day} 00:00:00`).getTime() : null
    const lastHour = events ? new Date(`${year}-${parseInt(month) + 1}-${day} 24:00:00`).getTime() : null
    useEffect(() => {

        let tmp = []
        for (let i = firstHour; i <= lastHour; i += 900000) {
            tmp = [...tmp, i]
        }
        let arr = []
        {events ? tmp.map((time) => {
            let obj = {
                hour: time,
                events: []
            }
            events.map(event => {
                const start = new Date(event.start_time).getTime()
                const end = new Date(event.end_time).getTime()
                if (parseInt(time) >= parseInt(start) && parseInt(time) <= parseInt(end)) {
                    obj = {...obj, events: [...obj.events, true]}
                } else {
                    obj = {...obj, events: [...obj.events, false]}
                }
                arr = [...arr, obj]
            })
            setHrs(arr)   
        }) : null}
    }, [])
    return [hrs]
}
 */