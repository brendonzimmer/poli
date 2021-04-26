import { NextComponentType, NextPageContext } from "next";
import { MenuToggleContext, MenuToggleProps } from "../context/MenuToggleContext";
import { useContext, useEffect, useState } from "react";
import { ProfileContext, ProfileProps } from "../context/ProfileContext";
import Navbar from "./Navbar";
import axios from "axios";

interface AppLayoutProps {
  Component: NextComponentType<NextPageContext, any, {}>;
  pageProps: any;
}

const AppLayout: React.FC<AppLayoutProps> = ({ Component, pageProps }) => {
  const { setShow } = useContext<MenuToggleProps>(MenuToggleContext);
  const { token, setToken, setLoggedIn } = useContext<ProfileProps>(ProfileContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      axios
        .post("/api/user/auth/refresh")
        .then(async res => {
          setToken(res.data);
          setLoggedIn(true);
          setLoading(false);
        })
        .catch(() => {
          setLoggedIn(false);
          setLoading(false);
        });
    }
  }, [token]);

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <Navbar />
      <div onClick={() => setShow(false)}>
        <Component {...pageProps} />
      </div>
    </>
  );
};

export default AppLayout;
