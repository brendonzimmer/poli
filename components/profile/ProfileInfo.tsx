import { useContext } from "react";
import { LocationMarkerIcon, UsersIcon } from "@heroicons/react/outline";
import { ProfileContext, ProfileProps } from "../context/ProfileContext";

const ProfileInfo: React.FC = () => {
  const {
    toggleEditMode,
    name,
    username,
    picture,
    biography,
    location,
    followers,
    following,
  } = useContext<ProfileProps>(ProfileContext);

  return (
    <div className="m-3 space-y-3">
      {/* Profile Header */}
      <div className="flex">
        {/* Picture */}
        <img src={picture} alt="Profile Picture" className="h-20 w-20 object-cover rounded-full" />
        {/* Name and User */}
        <div className="flex flex-col justify-center ml-2 p-0">
          <h1 className="text-2xl -mb-2">{name}</h1>
          <h2 className="text-xl text-gray-500 font-light">{username}</h2>
        </div>
      </div>

      {/* Bio */}
      {biography ? <div className="text-sm px-0.5">{biography}</div> : <></>}

      {/* Edit Profile */}
      <button onClick={toggleEditMode} className="w-full px-2 py-1 bg-gray-300 rounded-lg">
        Edit Profile
      </button>

      {/* Folowers */}
      <div className="flex">
        <UsersIcon className="h-6 w-6 text-gray-500" />
        <p className="ml-1">
          {followers}
          <span className="text-gray-500">{followers !== 1 ? " followers · " : " follower · "}</span>
          {following}
          <span className="text-gray-500">{" following"}</span>
        </p>
      </div>

      {/* Location */}
      {location ? (
        <div className="flex space-x-1">
          <LocationMarkerIcon className="h-6 w-6 text-gray-500" />
          <span>{location}</span>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProfileInfo;
