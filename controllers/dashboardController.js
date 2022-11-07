import Dashboard from "../models/toDoModel.js"

export const todoCreator = async (req, res) => {

    const {title, description, image} = req.body
try{
    const newTask = new Dashboard({
        title,
        description,
        image
    })

    const savedTask = await newTask.save()
    if(savedTask)
    res.status(200).json({
        status:"save"
    })
}catch(err){
    res.status(401).json({message: err.message})
}

}

export const getTodoList = () => {
    
}