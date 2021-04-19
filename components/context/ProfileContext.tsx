import { useState, createContext, Dispatch, SetStateAction } from "react";

// Types
export interface ProfileProps {
  editMode: boolean;
  toggleEditMode: () => void;
  locationText: string;
  setLocationText: Dispatch<SetStateAction<string>>;
  bioText: string;
  setBioText: Dispatch<SetStateAction<string>>;
  profilePic: string;
  setProfilePic: () => void;
  name: string;
  username: string;
  followers: number;
  following: number;
}

const fakeData = {
  image:
    "https://images.unsplash.com/photo-1612459284970-e8f027596582?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDR8dG93SlpGc2twR2d8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  name: "Rando Name",
  username: "namezimmer",
  bio: "Hello! I'm name and I'm open to all sorts of points of view! Looking to talk!",
  followers: 1,
  following: 0,
  location: "los angeles",
};

// Context
export const ProfileContext = createContext(null);

// Provider
export const ProfileProvider = ({ children }) => {
  // Edit Mode State
  const [editMode, setEditMode] = useState(false);
  const toggleEditMode = () => {
    setEditMode(prevEditMode => !prevEditMode);
  };

  // Input State
  const [locationText, setLocationText] = useState<string>(fakeData.location);
  const [bioText, setBioText] = useState<string>(fakeData.bio);

  // Image State
  const [profilePic, setProfilePic] = useState<string>(fakeData.image);

  // Final Props
  const ProfileProps = {
    editMode: editMode,
    toggleEditMode: toggleEditMode,
    locationText: locationText,
    setLocationText: setLocationText,
    bioText: bioText,
    setBioText: setBioText,
    profilePic: profilePic,
    setProfilePic: setProfilePic,
    name: fakeData.name,
    username: fakeData.username,
    followers: fakeData.followers,
    following: fakeData.following,
  };

  return <ProfileContext.Provider value={ProfileProps}>{children}</ProfileContext.Provider>;
};
