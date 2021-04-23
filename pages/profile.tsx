import { useContext } from "react";
import { ProfileContext, ProfileProps } from "../components/context/ProfileContext";
import ProfileInfo from "../components/ProfileInfo";
import ProfileQs from "../components/ProfileQs";
import ProfileEdit from "../components/ProfileEdit";

const Profile: React.FC = () => {
  const { editMode } = useContext<ProfileProps>(ProfileContext);

  return !editMode ? (
    <>
      <ProfileInfo />
      <ProfileQs />
    </>
  ) : (
    <ProfileEdit />
  );
};

export default Profile;
