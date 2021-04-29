import { useState, useEffect, useContext } from "react";
import { ProfileContext, ProfileProps } from "../context/ProfileContext";
import { QuestionType } from "../common/Question";
import fetcher from "../../utils/fetcher";
import useSWR from "swr";
import Cards from "../common/Cards";

const ProfileOs: React.FC = () => {
  const [Os, setOs] = useState([]);
  const { token } = useContext<ProfileProps>(ProfileContext);
  const { data, error } = useSWR<QuestionType[]>(["/api/questions", token], fetcher);

  useEffect(() => {
    if (data) setOs(data);
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

  return <Cards data={Os} />;
};

export default ProfileOs;
