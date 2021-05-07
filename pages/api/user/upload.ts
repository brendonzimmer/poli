import auth, { NextApiRequestWithUser } from "../../../server/middleware/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../server/models/user";
import { v2 as cloudinary } from "cloudinary";
import connect from "../../../server/index";
import _ from "lodash";

connect();

// Route Handler
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") return post(req, res);

  return res.status(400).send(`Cannot ${req.method} /api/user`);
};

// POST ———————————————————————————————————————————————————————————————
const post = async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  return auth(req, res, async () => {
    let user = await User.findById(req.user._id).select(["picture", "username"]);
    if (!user) return res.status(400).send("User does not exist.");

    const { secure_url } = await cloudinary.uploader.upload(req.body.data, {
      upload_preset: "server",
    });

    user.picture = secure_url;
    await user.save();

    return res.status(200).send(_.pick(user, ["username", "picture"]));
  });
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};
