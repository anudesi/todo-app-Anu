import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

function TasksList(props) {


    const {taskList, updateTaskList} = props
    console.log("props in tasklist", props)
    const listStyling = {

        listStyle:"none"
    }

    useEffect(()=>{

        const myToken = JSON.parse(localStorage.getItem("toDoToken"))
        const configuration = {
            
            headers:{
                'Authorization' : `Bearer ${myToken}`
            }
        }
        axios.get(`${process.env.REACT_APP_BE_URL}/dashboard/my-tasks`,configuration)
            .then(res=>updateTaskList(res.data.toDoList))
            .catch(err=>console.log(err))
    },[])
    return (
        <>
        <ul>
            {taskList.map(task => <li style={listStyling}>{task.title}</li>)}
        </ul> 
        </>
        )
    }
    
    export default TasksList
