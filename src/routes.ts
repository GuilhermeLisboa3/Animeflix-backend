import express from "express";
import { animesController } from "./controllers/animesController";
import { categoriesController } from "./controllers/categoriesController";
import { episodesController } from "./controllers/episodesController";

const router = express.Router();

router.get("/categories", categoriesController.index);
router.get("/categories/:id", categoriesController.show);

router.get("/animes/featured", animesController.featured);
router.get("/animes/newest", animesController.newest);
router.get("/animes/search", animesController.search);
router.get("/animes/:id", animesController.show);

router.get("/episodes/stream", episodesController.stream)

export default router;
