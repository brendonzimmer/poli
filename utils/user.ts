import { UseProfileProps } from "../components/hooks/useProfile";
import { CardType } from "../components/common/Card";
import { OpinionsObject } from "./../server/models/user";
import { Question } from "../server/models/question";
import { GetServerSidePropsContext } from "next";
import { User } from "../server/models/user";
import connect from "../server/index";
import { setCookie } from "./cookie";
import jwt from "jsonwebtoken";
import _ from "lodash";

/**
 * Run authentication and then get token. (includes re-logging in users)
 *
 * @param req - must have refresh token in cookie or authentication header including bearer
 *
 * @returns an object that contains user data (including an authentication token)
 *
 */
export async function getUserByToken(
  req: GetServerSidePropsContext["req"],
  res: GetServerSidePropsContext["res"]
): Promise<{ data: UseProfileProps; error: string }> {
  // verify token
  const bearer = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;
  const token = bearer || req.cookies.jwt;

  let payload: any = null;
  try {
    payload = jwt.verify(token, process.env.PRIVATE_KEY);
  } catch (e) {
    return { data: null, error: "Invalid token." };
  }

  // user verified, continue
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

export async function getQuestionsByToken(
  req: GetServerSidePropsContext["req"]
): Promise<{ data: CardType[]; error: string }> {
  // verify token
  const bearer = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;
  const token = bearer || req.cookies.jwt;

  let payload: any = null;
  try {
    payload = jwt.verify(token, process.env.PRIVATE_KEY);
  } catch (e) {
    return { data: null, error: "Invalid token." };
  }

  // user verified, continue
  connect();
  const questions = await Question.find();

  // need to cast _id from hex to string
  const castedQuestions: CardType[] = questions.map(q => ({
    _id: q._id.toString(),
    question: q.question,
    emoji: q.emoji,
  }));

  return {
    data: castedQuestions,
    error: null,
  };
}

async function getUnansweredQuestions(req: GetServerSidePropsContext["req"], opinions: OpinionsObject[]) {
  const { data, error } = await getQuestionsByToken(req);
  if (error) return { data: null, error };

  if (!opinions.length) return { data, error: null };

  const filtered = data.filter(q => (opinions.find(o => o._id.toString() === q._id.toString()) ? false : true));

  return { data: filtered, error: null };
}

// do not allow export, does not verify token
async function opinionsToCard(opinions: OpinionsObject[]) {
  connect();

  if (!opinions.length) return { data: null, error: "Opinions array must have at least one object." };

  const data = await Promise.all(
    opinions.map(async o => {
      const q = await Question.findById(o._id);

      return {
        ref_id: o._id.toString(),
        question: q.question,
        emoji: q.emoji,
        stance: o.stance,
      };
    })
  );

  return {
    data: data,
    error: null,
  };
}

export async function getAllCards(
  req: GetServerSidePropsContext["req"],
  opinions: OpinionsObject[]
): Promise<{ data: CardType[]; error: string }> {
  const { data, error } = await getUnansweredQuestions(req, opinions);
  if (error) return { data: null, error };

  if (opinions.length) {
    const { data: castedOpinions, error: error2 } = await opinionsToCard(opinions);

    if (error2) return { data: null, error: error2 };

    return { data: [...castedOpinions, ...data], error: null };
  }

  return { data, error: null };
}
