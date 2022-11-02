import React from 'react'
import {Link, BrowserRouter as router, Router} from "react-router-dom"
function NavBar() {
    return (
        <div>
     

            <ul style={{display:"flex", listStyle:"none", justifyContent:"space-evenly" , width:"100vw", position:"absolute", top:0, left:0, backgroundColor:"white" }}>
                <li>
                    <Link to="/"  style={{textDecoration:"none"}}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/signin"  style={{textDecoration:"none"}}>
                        Signin
                    </Link>
                </li>
                <li>
                    <Link to="/signup"  style={{textDecoration:"none"}}>
                        Signup
                    </Link>
                </li>
                <li>
                    <Link to="/dashboard"  style={{textDecoration:"none"}}>
                        Dashboard
                    </Link>
                </li>
            </ul>
  
        </div>
    )
}

export default NavBar
