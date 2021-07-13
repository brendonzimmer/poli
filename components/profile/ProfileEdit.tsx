import { LocationMarkerIcon, MailIcon, SaveIcon, XIcon, CameraIcon } from "@heroicons/react/outline";
import { ProfileProps, ProfileContext } from "../context/ProfileContext";
import { pictureToBase64 } from "../../utils/picture";
import { useContext, useState } from "react";
import Button from "../common/Button";
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
      <div className="m-3 text-primary">
        {/* Profile Header */}

        <div className="grid grid-cols-3 gap-2 mb-3">
          {/* Picture */}
          <img src={picture} alt="Profile Picture" className="w-full object-cover rounded-full" />
          <div className="col-span-2 flex flex-col justify-center">
            {/* Upload Picture */}
            <label
              htmlFor="picture-upload"
              className="whitespace-nowrap cursor-pointer max-w-min flex justify-center py-1 px-3 border border-transparent text-sm font-medium rounded-2xl text-button-lighter hover:text-button-dark bg-button hover:bg-button-light focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-button"
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
            <h2 className="mt-1 w-min text-sm text-secondary-slightly-dark text-center font-medium py-1 px-3 border border-transparent rounded-2xl bg-secondary-lighter">
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
              className={`w-full border-secondary-light rounded-lg focus:ring-button focus:border-button block shadow-sm py-1`}
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
              className={`w-full h-28 border-secondary-light rounded-lg focus:ring-button focus:border-button block shadow-sm ${
                tempBiography ? "" : "text-secondary-light"
              }`}
            />
          </div>

          {/* Location */}
          <div className="flex items-center">
            <LocationMarkerIcon className="h-6 w-6 text-secondary-slightly-dark" />
            <label htmlFor="location" className="sr-only">
              Location
            </label>
            <input
              type="text"
              id="location"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTempLocation(e.target.value)}
              placeholder="Location"
              value={tempLocation}
              className={`w-full border-secondary-light rounded-lg focus:ring-button focus:border-button block shadow-sm py-1 ml-2 ${
                tempLocation ? "" : "text-secondary-light"
              }`}
            />
          </div>

          {/* Email */}
          <div className="flex items-center">
            <MailIcon className="h-6 w-6 text-secondary-slightly-dark" />
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
              className="w-full border-secondary-light rounded-lg pointer-events-none focus:ring-button focus:border-button block shadow-sm py-1 ml-2"
            />
          </div>

          {/* Buttons */}
          <div className="flex space-x-2">
            <Button onClick={handleSave} icon={SaveIcon}>
              Save
            </Button>
            <Button
              onClick={handleCancel}
              className="py-1 px-2 w-1/5 flex justify-center items-center bg-secondary-lighter focus:ring-secondary-light hover:bg-secondary-light"
            >
              <XIcon
                className="h-5 w-5 text-secondary-slightly-dark group-hover:text-secondary-dark"
                aria-hidden="true"
              />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileEdit;
