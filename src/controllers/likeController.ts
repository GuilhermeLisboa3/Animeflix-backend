import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { likeService } from "../services/likeService";

export const likeController = {
  save: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;
    const { animeId } = req.body;
    try {
      const like = await likeService.create(userId, animeId);
      return res.status(201).json(like)
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ message: err.message });
      }
    }
  },
};
