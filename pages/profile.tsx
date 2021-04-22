import { useContext } from "react";
import { ProfileContext, ProfileProps } from "../components/context/ProfileContext";
import ProfileInfo from "../components/ProfileInfo";
import ProfileQs from "../components/ProfileQs";
import ProfileEdit from "../components/ProfileEdit";

const Profile: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ profileQs }) => {
  const { editMode } = useContext<ProfileProps>(ProfileContext);

  return !editMode ? (
    <>
      <ProfileInfo />
      <ProfileQs data={profileQs} />
    </>
  ) : (
    <ProfileEdit />
  );
};

import { GetStaticProps, InferGetStaticPropsType } from "next";
import { getQuestions } from "../server/routes/questions";

export const getStaticProps: GetStaticProps = async context => {
  const data = await getQuestions();

  return {
    props: {
      profileQs: data,
    },
    revalidate: 43200,
  };
};

export default Profile;
