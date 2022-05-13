import { Request, Response } from "express";
import User, { Iuser } from "../models/user";
import jwt from "jsonwebtoken";

function createToken(user: Iuser) {
  return jwt.sign({ id: user.id, email: user.email }, "secreto", {
    expiresIn: 86400,
  });
}

export const signUp = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Please send your email and password" });
  }
  const user = await User.findOne({ email: email });
  console.log(user);
  if (user) {
    return res.status(400).json({ msg: "The user already exist" });
  }

  const newUser = new User({ email, password });
  await newUser.save();
  res.status(201).send(newUser);
};

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Please send your email and password" });
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).json({ msg: "The user does not exist" });
  }
  const isMatch = await user.comparePassword(password);
  if (isMatch) {
    return res.status(200).json({ token: createToken(user) });
  }
  res.status(200).json({
    msg: "The email oe password are incorrect",
  });
};
