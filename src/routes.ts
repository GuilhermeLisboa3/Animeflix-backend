import { authController } from "./controllers/authController";
import express from "express";
import { animesController } from "./controllers/animesController";
import { categoriesController } from "./controllers/categoriesController";
import { episodesController } from "./controllers/episodesController";
import { ensureAuth, ensureAuthViaQuery } from "./middlewares/auth";
import { favoriteController } from "./controllers/favoriteController";
import { likeController } from "./controllers/likeController";
import { usersController } from "./controllers/usersController";

const router = express.Router();

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

router.get("/categories", ensureAuth, categoriesController.index);
router.get("/categories/:id", ensureAuth, categoriesController.show);

router.get("/animes/featured", ensureAuth, animesController.featured);
router.get("/animes/newest", animesController.newest);
router.get("/animes/popular", ensureAuth, animesController.popular);
router.get("/animes/search", ensureAuth, animesController.search);
router.get("/animes/:id", ensureAuth, animesController.show);

router.get("/episodes/stream", ensureAuthViaQuery, episodesController.stream);

router.get("/episodes/:id/WatchTime",ensureAuth, episodesController.getWatchTime)
router.post("/episodes/:id/WatchTime",ensureAuth, episodesController.setWatchTime)

router.get("/favorites", ensureAuth, favoriteController.index);
router.post("/favorites", ensureAuth, favoriteController.save);
router.delete("/favorites/:id", ensureAuth, favoriteController.delete);

router.post("/likes", ensureAuth, likeController.save);
router.delete("/likes/:id", ensureAuth, likeController.delete);

router.get("/users/current", ensureAuth, usersController.show)
router.put("/users/current", ensureAuth, usersController.update)
router.put("/users/current/password", ensureAuth, usersController.updatePassword)
router.get("/users/current/watching", ensureAuth, usersController.watching)

export default router;
