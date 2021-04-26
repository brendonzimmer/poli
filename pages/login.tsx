import { MouseEvent, useContext, useRef, useState } from "react";
import { ProfileContext, ProfileProps } from "../components/context/ProfileContext";
import { useRouter } from "next/router";
import axios from "axios";

const Login: React.FC = () => {
  const { setToken, setLoggedIn } = useContext<ProfileProps>(ProfileContext);
  const [incorrect, setIncorrect] = useState(false);
  const username = useRef<HTMLInputElement>();
  const password = useRef<HTMLInputElement>();
  const router = useRouter();

  const handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    axios
      .post("/api/user/auth", {
        username: username.current.value,
        password: password.current.value,
      })
      .then(res => {
        setToken(res.data);
        setLoggedIn(true);
        router.replace("/");
      })
      .catch(res => setIncorrect(true));
  };

  return (
    <div className="my-3 mx-10 space-y-3">
      <h1 className="text-center">Poli</h1>
      <form className="flex flex-col">
        {incorrect ? <span className="mb-2 text-red-500">Incorrect username or password.</span> : <></>}
        <input ref={username} type="text" id="username" className="" />
        <input ref={password} type="password" id="password" className="my-3" />
        <button onClick={handleLogin} className="bg-blue-700 rounded-lg px-3 py-2">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
