import { useContext, useState } from "react";
import { ProfileProps, ProfileContext } from "../context/ProfileContext";
import { LocationMarkerIcon, MailIcon } from "@heroicons/react/outline";

const ProfileEdit: React.FC = () => {
  const {
    toggleEditMode,
    name,
    username,
    picture,
    email,
    biography,
    location,
    setEmail,
    setLocation,
    setBiography,
  } = useContext<ProfileProps>(ProfileContext);

  const [tempEmail, setTempEmail] = useState(email);
  const [tempLocation, setTempLocation] = useState(location);
  const [tempBiography, setTempBiography] = useState(biography);

  const handleSave = () => {
    // Post updated info
    setEmail(tempEmail);
    setLocation(tempLocation);
    setBiography(tempBiography);

    toggleEditMode();
  };

  const handleCancel = () => {
    setTempEmail(email);
    setTempLocation(location);
    setTempBiography(biography);

    toggleEditMode();
  };

  return (
    <>
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

        {/* Biography */}
        <textarea
          id="biography"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTempBiography(e.target.value)}
          value={tempBiography || "Talk about yourself!"}
          className={`w-full h-24 text-sm border-gray-300 rounded-md resize-none ${
            tempBiography ? "" : "text-gray-400"
          }`}
        />

        {/* Location */}
        <div className="flex items-center">
          <LocationMarkerIcon className="h-6 w-6 text-gray-500" />
          <input
            type="text"
            id="location"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTempLocation(e.target.value)}
            value={tempLocation || "Add a location"}
            className={`w-full ml-1 border-gray-300 rounded-md ${tempLocation ? "" : "text-gray-400"}`}
          />
        </div>

        {/* Email */}
        <div className="flex items-center">
          <MailIcon className="h-6 w-6 text-gray-500" />
          <input
            type="text"
            id="email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTempLocation(e.target.value)}
            value={email}
            className="w-full ml-1 border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="ml-3 space-x-2">
        <button onClick={handleSave} className="py-1 px-2 bg-blue-400 rounded-md text-gray-100">
          Save
        </button>
        <button onClick={handleCancel} className="py-1 px-2 bg-gray-500 text-gray-200 rounded-md">
          Cancel
        </button>
      </div>
    </>
  );
};

export default ProfileEdit;
