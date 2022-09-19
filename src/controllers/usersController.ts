import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { userService } from "../services/userService";


export const usersController = {
    //GET /users/current/watching
    watching: async(req:AuthenticatedRequest, res:Response)=>{
        const { id } = req.user!

        try {
            const watching = await userService.getKeepWatchingList(id)
            return res.status(200).json(watching)
        } catch (err) {
            if(err instanceof Error){
                res.status(400).json({message: err.message})
            }
        }
    }
}