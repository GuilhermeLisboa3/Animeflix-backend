import jwt from 'jsonwebtoken'
import * as dotenv from "dotenv";
dotenv.config();

const token = process.env.JWT_TOKEN || 'TJBASDBFDSIK'

export const jwtService = {
    singToken: (payload: string | object | Buffer, expiration:string)=>{
        if(typeof token === 'string'){
            return jwt.sign(payload, token , {
                expiresIn: expiration
            })
        }
    }
}