import { NextApiRequest, NextApiResponse } from "next";
import auth, { NextApiRequestWithUser } from "../../../server/middleware/auth";
import { User, validate } from "../../../server/models/user";
import { setCookie } from "../../../util/cookie";
import connect from "../../../server/index";
import bcrypt from "bcryptjs";
import _ from "lodash";

connect();

// Route Handler
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") return post(req, res);

  if (req.method === "GET") return get(req, res);

  return res.status(400).send(`Cannot ${req.method} /api/user`);
};

// GET ———————————————————————————————————————————————————————————————————————
const get = async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  return auth(req, res, async () => {
    const user = await User.findById(req.user._id).select("-password");

    return res.send(user);
  });
};

// POST ———————————————————————————————————————————————————————————————
const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["name", "username", "picture", "email", "biography", "location", "password"]));
  user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(10));

  await user.save();

  res.setHeader("authorization", user.generateToken());
  setCookie(res, user.refreshToken()); // do i need this??
  return res.send(
    _.pick(user, [
      "_id",
      "name",
      "username",
      "picture",
      "email",
      "biography",
      "location",
      "followers",
      "following",
      "opinions",
    ])
  );
};
