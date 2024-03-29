import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

// Types
export type NextApiRequestWithUser = NextApiRequest & { user?: JWT };

type JWT = { _id: string };

// Authenticate  —————————————————————————————————————————————————
export default async (req: NextApiRequestWithUser, res: NextApiResponse, next: Function) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send("Access denied. No token provided.");

  const decoded = jwt.verify(token.split(" ")[1], process.env.PRIVATE_KEY) as JWT;
  if (!decoded) return res.status(400).send("Invalid token.");

  try {
    req.user = decoded;
    return next(req, res);
  } catch (e) {
    // WINSTON LOG?
    return res.status(500).send("Something's wrong here...");
  }
};
