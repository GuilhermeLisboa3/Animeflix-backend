import { Request, Response } from "express";
import { animesServices } from "../services/animesServices";

export const animesController = {
  //GET /animes/featured
  featured: async (req: Request, res: Response) => {
    try {
      const featuredAnimes = await animesServices.getRandomFeaturedAnimes();
      return res.json(featuredAnimes);
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ message: err.message });
      }
    }
  },

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
