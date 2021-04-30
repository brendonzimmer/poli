import { ProfileContext, ProfileProps } from "../components/context/ProfileContext";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
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

import { GetServerSideProps } from "next";
import { getUserByToken } from "../utils/user";
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const { error } = await getUserByToken(req, res);

  if (error)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };

  return {
    props: {},
  };
};
