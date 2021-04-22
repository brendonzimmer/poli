import { NextApiRequest, NextApiResponse } from "next";
import { getQuestions } from "../../server/routes/questions";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await getQuestions().catch((e: Event) =>
    res.status(500).send("Questions failed to load from the server.")
  );

  res.status(200).send(data);
};
