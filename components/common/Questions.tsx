import Question from "./Question";

const Questions: React.FC<{ data: Question[] }> = ({ data }) => {
  return (
    <div className="flex overflow-x-scroll space-x-3 px-2 h-full">
      {data.map(card => (
        <Question key={card.id} id={card.id} question={card.question} stance={card.stance} />
      ))}
    </div>
  );
};

export default Questions;
