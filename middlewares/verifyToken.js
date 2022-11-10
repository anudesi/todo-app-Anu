
import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) =>{

    try{
    
    const token = req.headers.authorization?.split(" ")[1]
    if(!token) return  res.status(401).json({message: "Not Authorized"})
    const authorized = jwt.verify(token,process.env.JWT_SECRET )
    console.log(authorized)
    if(authorized)
    // We will call next only when if it is a valid
    next()

    // if token is not valid we will simply sent a bad request response backt to user
    else res.status(401).json({message: "Not Authorized"})

}catch(err){
    res.status(402).json({message: err.message})
}
}