import auth, { NextApiRequestWithUser } from "./../../../server/middleware/auth";
import { Question } from "../../../server/models/question";
import connect from "../../../server/index";
import { NextApiResponse } from "next";

connect();

// Route Handler
export default async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  if (req.method === "GET") return get(req, res);

  return res.status(400).send(`Cannot ${req.method} /api/user`);
};

// GET ———————————————————————————————————————————————————————————————————————
const get = async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  return auth(req, res, async () => {
    const questions = await Question.find();
    return res.send(questions);
  });
};

// Shuffle Questions —————————————————————————————————————————————————————————
function shuffle(array: Array<any>) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}
