import { useContext, useEffect } from "react";
import { ProfileContext, ProfileProps } from "../context/ProfileContext";

export const useProfile = (props: UseProfileProps) => {
  if (!props.token) return;

  const {
    setToken,
    setName,
    setUsername,
    setEmail,
    setPicture,
    setBiography,
    setLocation,
    setFollowers,
    setFollowing,
    setOpinions,
    setLoggedIn,
  } = useContext<ProfileProps>(ProfileContext);

  useEffect(() => {
    setToken(props.token);
    setBiography(props.biography);
    setLocation(props.location);
    setPicture(props.picture);
    setName(props.name);
    setUsername(props.username);
    setEmail(props.email);
    setFollowers(props.followers.length);
    setFollowing(props.following.length);
    setOpinions(props.opinions);
    setLoggedIn(true);
  }, []);
};

// Types
export interface UseProfileProps {
  name: string;
  token: string;
  username: string;
  picture: string;
  email: string;
  biography: string;
  location: string;
  followers: [];
  following: [];
  opinions: [];
}
