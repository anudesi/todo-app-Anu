import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signupController = async (req, res) => {
  const { email, password, name } = req.body;

  const foundUser = await User.findOne({ email });

  if (foundUser)
    return res
      .status(401)
      .json({ status: "failed", message: "email already registered" });

  const saltRound = 10;
  const salt = await bcrypt.genSalt(saltRound);
  const hashedPassword = await bcrypt.hash(password, salt);

  req.body.password = hashedPassword;
  const user = new User(req.body);
  await user.save();
  //res.status(200).json({ status: "success", message: "user registered" });

  //Create a payload for token
  const payload = {
    id: user._id,
    name: user.name,
  };

  //Create a token
  jwt.sign(payload, "randomString", { expiresIn: "1h" }, (err, token) => {
    if (err) throw err;
    res
      .status(200)
      .json({ token, status: "success", message: "user registered" });
  });
};

export const signinController = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  const currentUser = await User.findOne({ email });
  if (!currentUser)
    return res
      .status(400)
      .json({ status: "failed", message: "Invalid Credentials" });

  const verified = await bcrypt.compare(password, currentUser.password);

  if (!verified)
    return res
      .status(400)
      .json({ status: "failed", message: "Invalid Credentials" });
  
  const payload = {
    email,
    userName: currentUser.name
  }
  const token =  jwt.sign(payload, process.env.JWT_SECRET,  {expiresIn:"1h"} )
  res.status(200).json({
    status: "success",
    data: { email: currentUser.email, name: currentUser.name , token},
  });
};

// We will only send 200 response because this controller purpose was only to verify the token
// That was alread done in verifyToken middle ware ,
// so if token was invalid we have already sent response in middleware of 400
// so our request will reach this controller only when the token was valid
// That is reason we are just sending a success response
// so front end app could log-in the user automatically if he is having token in local storage and this is valid

export const authorizeController = (req, res) => res.status(200).json({status:"success", email: req.userEmail})
