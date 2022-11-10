import Tasks from "../models/toDoModel.js"

export const todoCreator = async (req, res) => {

    const {title, description, image} = req.body
    const {userEmail} = req
    console.log("my email in dashboard", userEmail)

try{
    const newTask = new Tasks({
        title,
        description,
        image,
        email: userEmail
    })

    //Saving new Record
    const savedTask = await newTask.save()

    // After new record saved successfully
    if(savedTask){

    // Making a querry to database to get all Tasks that were created by the current logged in user

    // const allTasks = await Tasks.find({email:userEmail})

    // in Response sending status that record saved successfully and also sending the new updated list of Tasks of the 
    // current logged in user

    res.status(200).json({
        status:"save",
       
    })}
}catch(err){
    res.status(401).json({message: err.message})
}

}

export const getTodoList = async (req,res) => {
    console.log("email of the current logged in user", req.userEmail)
    const { userEmail } = req
    try{
        const toDoList = await Tasks.find({email:userEmail},{title:1, description:1})
        res.status(200).json({toDoList})

    }catch(err){

        res.status(501).json({message: err.message})
    }
}