import { LocationMarkerIcon, UsersIcon } from "@heroicons/react/outline";
import { ProfileContext, ProfileProps } from "../context/ProfileContext";
import Button from "../common/Button";
import { useContext } from "react";

const ProfileInfo: React.FC = () => {
  const { toggleEditMode, name, username, picture, biography, location, followers, following } =
    useContext<ProfileProps>(ProfileContext);

  return (
    <div className="m-3 space-y-3 text-primary">
      {/* Profile Header */}
      <div className="grid grid-cols-3 gap-2">
        {/* Picture */}
        <img src={picture} alt="Profile Picture" className="w-full object-cover rounded-full" />
        {/* Name and User */}
        <div className="col-span-2 flex flex-col justify-center">
          <h1 className="text-2xl -mb-2">{name}</h1>
          <h2 className="text-xl text-secondary-slightly-dark font-light">{username}</h2>
        </div>
      </div>

      {/* Bio */}
      {biography ? <div className="text-sm px-0.5">{biography}</div> : <></>}

      {/* Edit Profile */}
      <Button onClick={toggleEditMode}>Edit Profile</Button>

      {/* Folowers */}
      <div className="flex">
        <UsersIcon className="h-6 w-6 text-secondary-slightly-dark" />
        <p className="ml-1">
          {followers}
          <span className="text-secondary-slightly-dark">{followers !== 1 ? " followers · " : " follower · "}</span>
          {following}
          <span className="text-secondary-slightly-dark">{" following"}</span>
        </p>
      </div>

      {/* Location */}
      {location ? (
        <div className="flex space-x-1">
          <LocationMarkerIcon className="h-6 w-6 text-secondary-slightly-dark" />
          <span>{location}</span>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProfileInfo;
