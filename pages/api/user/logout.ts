import { NextApiRequest, NextApiResponse } from "next";
import { removeCookie } from "../../../utils/cookie";

// Route Handler
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") return post(req, res);

  return res.status(400).send(`Cannot ${req.method} /api/user/auth/refresh`);
};

// POST ———————————————————————————————————————————————————————————————
const post = async (req: NextApiRequest, res: NextApiResponse) => {
  removeCookie(res);
  return res.send(req.cookies);
};
