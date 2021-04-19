import axios, { AxiosResponse } from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "./context/ProfileContext";
import Cards from "./common/Cards";
import Card from "./common/Card";

const ProfileCards: React.FC = () => {
  const { username } = useContext(ProfileContext);
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    const handleData = async () => {
      const { data } = await axios.get<Card[], AxiosResponse<Card[]>>("/api/questions");
      setCards(data.filter(item => item.stance !== "Not sure"));
    };

    handleData();
  }, []);

  return (
    <>
      <Cards data={cards} />
    </>
  );
};

export default ProfileCards;
