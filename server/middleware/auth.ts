import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

// Types
export type NextApiRequestWithUser = NextApiRequest & { user?: JWT };

type JWT = { _id: string };

// Authenticate  —————————————————————————————————————————————————
export default async (req: NextApiRequestWithUser, res: NextApiResponse, next: Function) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.PRIVATE_KEY) as JWT;
    req.user = decoded;
    return next(req, res);
  } catch {
    return res.status(400).send("Invalid token.");
  }
};
