import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NewTask from "./NewTask";
import TasksList from "./TasksList";

function Dashboard(props) {
 
  const navigate = useNavigate()
  const {authorized} = props

  const [taskList, setTaskList] = useState([])

  const updateTaskList = ( list ) =>{
    setTaskList(list)
  }

  const fetchUpdatedTasks = () =>{
    const myToken = JSON.parse(localStorage.getItem("toDoToken"))
        const configuration = {
            
            headers:{
                'Authorization' : `Bearer ${myToken}`
            }
        }
    axios.get(`${process.env.REACT_APP_BE_URL}/dashboard/my-tasks`,configuration)
    .then(res=>setTaskList(res.data.toDoList))
    .catch(err=>console.log(err))
  }

  //Component will mount

   useEffect(()=>{
    if(!authorized) 
      navigate("/signin")
  },[]
  ) 

  // it is a way to do something when we are demounting this component
  //ComponentWillUnmount

  useEffect(()=>{
    return(()=>{

      console.log("component demounted")
      // we clear those effects or mmemories that are no more required in our APP
    })
  })

  return (
    <div>
      <NewTask updateTaskList={updateTaskList} fetchUpdatedTasks={fetchUpdatedTasks}/>
      <TasksList taskList={taskList} updateTaskList={updateTaskList}/>
    </div>
  );
}

export default Dashboard;
