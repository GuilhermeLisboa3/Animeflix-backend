import { Request, Response } from "express";
import { getPaginationParams } from "../helpers/getPaginationParams";
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

  //GET / animes/newest
  newest: async (req: Request, res: Response) => {
    try {
      const newestAnimes = await animesServices.getTopTenNewest();
      return res.json(newestAnimes);
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ message: err.message });
      }
    }
  },

  //GET /animes/search?name=
  search: async (req: Request, res: Response) => {
    const { name } = req.query;
    const [page, perPage] = getPaginationParams(req.params);
    try {
      if (typeof name !== "string") {
        throw new Error("name param must be of type string");
      }
      const animes = await animesServices.findByName(name, page, perPage);
      return res.json(animes);
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
