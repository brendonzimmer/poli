import Question, { QuestionType } from "./Question";

const Questions: React.FC<{ data: QuestionType[] }> = ({ data }) => {
  return (
    <div className="m-3">
      {data.map(q => (
        <Question key={q.id} id={q.id} question={q.question} emoji={q.emoji} />
      ))}
    </div>
  );
};

export default Questions;
