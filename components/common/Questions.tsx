import Question, { QuestionType } from "./Question";

const Questions: React.FC<{ data: QuestionType[] }> = ({ data }) => {
  return (
    <div className="flex overflow-x-scroll space-x-3 px-2 h-full">
      {data.map(q => (
        <Question key={q.id} id={q.id} question={q.question} />
      ))}
    </div>
  );
};

export default Questions;
