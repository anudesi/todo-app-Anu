import React, {useState} from 'react'
import FileBase64 from "react-file-base64";
import axios from "axios";



function NewTask(props) {

    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState(false);
  
    const {updateTaskList, fetchUpdatedTasks} = props

    const postRequestHandler = async (e) => {
        e.preventDefault();
        const data = { title, description, image };
        await axios.post(`${process.env.REACT_APP_BE_URL}/dashboard/create-todo`, data,
        {
          headers:{
            'authorization': `Bearer ${JSON.parse(localStorage.getItem("toDoToken"))}`
        }})
        .then(res=>{
            fetchUpdatedTasks()
            //updateTaskList(res.data.list)
            setMessage(true);
            setTitle("");
            setDescription("");
            setImage("");
        })
        .catch(err=>console.log(err))

        
      };

    return (
        <>
        <form action="post" onSubmit={postRequestHandler}>
          <div>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              name="title"
              placeholder="Title of the task"
            />
          </div>
          <div>
            <input
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              type="text"
              name="todo"
              placeholder="Description"
            />
          </div>
          <div>
            <FileBase64
              multiple={false}
              onDone={({ base64 }) => {
                setImage(base64);
              }}
            />
          </div>

          <button type="submit">Insert</button>
          <hr />
          {message ? (
            <h3 style={{ color: "green" }}>Data inserted successfully!</h3>
          ) : (
            ""
          )}
        </form></>
    )
}

export default NewTask
