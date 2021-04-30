import auth, { NextApiRequestWithUser } from "../../../server/middleware/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../server/models/user";
import connect from "../../../server/index";
import _ from "lodash";

connect();

// Route Handler
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") return post(req, res);

  if (req.method === "PUT") return put(req, res);

  if (req.method === "DELETE") return _delete(req, res);

  //   if (req.method === "GET") return get(req, res);

  return res.status(400).send(`Cannot ${req.method} /api/user/opinions`);
};

// GET ——————————————————————————————————————————————————————————————————————— unused at the moment
// const get = async (req: NextApiRequestWithUser, res: NextApiResponse) => {
//   return auth(req, res, async () => {
//     const opinions = await User.findById(req.user._id).select("opinions");

//     return res.send(opinions);
//   });
// };

// POST ———————————————————————————————————————————————————————————————
const post = async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  return auth(req, res, async () => {
    const user = await User.findById(req.user._id).select("opinions");

    const opinionExists = user.opinions.find(opinion => opinion._id === req.body._id);
    if (opinionExists) return res.status(404).send("Opinion already exists.");

    user.opinions.push(req.body);
    await user.save();

    return res.status(201).send(user.opinions);
  });
};

// PUT ————————————————————————————————————————————————————————————————
const put = async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  return auth(req, res, async () => {
    const user = await User.findById(req.user._id).select("opinions");

    const editedOpinion = user.opinions.findIndex(o => o._id.toString() === req.body._id);
    if (editedOpinion === -1) return res.status(404).send("Opinion does not exist.");

    user.opinions[editedOpinion] = req.body;
    await user.save();

    return res.status(200).send(user.opinions);
  });
};

const _delete = async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  return auth(req, res, async () => {
    const user = await User.findById(req.user._id).select("opinions");

    const editedOpinion = user.opinions.findIndex(o => o._id.toString() === req.body._id);
    if (editedOpinion === -1) return res.status(404).send("Opinion does not exist.");

    const deleted = user.opinions.splice(editedOpinion, 1);
    await user.save();

    return res.status(200).send(deleted);
  });
};
