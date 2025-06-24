import { useState, useEffect } from "react";
import dayHours from "../data/dayHours";
import { useParams } from "react-router";
export default function Day() {
  const { year, month, day } = useParams();
  const [hrs, setHrs] = useState([])
  

  useEffect(() => {
    const first_hour = new Date(`${year}-${month}-${day} 00:00:00`).getTime()
    const last_hour = new Date(`${year}-${month}-${day} 24:00:00`).getTime()
    let num = 0
    let arr = []
    for (let i = 1; i <= 24; i++) {
      const x = Math.floor((first_hour - last_hour) / 24)
      console.log(x)
      arr.push(num)
    }
    setHrs([...arr])
  }, []);
  return (
    <div>
      <div className="flex">
        
      </div>
    </div>
  );
}
