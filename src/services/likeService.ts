import { Like } from "../models"

export const likeService = {
    create: async (userId:number, animeId:number)=>{
        const like = await Like.create({
            userId,
            animeId
        })

        return like
    },
    delete: async (userId:number, animeId:number)=>{
        await Like.destroy({
            where:{
                userId,
                animeId
            }
        })
    },
}