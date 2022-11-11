import React from 'react'
import {Link, BrowserRouter as router, Router, useNavigate} from "react-router-dom"

function NavBar(props) {

    const {authorized, authHandler} = props   
    const navigate = useNavigate()

    const listStyling ={
        display:"flex",
        listStyle:"none", 
        justifyContent:"space-evenly" ,
        width:"100vw",
        position:"absolute",
        top:0,
        left:0, 
        backgroundColor:"white" 
    }

    const mangageAuthorization = () => {
        if(authorized) {
            navigate("/")
            localStorage.removeItem("toDoToken")
            authHandler()
        }
        else navigate("/signin")      
    }
    return (
        <div>
            <ul 
            style={listStyling}>
                <li>
                    <Link 
                        to="/"  
                        style={{textDecoration:"none"}}>
                        Home
                    </Link>
                </li>
                {!authorized?
                (<>
                <li>
                    <Link 
                        to="/signin"  
                        style={{textDecoration:"none"}}>
                        Signin
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/signup"  
                        style={{textDecoration:"none"}}>
                        Signup
                    </Link>
                </li>
                </>)
                :null}

                {authorized?
                (<li>
                    <Link 
                        to="/dashboard"  
                        style={{textDecoration:"none"}}>
                        Dashboard
                    </Link>
                </li>)
                : null}

                <li 
                    onClick={mangageAuthorization}
                    style={{color:"black", border:"2px red solid"}}>
                    {
                        authorized? 
                        "Logout":
                        "Login"
                    }
                </li>
            </ul>
        </div>
    )
}
export default NavBar
