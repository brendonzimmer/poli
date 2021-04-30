import { useState, createContext, Dispatch, SetStateAction } from "react";
import { OpinionsObject } from "../../server/models/user";

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
  opinions: OpinionsObject[];
}
export interface ProfileProps extends UserType<number> {
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  loggedIn: boolean;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
  editMode: boolean;
  toggleEditMode: () => void;
  setName: Dispatch<SetStateAction<string>>;
  setUsername: Dispatch<SetStateAction<string>>;
  setPicture: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setBiography: Dispatch<SetStateAction<string>>;
  setLocation: Dispatch<SetStateAction<string>>;
  setFollowers: Dispatch<SetStateAction<number>>;
  setFollowing: Dispatch<SetStateAction<number>>;
  setOpinions: Dispatch<SetStateAction<OpinionsObject[]>>;
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
  // const { data, error } = useSWR<UserType<String[]>>(["/api/user", token], fetcher);

  // Edit Mode State
  const [editMode, setEditMode] = useState(false);
  const toggleEditMode = () => {
    setEditMode(prevEditMode => !prevEditMode);
  };

  // Location State
  const [location, setLocation] = useState<string>();

  // Biography State
  const [biography, setBiography] = useState<string>();

  // Image State
  const [picture, setPicture] = useState<string>();

  // Name State
  const [name, setName] = useState<string>();

  // Username State
  const [username, setUsername] = useState<string>();

  // Email State
  const [email, setEmail] = useState<string>();

  // Followers State
  const [followers, setFollowers] = useState<number>();

  // Following State
  const [following, setFollowing] = useState<number>();

  // Opinions State
  const [opinions, setOpinions] = useState<[]>();

  // useEffect(() => {
  //   if (data) {
  //     setBiography(data.biography);
  //     setLocation(data.location);
  //     setPicture(data.picture);
  //     setName(data.name);
  //     setUsername(data.username);
  //     setEmail(data.email);
  //     setFollowers(data.followers.length);
  //     setFollowing(data.following.length);
  //     setOpinions(data.opinions);
  //   }
  // }, [data]);

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
    setName: setName,
    setUsername: setUsername,
    setPicture: setPicture,
    setEmail: setEmail,
    setBiography: setBiography,
    setLocation: setLocation,
    setFollowers: setFollowers,
    setFollowing: setFollowing,
    setOpinions: setOpinions,
  };

  return <ProfileContext.Provider value={ProfileProps}>{children}</ProfileContext.Provider>;
};
