import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../../server/models/user";
import { setCookie } from "../../../../util/cookie";
import connect from "../../../../server/index";
import bcrypt from "bcryptjs";
import _ from "lodash";
import Joi from "joi";

connect();

// Route Handler
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") return post(req, res);

  return res.status(400).send(`Cannot ${req.method} /api/user/auth`);
};

// POST ———————————————————————————————————————————————————————————————
const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  setCookie(res, user.refreshToken());
  return res.send(user.generateToken());
};

// Validation
const validate = body => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(55).required(),
    password: Joi.string().min(6).max(255).required(), //  npm i joi-password-complexity
  });

  return schema.validate(body);
};
