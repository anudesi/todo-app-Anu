import React from 'react'
import {Link, BrowserRouter as router, Router, useNavigate} from "react-router-dom"
function NavBar(props) {

    const {authorized, authHandler} = props
    
    const navigate = useNavigate()

    const mangageAuthorization = () => {
        if(authorized) {
            navigate("/")
            authHandler()
        }
        else navigate("/signin")
            
    }


    return (
        <div>
     

            <ul style={{display:"flex", listStyle:"none", justifyContent:"space-evenly" , width:"100vw", position:"absolute", top:0, left:0, backgroundColor:"white" }}>
                <li>
                    <Link to="/"  style={{textDecoration:"none"}}>
                        Home
                    </Link>
                </li>
                {!authorized?
                (<>
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
                </>)
                :null}

                {authorized?
                (<li>
                    <Link to="/dashboard"  style={{textDecoration:"none"}}>
                        Dashboard
                    </Link>
                </li>)
                : null}


                 <button onClick={mangageAuthorization}>
                <li>
                    {authorized? "Logout" : "Login"}
                </li>
                 </button>
     
            </ul>
  
        </div>
    )
}

export default NavBar
