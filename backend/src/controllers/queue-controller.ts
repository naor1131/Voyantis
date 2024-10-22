import { Request, Response } from "express";

// Get all users
export const getAllMessages = async (req: Request, res: Response): Promise<void> => {
  // try {
  //   const users = await UserModel.find();
  //   res.json(users);
  // } catch (err) {
  //   res.status(500).json({ message: (err as Error).message });
  // }
};

// Create a new user
export const addMessage = async (req: Request, res: Response): Promise<void> => {
  // const user = new UserModel(req.body);
  // try {
  //   const newUser = await user.save();
  //   res.status(201).json(newUser);
  // } catch (err) {
  //   res.status(400).json({ message: (err as Error).message });
  // }
};
