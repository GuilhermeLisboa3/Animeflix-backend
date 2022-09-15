import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { favoriteService } from "../services/favoriteService";

export const favoriteController = {
  //GET /favortes
  index: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;
    try {
      const favorite = await favoriteService.findByUserId(userId)

      return res.status(200).json(favorite);
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ message: err.message });
      }
    }
  },

  //POST /favorite
  save: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;
    const { animeId } = req.body;

    try {
      const favorite = await favoriteService.create(userId, Number(animeId));

      return res.status(200).json(favorite);
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ message: err.message });
      }
    }
  },
};
