import Adminjs, { PageHandler } from 'adminjs'
import { Anime, Category, Episode, User } from '../models'

export const dashboardOptions:{
    handler?:PageHandler,
    component?:string
} = { 
        component: Adminjs.bundle("./components/Dashboard"),
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
}