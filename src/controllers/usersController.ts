import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { userService } from "../services/userService";

export const usersController = {
  //GET /users/current
  show: async (req: AuthenticatedRequest, res: Response) => {
    const currentUser = req.user!;
    try {
      return res.json(currentUser);
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ message: err.message });
      }
    }
  },

  //Put /users/current
  update: async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.user!;
    const { firstName, lastName, phone, birth, email } = req.body;
    try {
      const updatedUser = await userService.update(id, {
        firstName,
        lastName,
        phone,
        birth,
        email,
      });
      return res.status(200).json(updatedUser)
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ message: err.message });
      }
    }
  },

  //GET /users/current/watching
  watching: async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.user!;

    try {
      const watching = await userService.getKeepWatchingList(id);
      return res.status(200).json(watching);
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ message: err.message });
      }
    }
  },
};
