import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const secret = process.env.JWT_TOKEN || "TJBASDBFDSIK";

export const jwtService = {
  singToken: (payload: string | object | Buffer, expiration: string) => {
    if (typeof secret === "string") {
      return jwt.sign(payload, secret, {
        expiresIn: expiration,
      });
    }
  },

  verifyToken: (token: string, callbackfn: jwt.VerifyCallback) => {
    jwt.verify(token, secret, callbackfn);
  },
};
