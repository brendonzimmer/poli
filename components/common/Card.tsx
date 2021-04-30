import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { ProfileContext, ProfileProps } from "../context/ProfileContext";
import { useContext, useState } from "react";
import axios from "axios";

export interface CardType {
  _id?: string;
  ref_id?: string;
  question: string;
  emoji: string;
  stance?: "Yes" | "No" | "Skip";
}

const Card: React.FC<CardType> = ({ question, emoji, _id, stance, ref_id }) => {
  const [open, setOpen] = useState(false);
  const { token } = useContext<ProfileProps>(ProfileContext);
  const [addedRef, setAddedRef] = useState<boolean>(ref_id ? true : false);
  const [currentStance, setCurrentStance] = useState<CardType["stance"]>(stance);

  const handleSubmit = async (stance: CardType["stance"]) => {
    if (stance === currentStance) return;
    setCurrentStance(stance);

    if (addedRef) {
      if (stance === "Skip") {
        setAddedRef(false);
        return axios.delete("/api/user/opinions", {
          headers: { authorization: "bearer " + token },
          data: {
            _id: ref_id || _id,
          },
        });
      }

      return axios.put(
        "/api/user/opinions",
        {
          _id: ref_id || _id,
          stance: stance,
        },
        { headers: { authorization: "bearer " + token } }
      );
    }

    if (stance === "Skip") return;

    setAddedRef(true);
    return axios.post(
      "/api/user/opinions",
      {
        _id: _id || ref_id,
        stance: stance,
      },
      { headers: { authorization: "bearer " + token } }
    );
  };

  return (
    <div
      className={`${
        currentStance === "Yes" ? "bg-[#142e27]" : currentStance === "No" ? "bg-[#331818]" : "bg-gray-800"
      } text-gray-300 flex flex-col rounded-[0.75rem] p-2 my-4 select-none`}
    >
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
          `${
            currentStance === "Yes" ? "bg-green-900" : currentStance === "No" ? "bg-red-900" : "bg-[#2D3849]"
          } text-gray-800 mt-2 py-2 -mr-2 -ml-2 -mb-2 flex justify-around rounded-b-[0.75rem] px-3 space-x-3`
        }
      >
        <button
          onClick={() => handleSubmit("No")}
          className="bg-red-400 py-2 w-full rounded-lg ring-inset ring ring-red-600 focus:outline-none active:bg-opacity-80"
        >
          No
        </button>
        <button
          onClick={() => handleSubmit("Skip")}
          className="bg-purple-400 py-2 w-full rounded-lg ring-inset ring ring-purple-600 focus:outline-none active:bg-opacity-80"
        >
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

export default Card;
