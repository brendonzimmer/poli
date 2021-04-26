import { ProfileContext, ProfileProps } from "../components/context/ProfileContext";
import { useRouter } from "next/router";
import { useContext } from "react";
import axios from "axios";

const Logout: React.FC = () => {
  const { setToken } = useContext<ProfileProps>(ProfileContext);
  const router = useRouter();

  axios.post("/api/user/logout").then(res => {
    setToken(undefined);
    router.replace("/");
  });

  return <></>;
};

export default Logout;
