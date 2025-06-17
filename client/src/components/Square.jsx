import {Link} from 'react-router'
import hours from "../data/makeSquareHours";
export default function Square({ num }) {
    return (
        <Link to={`/${num}`} className="grid grid-cols-2 bg-white text-black border-l-1 border-b-1 hover:scale-95 p-1">
            <h3>{num}</h3>
            <div className="grid grid-cols-12">{hours.map((n, idx) => {
                return idx < 11 ? <div key={idx}></div> : null
            })}</div>
            <div className="grid grid-cols-12">{hours.map((n, idx) => {
                return idx >= 11 ? <div key={idx}></div> : null
            })}</div>
        </Link>
    )
}
