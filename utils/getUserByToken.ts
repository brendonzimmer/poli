import { UseProfileProps } from "../components/hooks/useProfile";
import { GetServerSidePropsContext } from "next";
import { User } from "../server/models/user";
import connect from "../server/index";
import { setCookie } from "./cookie";
import jwt from "jsonwebtoken";
import _ from "lodash";

/**
 * Run authentication and then get token. (includes relogging in users)
 *
 * @param req - must have refresh token in cookie or authentication header including bearer
 *
 * @returns an object that contains user data (including an authentication token)
 *
 */
export default async function getToken(
  req: GetServerSidePropsContext["req"],
  res: GetServerSidePropsContext["res"]
): Promise<{ data: UseProfileProps; error: string }> {
  const bearer = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;
  const token = bearer || req.cookies.jwt;

  let payload: any = null;
  try {
    payload = jwt.verify(token, process.env.PRIVATE_KEY);
  } catch (e) {
    return { data: null, error: "Invalid token." };
  }

  connect();
  const user = await User.findById(payload._id);
  if (!user || user.tokenVersion !== payload.tokenVersion) return { data: null, error: "User does not exist." };

  setCookie(res, user.refreshToken());

  return {
    data: {
      token: bearer || user.generateToken(),
      ..._.pick(user, ["name", "username", "picture", "email", "followers", "following", "opinions"]),
      biography: user.biography || null,
      location: user.location || null,
    },
    error: null,
  };
}
