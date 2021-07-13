import { ProfileContext, ProfileProps } from "../components/context/ProfileContext";
import { useRef, useState, MouseEvent, useContext } from "react";
import { useInterval } from "../components/hooks/useInterval";
import Button from "../components/common/Button";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import Joi from "joi";

const Signup: React.FC = () => {
  const { setLoggedIn } = useContext<ProfileProps>(ProfileContext);
  const [invalid, setInvalid] = useState(false);
  const [error, setError] = useState<string>();
  const [usernameState, setUsernameState] = useState<string>();

  const name = useRef<HTMLInputElement>();
  const username = useRef<HTMLInputElement>();
  const email = useRef<HTMLInputElement>();
  const password = useRef<HTMLInputElement>();
  const passwordConfirm = useRef<HTMLInputElement>();
  const router = useRouter();

  // check if user exists - NEED TO THROTTLE FETCHING ON SIGNUP
  async function userExists(_username: string) {
    if (!username.current.value) return;

    const { exists } = (await axios.get<{ exists: boolean }>(`/api/user/${username.current.value}`)).data;
    if (exists) {
      setError("Username taken.");
      setInvalid(true);
      return exists;
    }

    return exists;
  }

  useInterval(async () => {
    if (username.current.value !== usernameState) {
      setUsernameState(username.current.value);

      const exists = await userExists(username.current.value);
      if (exists) return;

      setInvalid(false);
      return;
    }
  }, 1500);

  const handleSignup = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const exists = await userExists(username.current.value);
    if (exists) return;

    setInvalid(false);
    setError(null);

    if (
      !username.current.value ||
      !password.current.value ||
      !name.current.value ||
      !email.current.value ||
      !passwordConfirm.current.value
    ) {
      setError("All fields are required.");
      return setInvalid(true);
    }

    if (password.current.value !== passwordConfirm.current.value) {
      setError("Passwords do not match.");
      return setInvalid(true);
    }

    const { error } = formSchema.validate({
      name: name.current.value,
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
    });

    if (error?.message) {
      setError(error.message);
      return setInvalid(true);
    }

    if (!invalid)
      try {
        await axios.post("/api/user", {
          name: name.current.value,
          username: username.current.value,
          email: email.current.value,
          password: password.current.value,
        });

        setLoggedIn(true);
        setInvalid(false);
        router.replace("/");
      } catch (e) {
        console.log(e);
        return setInvalid(true);
      }
  };

  return (
    <div className="my-3 mx-4">
      <h1 className="mt-4 text-center text-3xl font-extrabold text-primary">Sign up!</h1>
      <p className="mb-2 mt-1 text-center text-sm text-secondary-dark">
        Or do you{" "}
        <Link href="/login">
          <span className="select-none cursor-pointer font-medium text-button hover:text-button-light">
            have an account?
          </span>
        </Link>
      </p>

      <div className="sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:mt-0 md:col-span-2">
            <form>
              <div className="sm:rounded-md">
                <div className="px-4 py-2 bg-white rounded-lg pb-4 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="name" className="block text-sm font-medium text-secondary-darker">
                        Name
                      </label>
                      <input
                        type="text"
                        ref={name}
                        id="name"
                        autoComplete="name"
                        className="mt-1 focus:ring-button focus:border-button block w-full shadow-sm sm:text-sm border-secondary-light rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="username" className="block text-sm font-medium text-secondary-darker">
                        Username
                      </label>
                      <div className="flex mt-1">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-secondary-light bg-gray-50 text-secondary text-sm">
                          @
                        </span>
                        <input
                          ref={username}
                          // onChange={() => setUsernameTaken(username.current.value)}
                          type="text"
                          id="username"
                          autoComplete="username"
                          className="focus:ring-button focus:border-button block w-full shadow-sm sm:text-sm border-secondary-light rounded-r-md"
                        />
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="email" className="block text-sm font-medium text-secondary-darker">
                        Email address
                      </label>
                      <input
                        ref={email}
                        type="text"
                        id="email"
                        autoComplete="email"
                        className="mt-1 focus:ring-button focus:border-button block w-full shadow-sm sm:text-sm border-secondary-light rounded-md"
                      />
                    </div>

                    <div className="col-span-6">
                      <label htmlFor="password" className="block text-sm font-medium text-secondary-darker">
                        Password
                      </label>
                      <input
                        ref={password}
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        className="mt-1 focus:ring-button focus:border-button block w-full shadow-sm sm:text-sm border-secondary-light rounded-md"
                      />
                    </div>

                    <div className="col-span-6">
                      <label htmlFor="passwordConfirm" className="block text-sm font-medium text-secondary-darker">
                        Confirm Password
                      </label>
                      <input
                        ref={passwordConfirm}
                        type="password"
                        id="passwordConfirm"
                        autoComplete="new-password"
                        className="mt-1 focus:ring-button focus:border-button block w-full shadow-sm sm:text-sm border-secondary-light rounded-md"
                      />
                    </div>

                    <Button
                      onClick={handleSignup}
                      className="col-span-6 sm:col-span-3 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Sign up
                    </Button>
                    {invalid ? (
                      <span className="-mt-4 col-span-6 sm:col-span-3 text-sm font-medium text-red-600 opacity-75">
                        {error}
                      </span>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

// Joi Form Validation
const formSchema = Joi.object({
  name: Joi.string().min(1).max(55).required().messages({
    "string.min": "Name cannot be empty.",
    "string.max": "Name is too long.",
  }),
  username: Joi.string().min(3).max(55).required().messages({
    "string.min": "Username should be at least {#limit} characters.",
    "string.max": "Username is too long.",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .max(255)
    .required()
    .messages({
      "string.email": "Must be valid email.",
      "string.max": "Email is too long.",
    }),
  password: Joi.string().min(6).max(255).required().messages({
    "string.min": "Password should be at least {#limit} characters.",
    "string.max": "Password is too long.",
  }),
});

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
