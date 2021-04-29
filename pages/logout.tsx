import { ProfileContext, ProfileProps } from "../components/context/ProfileContext";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import axios from "axios";

const Logout: React.FC = () => {
  const { setToken, setLoggedIn } = useContext<ProfileProps>(ProfileContext);
  const router = useRouter();

  useEffect(() => {
    setLoggedIn(false);

    axios.post("/api/user/logout").then(res => {
      setToken(undefined);
      router.replace("/");
    });
  }, []);

  return <></>;
};

export default Logout;
