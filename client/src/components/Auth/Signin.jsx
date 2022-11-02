import React,{useState, useEffect} from 'react'
import axios from "axios"

function Signin() {

    const [userData, setUserData] = useState({
        email:"",
        password:"",
  
    })

const blurHandler = (e) =>{
    
        const propertyName = e.target.name
        const propertyValue = e.target.value
        setUserData(oldState=>{
            return {
                ...oldState,
        [propertyName]: propertyValue,
        
    }}
    )

}


    const submitHandler = (e) =>{
        e.preventDefault()

        console.log(userData)
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
            <input type="email" id="email" placeholder="enter your email" name="email" autoComplete='none' onBlur={blurHandler}/>
            </div>

            <div>
            <label htmlFor="password">password   :  </label>
            <input type="password" id="password" placeholder="enter your password" name="password" onBlur={blurHandler}/>
            </div>

            <button type='submit'> Log In</button>
        </form>

        </div>
    )
}

export default Signin
