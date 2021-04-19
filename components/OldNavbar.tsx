import Link from "next/link";
import { useContext, Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { ProfileContext, ProfileProps } from "./context/ProfileContext";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Topics", href: "/topics", current: false },
];

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { profilePic } = useContext<ProfileProps>(ProfileContext);

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? <XIcon className="block h-6 w-6" aria-hidden="true" /> : <MenuIcon className="block h-6 w-6" aria-hidden="true" />}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <Logo />
                </div>
                <div className="hidden sm:flex sm:items-center sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map(item => (
                      <Link key={item.name} href={item.href} aria-current={item.current ? "page" : undefined}>
                        <div
                          className={classNames(
                            item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                        >
                          {item.name}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  {({ open }) => (
                    <>
                      <div>
                        <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">Open user menu</span>
                          <img className="h-8 w-8 object-cover rounded-full" src={profilePic} alt="Profile Picture" />
                        </Menu.Button>
                      </div>
                      <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          static
                          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          <Menu.Item as="button" className="text-left w-full">
                            {({ active }) => (
                              <Link href="/profile">
                                <div className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")}>Your Profile</div>
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item as="button" className="text-left w-full">
                            {({ active }) => (
                              <Link href="#">
                                <div className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")}>Notifications</div>
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item as="button" className="text-left w-full">
                            {({ active }) => (
                              <Link href="#">
                                <div className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")}>Settings</div>
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item as="button" className="text-left w-full">
                            {({ active }) => (
                              <Link href="#">
                                <div className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")}>Sign out</div>
                              </Link>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map(item => (
                <Link key={item.name} href={item.href} aria-current={item.current ? "page" : undefined}>
                  <div
                    className={classNames(
                      item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                  >
                    {item.name}
                  </div>
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

// Logo SVG
const Logo = () => (
  <svg className="h-16 w-auto" viewBox="0 0 177 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M98.9315 39.4284C96.1883 36.6852 92.9316 34.5091 89.3475 33.0245C85.7633 31.5399 81.9219 30.7758 78.0424 30.7758C74.1629 30.7758 70.3215 31.5399 66.7373 33.0245C63.1532 34.5091 59.8965 36.6852 57.1533 39.4284L78.0424 60.3174L98.9315 39.4284Z"
      fill="#FFD200"
    />
    <path
      d="M78.0686 60.3475C80.8118 63.0907 84.0684 65.2667 87.6526 66.7513C91.2367 68.2359 95.0782 69 98.9577 69C102.837 69 106.679 68.2359 110.263 66.7513C113.847 65.2667 117.104 63.0907 119.847 60.3475L98.9577 39.4584L78.0686 60.3475Z"
      fill="#06E07F"
    />
    <path
      d="M78.017 60.3429C75.2738 63.0861 72.0171 65.2621 68.433 66.7467C64.8488 68.2313 61.0074 68.9954 57.1279 68.9954C53.2484 68.9954 49.407 68.2313 45.8228 66.7467C42.2387 65.2621 38.982 63.0861 36.2388 60.3429L57.1279 39.4538L78.017 60.3429Z"
      fill="#E3073C"
    />
    <path
      d="M98.9831 39.433C101.726 36.6898 104.983 34.5138 108.567 33.0292C112.151 31.5446 115.993 30.7805 119.872 30.7805C123.752 30.7805 127.593 31.5446 131.177 33.0292C134.761 34.5138 138.018 36.6898 140.761 39.433L119.872 60.3221L98.9831 39.433Z"
      fill="#1F84EF"
    />
  </svg>
);
