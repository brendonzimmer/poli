import { useState, createContext, Dispatch, SetStateAction, useEffect } from "react";
import { AnsweredQuestionType } from "../common/Question";
import fetcher from "../../util/fetcher";
import useSWR from "swr";

// Types
export interface UserType<T = number> {
  id?: number;
  name: string;
  username: string;
  picture: string;
  email: string;
  biography: string;
  location: string;
  followers: T;
  following: T;
  opinions: (AnsweredQuestionType | any)[];
}
export interface ProfileProps extends UserType<number> {
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  loggedIn: boolean;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
  editMode: boolean;
  toggleEditMode: () => void;
  setPicture: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setBiography: Dispatch<SetStateAction<string>>;
  setLocation: Dispatch<SetStateAction<string>>;
}

// Context
export const ProfileContext = createContext(null);

// Provider
export const ProfileProvider: React.FC = ({ children }) => {
  // Token State
  const [token, setToken] = useState();

  // Logged-in State
  const [loggedIn, setLoggedIn] = useState();

  // Get data from API
  const { data, error } = useSWR<UserType<String[]>>(["/api/user", token], fetcher);

  // Edit Mode State
  const [editMode, setEditMode] = useState(false);
  const toggleEditMode = () => {
    setEditMode(prevEditMode => !prevEditMode);
  };

  // Location State
  const [location, setLocation] = useState("");

  // Biography State
  const [biography, setBiography] = useState("");

  // Image State
  const [picture, setPicture] = useState("");

  // Name State
  const [name, setName] = useState("");

  // Username State
  const [username, setUsername] = useState("");

  // Email State
  const [email, setEmail] = useState("");

  // Followers State
  const [followers, setFollowers] = useState(0);

  // Following State
  const [following, setFollowing] = useState(0);

  // Opinions State
  const [opinions, setOpinions] = useState([]);

  useEffect(() => {
    if (data) {
      setBiography(data.biography);
      setLocation(data.location);
      setPicture(data.picture);
      setName(data.name);
      setUsername(data.username);
      setEmail(data.email);
      setFollowers(data.followers.length);
      setFollowing(data.following.length);
      setOpinions(data.opinions);
    }
  }, [data]);

  // Final Props
  const ProfileProps: ProfileProps = {
    name: name,
    username: username,
    picture: picture,
    email: email,
    biography: biography,
    location: location,
    followers: followers,
    following: following,
    opinions: opinions,

    token: token,
    setToken: setToken,
    loggedIn: loggedIn,
    setLoggedIn: setLoggedIn,
    editMode: editMode,
    toggleEditMode: toggleEditMode,
    setPicture: setPicture,
    setEmail: setEmail,
    setBiography: setBiography,
    setLocation: setLocation,
  };

  return <ProfileContext.Provider value={ProfileProps}>{children}</ProfileContext.Provider>;
};
