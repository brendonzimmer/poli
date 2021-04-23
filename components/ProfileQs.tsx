import Questions from "./common/Questions";
import { useState, useEffect } from "react";
import useSWR from "swr";

const ProfileQs: React.FC = () => {
  const [Qs, setQs] = useState([]);
  const { data, error } = useSWR("/api/questions");

  useEffect(() => {
    if (data) setQs(data);
  }, [data]);

  if (error)
    return (
      <h1 className="text-xl m-3">
        <span className="font-medium">Error 500: </span>
        <p>Could not load your questions.</p>
        <p>
          Please send an email to{" "}
          <a className="underline" href="mailto:brendonzimmerbusiness@gmail.com">
            brendonzimmerbusiness@gmail.com
          </a>
        </p>
      </h1>
    );

  return <Questions data={Qs} />;
};

export default ProfileQs;
