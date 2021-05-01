import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../server/models/user";
import connect from "../../../server/index";

connect();

// Route Handler
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") return get(req, res);

  return res.status(400).send(`Cannot ${req.method} /api/${req.query.username}`);
};

// GET ———————————————————————————————————————————————————————————————————————
const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const valid = await exists(req.query.username as string);
  return res.status(200).send(valid);
};

// FUNCTIONS —————————————————————————————————————————————————————————————————
async function exists(username: string) {
  const user = await User.findOne({ username }).select(["username", "-_id"]);

  return { exists: !!user };
}
