import { useContext } from "react";
import { ProfileContext, ProfileProps } from "../components/context/ProfileContext";
import ProfileInfo from "../components/profile/ProfileInfo";
import Opinions from "../components/profile/Opinions";
import ProfileEdit from "../components/profile/ProfileEdit";

const Profile: React.FC = () => {
  const { editMode } = useContext<ProfileProps>(ProfileContext);

  return !editMode ? (
    <>
      <ProfileInfo />
      <Opinions />
    </>
  ) : (
    <ProfileEdit />
  );
};

export default Profile;
