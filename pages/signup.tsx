import { ProfileContext, ProfileProps } from "../components/context/ProfileContext";
import { useRef, useState, MouseEvent, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import Joi from "joi";

const Signup: React.FC = () => {
  const { setLoggedIn } = useContext<ProfileProps>(ProfileContext);
  const [invalid, setInvalid] = useState(false);
  const [error, setError] = useState<string>();
  const [usernameTaken, setUsernameTaken] = useState("");

  const name = useRef<HTMLInputElement>();
  const username = useRef<HTMLInputElement>();
  const email = useRef<HTMLInputElement>();
  const password = useRef<HTMLInputElement>();
  const passwordConfirm = useRef<HTMLInputElement>();
  const router = useRouter();

  // make sure username is available
  useEffect(() => {
    console.log(usernameTaken);
  }, [usernameTaken]);

  const handleSignup = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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

  const inputClasses =
    "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm";

  return (
    <div className="my-3 mx-4">
      <h1 className="mt-4 text-center text-3xl font-extrabold text-gray-900">Sign up!</h1>
      <p className="mb-2 mt-1 text-center text-sm text-gray-600">
        Or do you{" "}
        <Link href="/login">
          <span className="font-medium text-indigo-600 hover:text-indigo-500">have an account?</span>
        </Link>
      </p>

      <div className="sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:mt-0 md:col-span-2">
            <form>
              <div className="sm:rounded-md">
                <div className="px-4 py-2 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        ref={name}
                        id="name"
                        autoComplete="name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Username
                      </label>
                      <div className="flex mt-1">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                          @
                        </span>
                        <input
                          ref={username}
                          onChange={() => setUsernameTaken(username.current.value)}
                          type="text"
                          id="username"
                          autoComplete="username"
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-r-md"
                        />
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <input
                        ref={email}
                        type="text"
                        id="email"
                        autoComplete="email"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <input
                        ref={password}
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6">
                      <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700">
                        Confirm Password
                      </label>
                      <input
                        ref={passwordConfirm}
                        type="password"
                        id="passwordConfirm"
                        autoComplete="new-password"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <button
                      onClick={handleSignup}
                      className="col-span-6 sm:col-span-3 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                      Sign up
                    </button>
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
  email: Joi.string().min(6).max(255).required().messages({
    "string.min": "Email should be at least {#limit} characters.",
    "string.max": "Email is too long.",
  }),
  password: Joi.string().min(6).max(255).required().messages({
    "string.min": "Password should be at least {#limit} characters.",
    "string.max": "Password is too long.",
  }),
});
