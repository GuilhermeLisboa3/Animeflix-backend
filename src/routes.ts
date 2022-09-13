import express from "express";
import { animesController } from "./controllers/animesController";
import { categoriesController } from "./controllers/categoriesController";

const router = express.Router();

router.get("/categories", categoriesController.index);
router.get("/categories/:id", categoriesController.show);

router.get("/animes/featured", animesController.featured);
router.get("/animes/newest", animesController.newest);
router.get("/animes/:id", animesController.show);

export default router;
