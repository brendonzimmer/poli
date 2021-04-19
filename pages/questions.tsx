import axios, { AxiosResponse } from "axios";
import React, { Fragment, useEffect, useState } from "react";
import Question from "../components/common/Question";
import Questions from "../components/common/Questions";
import { Transition } from "@headlessui/react";

const QuestionsPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const handleData = async () => {
      const { data } = await axios.get<Question[], AxiosResponse<Question[]>>("/api/questions");
      setQuestions(data);
    };

    handleData();
  }, []);

  return (
    <Transition
      appear={true}
      show={true}
      enter="transition ease-out duration-500"
      enterFrom="transform opacity-0 scale-[0.99]"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-out duration-500"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Questions data={questions} />
    </Transition>
  );
};

export default QuestionsPage;
