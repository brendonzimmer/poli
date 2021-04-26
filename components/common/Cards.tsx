import Question, { QuestionType } from "./Question";

const Cards: React.FC<{ data: QuestionType[] }> = ({ data }) => {
  return (
    <div className="m-3">
      {data.map(d => (
        <Question key={d._id} _id={d._id} question={d.question} emoji={d.emoji} />
      ))}
    </div>
  );
};

export default Cards;
