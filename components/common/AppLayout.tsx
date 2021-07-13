import { NextComponentType, NextPageContext } from "next";
import { MenuToggleContext, MenuToggleProps } from "../context/MenuContext";
import { useContext } from "react";
import Navbar from "./Navbar";

interface AppLayoutProps {
  Component: NextComponentType<NextPageContext, any, {}>;
  pageProps: any;
}

const AppLayout: React.FC<AppLayoutProps> = ({ Component, pageProps }) => {
  const { setShow } = useContext<MenuToggleProps>(MenuToggleContext);

  return (
    <>
      <Navbar />
      <div className="h-[calc(100vh-5rem)]" onClick={() => setShow(false)}>
        <Component {...pageProps} />
      </div>
    </>
  );
};

export default AppLayout;
