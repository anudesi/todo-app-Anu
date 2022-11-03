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
  res.status(200).json({
    status: "success",
    data: { email: currentUser.email, name: currentUser.name },
  });
};
