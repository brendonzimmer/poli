import { MenuToggleContext, MenuToggleProps } from "../context/MenuContext";
import { ProfileContext, ProfileProps } from "../context/ProfileContext";
import { MenuIcon } from "@heroicons/react/outline";
import { useContext } from "react";
import Link from "next/link";
import Logo from "./Logo";

const Navbar: React.FC = () => {
  const { picture, loggedIn } = useContext<ProfileProps>(ProfileContext);
  const { show, setShow } = useContext<MenuToggleProps>(MenuToggleContext);

  return (
    <nav className="bg-nav">
      <div className="max-w-7xl mx-auto px-2">
        <div className="grid grid-cols-3 items-center justify-between h-16">
          {/* Menu Icon */}
          <button onClick={() => setShow(prevShow => !prevShow)}>
            <MenuIcon className="h-7 w-7 text-primary" />
          </button>

          {/* Logo */}
          <div onClick={() => setShow(false)} className="flex items-center justify-center">
            <Link href="/">
              <button>
                <Logo />
              </button>
            </Link>
          </div>

          {/* Logged In Menu Options */}
          {loggedIn && show && (
            <div className="absolute top-12 left-3 w-48 rounded-md shadow-md py-1 bg-bright font-medium text-sm">
              <Link href="/profile">
                <button
                  onClick={() => setShow(false)}
                  className="w-full text-left focus:bg-secondary-lighter focus:outline-none block px-4 py-2 text-sm text-primary"
                >
                  Your Profile
                </button>
              </Link>

              <Link href="/logout">
                <button
                  onClick={() => setShow(false)}
                  className="w-full text-left focus:bg-secondary-lighter focus:outline-none block px-4 py-2 text-sm text-primary"
                >
                  Sign out
                </button>
              </Link>
            </div>
          )}

          {/* Logged Out Menu Options */}
          {!loggedIn && show && (
            <div className="absolute top-12 left-3 w-48 rounded-md shadow-md py-1 bg-bright font-medium text-sm">
              <Link href="/login">
                <button
                  onClick={() => setShow(false)}
                  className="w-full text-left focus:bg-secondary-lighter focus:outline-none block px-4 py-2 text-sm text-primary"
                >
                  Login
                </button>
              </Link>

              <Link href="/signup">
                <button
                  onClick={() => setShow(false)}
                  className="w-full text-left focus:bg-secondary-lighter focus:outline-none block px-4 py-2 text-sm text-primary"
                >
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
