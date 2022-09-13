import { Request, Response } from "express";
import { animesServices } from "../services/animesServices";

export const animesController = {
  //GET /animes/:id
  show: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const anime = await animesServices.findByWithEpisodes(id);

      return res.json(anime);
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ message: err.message });
      }
    }
  },
};
