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

  const updateTaskList = ( list ) => setTaskList(list)
  
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
    if(!authorized) navigate("/signin")
  },[]) 

  //ComponentWillUnmount // useEffect hook with return statement, we will pass a call back in return statement
  // that will be triggered as component is demounting
  
  // it is a way to do something when we are demounting this component
  // we clear those effects or memories that are no more required in our APP in return method of useEffect

  useEffect(()=>{
    return(()=>{

      console.log("component demounted")
    })
  })

  return (
    <div>
      {/* Component to add new Task */}
      <NewTask 
        updateTaskList={updateTaskList} 
        fetchUpdatedTasks={fetchUpdatedTasks}/>
      {/* Component to render all submitted Tasks */}
      <TasksList 
        taskList={taskList} 
        updateTaskList={updateTaskList}/>
    </div>
  );
}

export default Dashboard;
