import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";


dotenv.config();

if(process.env.JWT_SECRET){
  var jwtSecret: string = process.env.JWT_SECRET;
} else {
  console.error("JWT_SECRET is not defined in your environment variables.");
}

export function getToken(email: string) {
  const payload: { email: string } = { email };

  if (payload && jwtSecret) {
    const token: string = jwt.sign(payload, jwtSecret);
    return token;
  } else {
    return undefined;
  }
}

export function verifyToken(req: Request, res: Response, next: NextFunction){
    try {
        const authorizationHeader = req.get("Authorization");

        if(authorizationHeader == null) {
            throw new Error("Authorization header is missing");
        }

        const [type, token] = authorizationHeader.split(" ");

        if (type !== "Bearer") {
            throw new Error("Authorization header has not the 'Bearer' type");
        }

        if (!jwt.verify(token, jwtSecret)){
          throw new Error("Token is not available");
        }

        req.token = token;

        next();
    } catch(err) {
        console.error(err);
        res.sendStatus(401);
    }
}

