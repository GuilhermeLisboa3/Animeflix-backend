import { Request, Response } from "express";
import { getPaginationParams } from "../helpers/getPaginationParams";
import { AuthenticatedRequest } from "../middlewares/auth";
import { animesServices } from "../services/animesServices";
import { favoriteService } from "../services/favoriteService";
import { likeService } from "../services/likeService";

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
  show: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;
    const animeId = req.params.id;
    try {
      const anime = await animesServices.findByWithEpisodes(animeId);
      if (!anime) {
        return res.status(404).json({ message: "Curso não encontrado." });
      }
      const liked = await likeService.isLiked(userId, Number(animeId));
      const favorited = await favoriteService.isFavorited(
        userId,
        Number(animeId)
      );
      return res.json({ ...anime.get(), liked, favorited });
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ message: err.message });
      }
    }
  },
};
