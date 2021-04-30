import Card, { CardType } from "./Card";

const Cards: React.FC<{ data: CardType[] }> = ({ data }) => {
  return (
    <div className="m-3">
      {data.map(d => (
        <Card
          key={d._id || d.ref_id}
          _id={d._id}
          ref_id={d.ref_id}
          question={d.question}
          emoji={d.emoji}
          stance={d.stance}
        />
      ))}
    </div>
  );
};

export default Cards;
