import React from 'react'
import {Link} from 'react-router'
export default function Square({data, year, month, day}) {
  
  return (
    <Link className='border-1 h-24 hover:scale-105' to={`/${year}/${month}/${day}`}>
      <h5>{data.date}</h5>
      {data ? data.events.map((event, idx) => {
        return (
          <p key={idx}>{event.name}</p>
        )
      }) : null}
    </Link>
  )
}
