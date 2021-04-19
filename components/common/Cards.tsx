import Card from "./Card";

const Cards: React.FC<{ data: Card[] }> = ({ data }) => {
  return (
    <div className="flex overflow-x-scroll space-x-3 px-2 mb-3">
      {data.map(card => (
        <Card key={card.id} id={card.id} question={card.question} stance={card.stance} />
      ))}
    </div>
  );
};

export default Cards;
