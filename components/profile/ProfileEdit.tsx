import { LocationMarkerIcon, MailIcon, SaveIcon, XIcon, CameraIcon } from "@heroicons/react/outline";
import { ProfileProps, ProfileContext } from "../context/ProfileContext";
import { pictureToBase64 } from "../../utils/picture";
import { useContext, useState, useRef } from "react";
import axios from "axios";

const ProfileEdit: React.FC = () => {
  const {
    toggleEditMode,
    token,
    name,
    username,
    picture,
    email,
    biography,
    location,
    setName,
    setEmail,
    setPicture,
    setLocation,
    setBiography,
  } = useContext<ProfileProps>(ProfileContext);

  const [tempName, setTempName] = useState(name);
  // const [tempEmail, setTempEmail] = useState(email);
  const [tempBiography, setTempBiography] = useState(biography || "");
  const [tempLocation, setTempLocation] = useState(location || "");

  const handleSave = async () => {
    if (
      tempName === name &&
      (tempBiography === biography || tempBiography === "") &&
      (tempLocation === location || tempLocation === "") /* &&
      tempEmail === email */
    )
      return toggleEditMode();

    if (tempName !== name) setName(tempName);
    // if (tempEmail !== email) setEmail(tempEmail);
    if (tempBiography !== biography) setBiography(tempBiography);
    if (tempLocation !== location) setLocation(tempLocation);

    toggleEditMode();

    return await axios.put<{ name: string; email: string; biography: string; location: string }>(
      "/api/user",
      {
        name: tempName === name ? undefined : tempName,
        biography: tempBiography || undefined,
        location: tempLocation || undefined,
        // email: tempEmail === email ? undefined : tempEmail,
      },
      { headers: { authorization: "bearer " + token } }
    );
  };

  const handleCancel = () => {
    setTempName(name);
    // setTempEmail(email);
    setTempLocation(location);
    setTempBiography(biography);

    toggleEditMode();
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files[0];
    if (!uploaded) return;

    const pictureData = await pictureToBase64(uploaded);

    const { data } = await axios.post<{ username: string; picture: string }>(
      "/api/user/upload",
      { data: pictureData },
      { headers: { authorization: "bearer " + token } }
    );

    setPicture(data.picture);
  };

  return (
    <>
      {/* <Cropper /> */}
      <div className="m-3">
        {/* Profile Header */}

        <div className="flex mb-3 w-1/3">
          {/* Picture */}
          <img
            src={picture}
            alt="Profile Picture"
            className="mb-1 w-full h-full object-cover rounded-[50%] ring-2 ring-offset-2 ring-gray-400"
          />
          <div className="ml-3 flex flex-col justify-center">
            {/* Upload Picture */}
            <label
              htmlFor="picture-upload"
              className="whitespace-nowrap w-full flex justify-center py-1 px-3 border border-transparent text-sm font-medium rounded-2xl text-indigo-600 hover:text-indigo-300 bg-indigo-400 hover:bg-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-400"
            >
              <input
                type="file"
                id="picture-upload"
                accept="image/png, image/jpeg, .heic"
                className="fixed right-full bottom-full"
                onChange={handleUpload}
              />
              <span>
                <CameraIcon className="h-5 w-5 mr-2" aria-hidden="true" />
              </span>
              Change picture
            </label>

            {/* Username */}
            <h2 className="mt-1 w-min text-sm text-gray-500 text-center font-medium py-1 px-3 border border-transparent rounded-2xl bg-gray-300">
              {"@" + username}
            </h2>
          </div>
        </div>

        <div className="space-y-2">
          {/* Name */}
          <div className="flex items-center">
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              type="text"
              id="name"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTempName(e.target.value)}
              placeholder="Name"
              value={tempName}
              className={`w-full border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm py-1`}
            />
          </div>

          {/* Biography */}
          <div>
            <label htmlFor="biography" className="sr-only">
              Biography
            </label>
            <textarea
              id="biography"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTempBiography(e.target.value)}
              placeholder="Talk about yourself!"
              value={tempBiography}
              className={`w-full h-28 border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm ${
                tempBiography ? "" : "text-gray-400"
              }`}
            />
          </div>

          {/* Location */}
          <div className="flex items-center">
            <LocationMarkerIcon className="h-6 w-6 text-gray-500" />
            <label htmlFor="location" className="sr-only">
              Location
            </label>
            <input
              type="text"
              id="location"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTempLocation(e.target.value)}
              placeholder="Location"
              value={tempLocation}
              className={`w-full border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm py-1 ml-2 ${
                tempLocation ? "" : "text-gray-400"
              }`}
            />
          </div>

          {/* Email */}
          <div className="flex items-center">
            <MailIcon className="h-6 w-6 text-gray-500" />
            <label htmlFor="email" className="sr-only">
              Email: Read only.
            </label>
            <input
              type="text"
              id="email"
              // onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTempEmail(e.target.value)}
              // value={tempEmail}
              value={email}
              readOnly
              className="w-full border-gray-300 rounded-lg pointer-events-none focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm py-1 ml-2"
            />
          </div>

          {/* Buttons */}
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <SaveIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
              </span>
              Save
            </button>
            <button
              onClick={handleCancel}
              className="group py-1 px-2 w-1/5 flex justify-center items-center bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
            >
              <XIcon className="h-5 w-5 text-gray-500 group-hover:text-gray-700" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileEdit;
