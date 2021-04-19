import Link from "next/link";
import { Fragment, useContext } from "react";
import { Transition } from "@headlessui/react";
import { LocationMarkerIcon, UsersIcon } from "@heroicons/react/outline";
import { ProfileContext, ProfileProps } from "./context/ProfileContext";

const ProfileInfo: React.FC = () => {
  const { toggleEditMode, locationText, bioText, profilePic, name, username, followers, following } = useContext<ProfileProps>(ProfileContext);

  return (
    <div className="m-3 space-y-3">
      {/* Profile Header */}
      <div className="flex">
        {/* Picture */}
        <img src={profilePic} alt="Profile Picture" className="h-20 w-20 object-cover rounded-full" />
        {/* Name and User */}
        <div className="flex flex-col justify-center ml-2 p-0">
          <h1 className="text-2xl -mb-2">{name}</h1>
          <h2 className="text-xl text-gray-500 font-light">{username}</h2>
        </div>
      </div>

      {/* Bio */}
      <Transition
        appear={true}
        show={true}
        enter="transition ease-out duration-200"
        enterFrom="transform origin-bottom-left translate-x-2 translate-y-2 border-opacity-100"
        enterTo="transform border-opacity-0"
      >
        <div className="text-sm px-0.5">{bioText}</div>
      </Transition>

      <Transition
        appear={true}
        show={true}
        enter="transition ease-out duration-1000"
        enterFrom="transform opacity-0"
        enterTo="transform opacity-100"
        className="space-y-3"
      >
        <div className="space-y-2">
          {/* Edit Profile */}
          <button onClick={toggleEditMode} className="w-full px-2 py-1 bg-gray-300 rounded-lg">
            Edit Profile
          </button>
          {/* Update Opinions */}
          <Link href="/questions">
            <button className="w-full px-2 py-1 bg-gray-300 rounded-lg">Share Opinions</button>
          </Link>
        </div>

        {/* Folowers */}
        <div className="flex">
          <UsersIcon className="h-6 w-6 text-gray-500" />
          <p className="ml-1">
            {followers}
            <span className="text-gray-500">{" follower · "}</span>
            {following}
            <span className="text-gray-500">{" following"}</span>
          </p>
        </div>
      </Transition>

      {/* Location */}
      <Transition appear={true} show={true} enter="transition ease-out duration-1000" enterFrom="transform opacity-0" enterTo="transform opacity-100">
        <div className="flex space-x-1">
          <LocationMarkerIcon className="h-6 w-6 text-gray-500" />
          <span>{locationText}</span>
        </div>
      </Transition>
    </div>
  );
};

export default ProfileInfo;
