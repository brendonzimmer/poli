import { MouseEvent, useContext, useRef, useState } from "react";
import { ProfileContext, ProfileProps } from "../components/context/ProfileContext";
import { LockClosedIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";

const Login: React.FC = () => {
  const { setToken, setLoggedIn } = useContext<ProfileProps>(ProfileContext);
  const [invalid, setInvalid] = useState(false);
  const username = useRef<HTMLInputElement>();
  const password = useRef<HTMLInputElement>();
  const router = useRouter();

  const handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!username.current.value && !password.current.value) setInvalid(true);

    axios
      .post("/api/user/auth", {
        username: username.current.value,
        password: password.current.value,
      })
      .then(res => {
        setToken(res.data);
        setLoggedIn(true);
        setInvalid(false);
        router.replace("/");
      })
      .catch(res => setInvalid(true));
  };

  const inputClasses =
    "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm";

  return (
    <div className="my-3 mx-4">
      <h1 className="mt-4 text-center text-3xl font-extrabold text-gray-900">Sign in</h1>
      <p className="mb-2 mt-1 text-center text-sm text-gray-600">
        Or{" "}
        <Link href="/signup">
          <span className="select-none cursor-pointer font-medium text-indigo-600 hover:text-indigo-500">
            make an account
          </span>
        </Link>
      </p>
      <form className="flex flex-col space-y-2">
        <div>
          <div className="mt-1 flex rounded-md shadow-sm">
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            {/* <span className="inline-flex items-center px-3 rounded-tl-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">@</span> */}
            <input
              ref={username}
              type="text"
              id="username"
              placeholder="Username"
              className={inputClasses + " rounded-t-md"}
              autoComplete="username"
            />
          </div>
          <div className="">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              ref={password}
              type="password"
              id="password"
              placeholder="Password"
              className={inputClasses + " rounded-b-md"}
              autoComplete="current-password"
            />
          </div>
        </div>
        <button
          onClick={handleLogin}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
          </span>
          Sign in
        </button>
        <div className="text-sm">
          <Link href="#">
            <button className="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</button>
          </Link>
        </div>
        {invalid ? (
          <span className="text-sm font-medium text-red-600 opacity-75">Incorrect username or password.</span>
        ) : (
          <></>
        )}
      </form>
    </div>
  );
};

export default Login;

import { GetServerSideProps } from "next";
import { getUserByToken } from "../utils/user";
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const { data } = await getUserByToken(req, res);

  if (data)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  return {
    props: {},
  };
};
