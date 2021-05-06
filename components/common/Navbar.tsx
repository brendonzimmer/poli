import Link from "next/link";
import { useContext, Fragment } from "react";
import { Transition } from "@headlessui/react";
import { ProfileContext, ProfileProps } from "../context/ProfileContext";
import { MenuToggleContext, MenuToggleProps } from "../context/MenuContext";

const Navbar: React.FC = () => {
  const { picture, loggedIn } = useContext<ProfileProps>(ProfileContext);
  const { show, setShow } = useContext<MenuToggleProps>(MenuToggleContext);

  return (
    <nav className="bg-gray-800 relative z-10">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div
            onClick={() => setShow(false)}
            className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
          >
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <button className="focus:outline-none">
                  <Logo />
                </button>
              </Link>
            </div>
            <div className="hidden sm:flex sm:items-center sm:ml-6">
              <div className="flex space-x-4">
                <input type="text" />
              </div>
            </div>
          </div>
          {loggedIn ? (
            <div className="absolute top-4 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                onClick={() => setShow(prevShow => !prevShow)}
                className={`bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white ${
                  show ? "ring-2 ring-offset-2 ring-offset-gray-800 ring-white" : ""
                }`}
              >
                <span className="sr-only">Open user menu</span>
                <img className="h-8 w-8 object-cover rounded-full" src={picture} alt="Profile Picture" />
              </button>
              <Transition
                show={show}
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-100"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <ul className="origin-top-right absolute right-3 top-8 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <li className="text-left w-full">
                    <Link href="/profile">
                      <button
                        onClick={() => setShow(prevShow => !prevShow)}
                        className="w-full text-left focus:bg-gray-200 focus:outline-none block px-4 py-2 text-sm text-gray-700"
                      >
                        Your Profile
                      </button>
                    </Link>
                  </li>
                  <li className="text-left w-full">
                    <Link href="#">
                      <button
                        onClick={() => setShow(prevShow => !prevShow)}
                        className="w-full text-left focus:bg-gray-200 focus:outline-none block px-4 py-2 text-sm text-gray-700"
                      >
                        Notifications
                      </button>
                    </Link>
                  </li>
                  <li className="text-left w-full">
                    <Link href="#">
                      <button
                        onClick={() => setShow(prevShow => !prevShow)}
                        className="w-full text-left focus:bg-gray-200 focus:outline-none block px-4 py-2 text-sm text-gray-700"
                      >
                        Settings
                      </button>
                    </Link>
                  </li>
                  <li className="text-left w-full">
                    <Link href="/logout">
                      <button
                        onClick={() => setShow(prevShow => !prevShow)}
                        className="w-full text-left focus:bg-gray-200 focus:outline-none block px-4 py-2 text-sm text-gray-700"
                      >
                        Sign out
                      </button>
                    </Link>
                  </li>
                </ul>
              </Transition>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// Logo SVG
const Logo = () => (
  <svg
    className="h-12 text-gray-400 w-auto fill-current"
    viewBox="-.54877703 -.9328656 31.00877703 25.27689404"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="#4a3866">
      <path d="m12.49 20.3s-.58 1.06.32 1.3c1.29.35 1.75-1.87 1.75-1.87z" />
      <path d="m12.72 20.36s-.86 2-2.09 1.59.37-1.74.37-1.74z" />
      <path d="m11.14 20.09s-1.75 2.67-2.83 1.55c-.63-.65.47-2.16.47-2.16z" />
    </g>
    <path
      d="m12 0a10.07 10.07 0 0 0 -9.91 10.21 10.5 10.5 0 0 0 .27 2.34 3.18 3.18 0 0 0 -1.68 2.62h1.6s-1.94 1.13-2.03 2.83l1.47-.35a6.14 6.14 0 0 0 -1.72 3.35l5.06-3.5a9.74 9.74 0 0 0 6.94 2.93 10.07 10.07 0 0 0 9.92-10.21 10.07 10.07 0 0 0 -9.92-10.22z"
      fill="#ff2753"
    />
    <path d="m10.05 17.87 7.54-13.39s-4.17-3.55-7.54-.62c-3.85 3.35-3.22 11.46 0 14.01z" fill="#fff" />
    <ellipse cx="12.17" cy="6.97" fill="#4a3866" rx="2.29" ry="2.35" />
    <path d="m14.46 14 7.3 6.23s8.7-12.06-2.42-15.15z" fill="#ffdd5a" />
    <path d="m22.72 9.33a2.72 2.72 0 0 1 .43 3.83 11.51 11.51 0 0 0 -.43-3.83z" fill="#fff" />
  </svg>
);
