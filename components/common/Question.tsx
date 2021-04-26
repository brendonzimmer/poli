import axios from "axios";
import { useState } from "react";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/solid";
export interface QuestionType {
  _id: string;
  question: string;
  emoji: string;
}
export interface AnsweredQuestionType {
  ref: QuestionType["_id"];
  stance: "Yes" | "No" | "Skip";
}

const Question: React.FC<QuestionType> = ({ question, emoji, _id }) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (stance: AnsweredQuestionType["stance"]) => {
    const data = await axios.post("/api/user/opinions/post", {
      ref: _id,
      stance: stance,
    });
    console.log(data);

    if (data.status !== 201) console.log("Creation Failed");
  };

  return (
    <div className="text-gray-300 flex flex-col bg-gray-800 rounded-[0.75rem] p-2 my-4 select-none">
      <div className="flex items-center cursor-pointer " onClick={() => setOpen(prevState => !prevState)}>
        <span className="text-4xl p-1 mr-2">{emoji}</span>
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
        <button
          onClick={() => handleSubmit("No")}
          className="bg-red-400 py-2 w-full rounded-lg ring-inset ring ring-red-600 focus:outline-none active:bg-opacity-80"
        >
          No
        </button>
        <button className="bg-purple-400 py-2 w-full rounded-lg ring-inset ring ring-purple-600 focus:outline-none active:bg-opacity-80">
          Skip
        </button>
        <button
          onClick={() => handleSubmit("Yes")}
          className="bg-green-400 py-2 w-full rounded-lg ring-inset ring ring-green-600 focus:outline-none active:bg-opacity-80"
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default Question;
