import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'

function Home() {


    useEffect(()=>console.log("compoenent rerendered"))
    const inputRef = useRef(null)
    const [error, setError] = useState(false)
    const submitHandler = (e) =>{
        e.preventDefault()
        console.log("my value",inputRef.current.value)
    }

    const changeHanlder = (e) => {
        setError(false)
        if(inputRef.current.value.includes("t")) setError(true)
    }

    return (
        <div>
            Testing useRef Hook Issue
            <form onSubmit={submitHandler} >
                <input type={"text"} ref={inputRef} onChange={changeHanlder} />
                <button type='submit'>Submit</button>
            </form>
            {error? "You have an invalid letter T":""}
        </div>
    )
}

export default Home
