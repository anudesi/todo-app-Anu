import React,{useState, useEffect} from 'react'
import axios from "axios"

function Signin() {

    const [userData, setUserData] = useState({
        email:"",
        password:"",
  
    })




    const submitHandler = (e) =>{
        e.preventDefault()
        setUserData({
            email:e.target.email.value,
            password:e.target.password.value
        })
        axios.post(`${process.env.REACT_APP_BE_URL}/auth/signin`,userData)
    .then(res=>console.log("response from backend", res))
    .catch(err => console.log(err))
    }    
    return (
    <div>
        <h3>Log In</h3>
        <form action='post' onSubmit={submitHandler}>
            <div>
            <label htmlFor="email">Email   :  </label>
            <input type="email" id="email" placeholder="enter your email" name="email"/>
            </div>

            <div>
            <label htmlFor="password">password   :  </label>
            <input type="password" id="password" placeholder="enter your password" name="password" />
            </div>

            <button type='submit'> Log In</button>
        </form>

        </div>
    )
}

export default Signin
