import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

dotenv.config();

function getToken(email: string) {
  type JwtToken = string;

  const payload: { email: string } = { email };

  let jwtSecret: string | undefined;
  
  if (process.env.JWT_SECRET) {
    jwtSecret = process.env.JWT_SECRET;
  } else {
    console.error("JWT_SECRET is not defined in your environment variables.");
    return undefined;
  }

  if (payload && jwtSecret) {
    const token: JwtToken = jwt.sign(payload, jwtSecret);
    return token;
  } else {
    return undefined;
  }
}

function verifyToken(req: Request, res: Response, next: NextFunction){
    try {
        const authorizationHeader = req.get("Authorization");

        if(authorizationHeader == null) {
            throw new Error("Authorization header is missing");
        }

        const [type, token] = authorizationHeader.split(" ");

        if (type !== "Bearer") {
            throw new Error("Authorization header has not the 'Bearer' type");
        }

        req.payload = jwt.verify(token, process.env.JWT_SECRET);

        next();
    } catch(err) {
        console.error(err);
        res.sendStatus(401);
    }
}

module.exports = {
    getToken,
    verifyToken,
};
