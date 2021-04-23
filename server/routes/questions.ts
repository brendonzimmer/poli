import { QuestionType } from "../../components/common/Question";
import client, { q } from "../../server/index";

interface QuestionsResponse {
  data: [{ id: string }, string, string][];
}

async function queryQuestions() {
  return <Promise<QuestionsResponse>>await client
    // Get data
    .query(q.Paginate(q.Match(q.Index("questions"))))
    // If error
    .catch((e: Error) => console.log(e));
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
} // optional dunction to shuffle the data

export const getQuestions = async () => {
  const { data } = await queryQuestions();

  return data.map(q => ({
    id: +q[0].id,
    question: q[1],
    emoji: q[2],
  })) as QuestionType[];
};
