import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";


dotenv.config();

if(process.env.JWT_SECRET){
  var jwtSecret: string = process.env.JWT_SECRET;
} else {
  console.error("JWT_SECRET is not defined in your environment variables.");
}

/**
 * The function getToken generates a JSON Web Token (JWT) using the provided email and a secret key.
 * @param {string} email - The `email` parameter is a string that represents the email address of the
 * user for whom the token is being generated.
 * @returns a token, which is a string.
 */
export function getToken(email: string) {
  const payload: { email: string } = { email };

  if (payload && jwtSecret) {
    const token: string = jwt.sign(payload, jwtSecret);
    return token;
  } else {
    return undefined;
  }
}

/**
 * The function `verifyToken` is used to verify the authorization token in the request header and
 * throws an error if it is missing, has an incorrect type, or is not valid.
 * @param {Request} req - The `req` parameter represents the HTTP request object, which contains
 * information about the incoming request such as headers, query parameters, and request body.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to manipulate the response,
 * such as setting the status code, sending data, or setting headers.
 * @param {NextFunction} next - The `next` parameter is a function that is called to pass control to
 * the next middleware function in the request-response cycle. It is typically used to move to the next
 * middleware function or to the route handler.
 */
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

