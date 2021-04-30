import { ProfileContext, ProfileProps } from "../components/context/ProfileContext";
import { useProfile, UseProfileProps } from "../components/hooks/useProfile";
import ProfileInfo from "../components/profile/ProfileInfo";
import ProfileEdit from "../components/profile/ProfileEdit";
import { InferGetServerSidePropsType } from "next";
import Cards from "../components/common/Cards";
import { useContext } from "react";

const Profile: React.FC<ServerSideProps> = (props: ServerSideProps) => {
  const { editMode } = useContext<ProfileProps>(ProfileContext);

  useProfile(props);

  return !editMode ? (
    <>
      <ProfileInfo />
      <Cards data={props.cards} />
    </>
  ) : (
    <ProfileEdit />
  );
};

import { GetServerSideProps } from "next";
import { CardType } from "../components/common/Card";
import { getAllCards, getUserByToken } from "../utils/user";
export const getServerSideProps: GetServerSideProps<UseProfileProps> = async ({ req, res }) => {
  const { data } = await getUserByToken(req, res);
  const { data: cards } = await getAllCards(req, data.opinions);

  // console.log(cards);
  // console.log(JSON.parse(JSON.stringify(data.opinions)));

  if (data && cards)
    return {
      props: {
        token: data.token,
        name: data.name,
        username: data.username,
        picture: data.picture,
        email: data.email,
        biography: data.biography,
        location: data.location,
        followers: data.followers,
        following: data.following,
        opinions: JSON.parse(JSON.stringify(data.opinions)), // not necessary?
        cards: cards,
      },
    };

  return {
    notFound: true,
  };
};

type ServerSideProps = InferGetServerSidePropsType<typeof getServerSideProps> & { cards: CardType[] };

export default Profile;
