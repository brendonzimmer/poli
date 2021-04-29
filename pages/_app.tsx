import { AppProps } from "next/app";
import { ProfileProvider } from "../components/context/ProfileContext";
import { MenuToggleProvider } from "../components/context/MenuContext";
import AppLayout from "../components/common/AppLayout";
import "../global.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <ProfileProvider>
      <MenuToggleProvider>
        <AppLayout Component={Component} pageProps={pageProps} />
      </MenuToggleProvider>
    </ProfileProvider>
  );
}

export default App;
