import { useContext, useState } from "react";
import { Transition } from "@headlessui/react";
import { ProfileProps, ProfileContext } from "./context/ProfileContext";
import { LocationMarkerIcon } from "@heroicons/react/outline";

const data = {
  image:
    "https://images.unsplash.com/photo-1612459284970-e8f027596582?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDR8dG93SlpGc2twR2d8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  name: "Rando Name",
  username: "namezimmer",
  bio: "Hello! I'm name and I'm open to all sorts of points of view! Looking to talk!",
  followers: 1,
  following: 0,
  location: "los angeles",
};

const ProfileEdit: React.FC = () => {
  const { toggleEditMode, locationText, setLocationText, bioText, setBioText } = useContext<ProfileProps>(ProfileContext);
  const [tempLocationText, setTempLocationText] = useState(locationText);
  const [tempBioText, setTempBioText] = useState(bioText);

  const handleSave = () => {
    // Post updated info
    setLocationText(tempLocationText);
    setBioText(tempBioText);

    toggleEditMode();
  };

  const handleCancel = () => {
    setTempLocationText(locationText);
    setTempBioText(bioText);

    toggleEditMode();
  };

  return (
    <>
      <div className="m-3 space-y-3">
        {/* Profile Header */}
        <div className="flex">
          {/* Picture */}
          <img src={data.image} alt="Profile Picture" className="h-20 w-20 object-cover rounded-full" />
          {/* Name and User */}
          <div className="flex flex-col justify-center ml-2 p-0">
            <h1 className="text-2xl -mb-2">{data.name}</h1>
            <h2 className="text-xl text-gray-500 font-light">{data.username}</h2>
          </div>
        </div>

        {/* Bio */}
        <Transition
          appear={true}
          show={true}
          enter="transition ease-out duration-200"
          enterFrom="transform origin-top-left -translate-x-2 -translate-y-2 border-opacity-0"
          enterTo="transform border-opacity-100"
        >
          <textarea
            name="bio"
            id="bio"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTempBioText(e.target.value)}
            value={tempBioText || "Talk about yourself!"}
            className={`w-full h-24 text-sm border-gray-300 rounded-md resize-none ${tempBioText ? "" : "text-gray-400"}`}
          />
        </Transition>

        {/* Location */}
        <Transition appear={true} show={true} enter="transition ease-out duration-1000" enterFrom="transform opacity-0" enterTo="transform opacity-100">
          <div className="flex items-center">
            <LocationMarkerIcon className="h-6 w-6 text-gray-500" />
            <input
              type="text"
              name="location"
              id="location"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTempLocationText(e.target.value)}
              value={tempLocationText || "Add a location"}
              className={`w-full ml-1 border-gray-300 rounded-md ${tempLocationText ? "" : "text-gray-400"}`}
            />
          </div>
        </Transition>
      </div>

      {/* Buttons */}
      <Transition
        appear={true}
        show={true}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0"
        enterTo="transform opacity-100"
        className="mt-5 mx-3 flex space-x-2"
      >
        <button onClick={handleSave} className="py-1 px-2 bg-blue-400 rounded-md text-gray-100">
          Save
        </button>
        <button onClick={handleCancel} className="py-1 px-2 bg-gray-500 text-gray-200 rounded-md">
          Cancel
        </button>
      </Transition>
    </>
  );
};

export default ProfileEdit;
