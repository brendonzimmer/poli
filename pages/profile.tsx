import { useContext } from "react";
import { Transition } from "@headlessui/react";
import { ProfileContext, ProfileProps } from "../components/context/ProfileContext";
import ProfileInfo from "../components/ProfileInfo";
import ProfileCards from "../components/ProfileCards";
import ProfileEdit from "../components/ProfileEdit";

const ProfileIndex: React.FC = () => {
  const { editMode } = useContext<ProfileProps>(ProfileContext);

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
      {!editMode ? (
        <>
          <ProfileInfo />
          <ProfileCards />
        </>
      ) : (
        <ProfileEdit />
      )}
    </Transition>
  );
};

export default ProfileIndex;
