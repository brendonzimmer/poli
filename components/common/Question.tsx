export interface QuestionType {
  id: number;
  question: string;
}

const Question: React.FC<QuestionType> = ({ question }) => {
  return (
    <div className="content text-gray-800 flex flex-col min-w-[100%] bg-purple-300 rounded-[0.75rem] p-2 my-4">
      <h1 className="text-4xl leading-[3rem] font-medium">{question}</h1>
      <div className="flex h-full items-end justify-around mb-8">
        <button className="bg-red-500 px-3 py-2 rounded-xl ">No</button>
        <button className="bg-purple-500 px-3 py-2 rounded-xl ">Skip</button>
        <button className="bg-green-500 px-3 py-2 rounded-xl ">Yes</button>
      </div>
    </div>
  );
};

export default Question;
