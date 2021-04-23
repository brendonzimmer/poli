import { useState } from "react";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/solid";
export interface QuestionType {
  id: number;
  question: string;
  emoji: string;
}

const Question: React.FC<QuestionType> = ({ question, emoji }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative text-gray-300 flex flex-col bg-gray-800 rounded-[0.75rem] p-2 my-4">
      <div className="relative flex items-center" onClick={() => setOpen(prevState => !prevState)}>
        <span className="sticky left-0 top-0 text-4xl p-1 mr-2">{emoji}</span>
        <h1 className={(open ? "" : "line-clamp-2 ") + "text-xl"}>{question}</h1>
        <div>
          {open ? <ChevronDownIcon className="h-5 w-5 mr-0.5" /> : <ChevronRightIcon className="h-5 w-5 mr-0.5" />}
        </div>
      </div>
      <div
        className={
          (open ? "" : "hidden ") +
          "bg-[#2D3849] text-gray-800 mt-2 py-2 -mr-2 -ml-2 -mb-2 flex justify-around rounded-b-[0.75rem] px-3 space-x-3"
        }
      >
        <button className="bg-red-400 py-2 w-full rounded-lg ring-inset ring ring-red-600 focus:outline-none active:bg-opacity-80">
          No
        </button>
        <button className="bg-purple-400 py-2 w-full rounded-lg ring-inset ring ring-purple-600 focus:outline-none active:bg-opacity-80">
          Skip
        </button>
        <button className="bg-green-400 py-2 w-full rounded-lg ring-inset ring ring-green-600 focus:outline-none active:bg-opacity-80">
          Yes
        </button>
      </div>
    </div>
  );
};

export default Question;
