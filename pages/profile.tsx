import { ProfileContext, ProfileProps } from "../components/context/ProfileContext";
import { useProfile, UseProfileProps } from "../components/hooks/useProfile";
import ProfileInfo from "../components/profile/ProfileInfo";
import ProfileEdit from "../components/profile/ProfileEdit";
import Opinions from "../components/profile/Opinions";
import { InferGetServerSidePropsType } from "next";
import { useContext } from "react";

const Profile: React.FC<ServerSideProps> = (props: ServerSideProps) => {
  const { editMode } = useContext<ProfileProps>(ProfileContext);

  useProfile(props);

  return !editMode ? (
    <>
      <ProfileInfo />
      <Opinions />
    </>
  ) : (
    <ProfileEdit />
  );
};

import { GetServerSideProps } from "next";
import getUserByToken from "../utils/getUserByToken";
export const getServerSideProps: GetServerSideProps<UseProfileProps> = async ({ req, res }) => {
  const { data, error } = await getUserByToken(req, res);

  if (data)
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
        opinions: data.opinions,
        // editable: true, // should I use this?
      },
    };

  return {
    notFound: true,
  };
};

type ServerSideProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default Profile;
