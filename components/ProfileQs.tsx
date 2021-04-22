import { QuestionType } from "./common/Question";
import Questions from "./common/Questions";
import { useState, useEffect } from "react";
import useSWR from "swr";

const ProfileQs: React.FC<{ data: QuestionType[] }> = ({ data }) => {
  const [Qs, setQs] = useState(data);
  const { data: updatedData, error } = useSWR("/api/questions");

  useEffect(() => {
    if (updatedData) setQs(updatedData);
  }, [updatedData]);

  if (error) return <h1>Error 500: Please send an email to brendonzimmerbusiness@gmail.com</h1>;

  return <Questions data={Qs} />;
};

export default ProfileQs;
