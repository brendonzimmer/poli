import { NextApiRequest, NextApiResponse } from "next";
import auth, { NextApiRequestWithUser } from "../../../server/middleware/auth";
import { User, validate } from "../../../server/models/user";
import { setCookie } from "../../../utils/cookie";
import connect from "../../../server/index";
import bcrypt from "bcryptjs";
import _ from "lodash";
import Joi from "joi";

connect();

// Route Handler
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") return post(req, res);

  if (req.method === "PUT") return put(req, res);

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
  setCookie(res, user.refreshToken());
  return res
    .status(201)
    .send(
      _.pick(user, [
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

// PUT ————————————————————————————————————————————————————————————————
const put = async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  return auth(req, res, async () => {
    const { error } = editValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findById(req.user).select("-password");
    if (!user) return res.status(400).send("User does not exist.");

    if (req.body.name) user.name = req.body.name;
    // if (req.body.email) user.email = req.body.email;
    if (req.body.biography) user.biography = req.body.biography;
    if (req.body.location) user.location = req.body.location;
    // user.picture = req.body.picture;

    await user.save();

    return res.status(200).send(_.pick(user, ["name", "email", "biography", "location"]));
  });
};

// Functions ————————————————————————————————————————————————————————
function editValidate(body) {
  const schema = Joi.object({
    name: Joi.string().min(1).max(55).messages({
      "string.min": "Name cannot be empty.",
      "string.max": "Name is too long.",
    }),
    // email: Joi.string()
    //   .email({ tlds: { allow: false } })
    //   .max(255)
    //   .messages({
    //     "string.email": "Must be valid email.",
    //     "string.max": "Email is too long.",
    //   }),
    biography: Joi.string().min(1).max(255).messages({
      "string.min": "Name cannot be empty.",
      "string.max": "Biography is too long.",
    }),
    location: Joi.string().min(1).max(55).messages({
      "string.min": "Name cannot be empty.",
      "string.max": "Location is too long.",
    }),
  });

  return schema.validate(body);
}
