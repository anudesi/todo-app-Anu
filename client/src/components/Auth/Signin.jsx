import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from "react-google-login"

function Signin(props) {

    const [error, setError] = useState("")
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    })
    const { itCouldBeAnyName } = props
    const navigate = useNavigate()

    const blurHandler = (e) => {
        const propertyName = e.target.name
        const propertyValue = e.target.value
        setUserData(oldState => {
            return {
                ...oldState,
                [propertyName]: propertyValue,

            }
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_BE_URL}/auth/signin`, userData)
            .then(res => {
                localStorage.setItem("toDoToken", JSON.stringify(res.data.data.token))
                itCouldBeAnyName()
                navigate("/dashboard")
            })
            .catch(err => setError(err.response.data.message))
    }

    const onSuccess = (res) => {
        console.log("succss", res)
    }

    const onFailure = (err) => {
        console.log("error", err)
    }
    return (
        <div>
            <h3>Log In</h3>
            <form action='post' onSubmit={submitHandler}>
                <div>
                    <label 
                        htmlFor="email">
                        Email   :  
                        </label>
                    <input 
                        type="email" 
                        id="email" 
                        placeholder="enter your email" 
                        name="email" 
                        autoComplete='none' 
                        onBlur={blurHandler} />
                </div>

                <div>
                    <label 
                        htmlFor="password">
                        password   :
                    </label>

                    <input 
                        type="password"
                        id="password"
                        placeholder="enter your password"
                        name="password"
                        onBlur={blurHandler} />
                </div>
                <button 
                    type='submit'> 
                    Log In
                </button>
                <hr />
                {
                    error ? 
                        (<p>{error}</p>) 
                        : null
                }
                <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT}
                    buttonText="Google Login"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                />
            </form>
        </div>
    )
}

export default Signin
