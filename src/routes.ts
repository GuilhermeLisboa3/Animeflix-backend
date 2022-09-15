import { authController } from "./controllers/authController";
import express from "express";
import { animesController } from "./controllers/animesController";
import { categoriesController } from "./controllers/categoriesController";
import { episodesController } from "./controllers/episodesController";
import { ensureAuth, ensureAuthViaQuery } from "./middlewares/auth";
import { favoriteController } from "./controllers/favoriteController";

const router = express.Router();

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

router.get("/categories", ensureAuth, categoriesController.index);
router.get("/categories/:id", ensureAuth, categoriesController.show);

router.get("/animes/featured", ensureAuth, animesController.featured);
router.get("/animes/newest", animesController.newest);
router.get("/animes/search", ensureAuth, animesController.search);
router.get("/animes/:id", ensureAuth, animesController.show);

router.get("/episodes/stream",ensureAuthViaQuery, episodesController.stream);

router.get("/favorites",ensureAuth, favoriteController.index)
router.post("/favorites",ensureAuth, favoriteController.save)

export default router;
