import dotenv from "dotenv";
import jwt from "jsonwebtoken";

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

export default getToken;
