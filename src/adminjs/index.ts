import bcrypt from "bcrypt";
import AdminJs from "adminjs";
import AdminJsExpress from "@adminjs/express";
import AdminJsSequelize from "@adminjs/sequelize";
import { sequelize } from "../database";
import { adminJsResource } from "./resources";
import { Anime, Category, Episode, User } from "../models";
import dotenv from "dotenv";
import { locale } from "./locale";
dotenv.config();

AdminJs.registerAdapter(AdminJsSequelize);

export const adminJs = new AdminJs({
  databases: [sequelize],
  rootPath: "/admin",
  resources: adminJsResource,
  branding: {
    companyName: "Animeflix",
    logo: "/animeflix-trasnparent.png",
    theme: {
      colors: {
        primary100: "#ff0043",
        primary80: "#ff1a57",
        primary60: "#ff3369",
        primary40: "#ff4d7c",
        primary20: "#ff668f",
        grey100: "#151515",
        grey80: "#333333",
        grey60: "#4d4d4d",
        grey40: "#666666",
        grey20: "#dddddd",
        filterBg: "#333333",
        accent: "#151515",
        hoverBg: "#151515",
      },
    },
  },
  locale: locale,
  dashboard: {
    component: AdminJs.bundle("./components/Dashboard"),
    handler: async (req, res, context) => {
      const anime = await Anime.count();
      const episodes = await Episode.count();
      const category = await Category.count();
      const standardUsers = await User.count({ where: { role: "user" } });

      res.json({
        'Animes': anime,
        'Episódios': episodes,
        'Categorias': category,
        'Usuários': standardUsers
      })
    },
  },
});

export const adminJsRouter = AdminJsExpress.buildAuthenticatedRouter(
  adminJs,
  {
    authenticate: async (email, password) => {
      const user = await User.findOne({ where: { email } });
      if (user && user.role === "admin") {
        const matched = await bcrypt.compare(password, user.password);

        if (matched) {
          return user;
        }
      } else {
        return false;
      }
    },
    cookiePassword: String(process.env.PASSWORD_ADMINJS),
  },
  null,
  {
    resave: false,
    saveUninitialized: false,
  }
);
