import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../../server/models/user";
import { setCookie } from "../../../../utils/cookie";
import connect from "../../../../server/index";
import jwt from "jsonwebtoken";

connect();

// Route Handler
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") return post(req, res);

  return res.status(400).send(`Cannot ${req.method} /api/user/auth/refresh`);
};

// POST ———————————————————————————————————————————————————————————————
const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).send("Access denied. No token provided.");

  let payload: any = null;
  try {
    payload = jwt.verify(token, process.env.PRIVATE_KEY);
  } catch (e) {
    return res.status(400).send("Invalid token.");
  }

  const user = await User.findById(payload._id);
  if (!user) return res.status(400).send("Invalid token.");
  if (user.tokenVersion !== payload.tokenVersion) return res.status(400).send("Invalid token.");

  setCookie(res, user.refreshToken());
  return res.send(user.generateToken());
};
