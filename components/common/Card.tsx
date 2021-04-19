interface Card {
  id: number;
  question: string;
  stance: "Yes" | "No" | "Not sure";
  elaboration?: string;
}

const Card: React.FC<Card> = ({ question, stance, elaboration }) => {
  return (
    <>
      {/* Card */}
      <div className="bg-blue-100 rounded-lg p-2 min-w-[100%] h-[40vh] divide-y divide-blue-200">
        <h1 className="text-xl font-medium mb-1">{question}</h1>
        {stance ? <h2>{stance}</h2> : ""}

        {elaboration ? <p className="pt-2">{elaboration}</p> : ""}
      </div>
    </>
  );
};

export default Card;
