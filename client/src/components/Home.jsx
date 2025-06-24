import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { CalContext } from "../App";

export default function Home() {
    const {auth} = useContext(CalContext)
    const navigate = useNavigate();
    const content = <p>Loading...</p>
    useEffect(() => {
        auth !== null ? navigate(`/${new Date().getFullYear()}/${new Date().getMonth()}`) : navigate("/")
    }, [])
 return content 
}
