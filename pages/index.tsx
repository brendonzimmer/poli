import { ProfileContext, ProfileProps } from "../components/context/ProfileContext";
import { useProfile, UseProfileProps } from "../components/hooks/useProfile";
import { useContext } from "react";
import Link from "next/link";
import Head from "next/head";

const Home: React.FC<ServerSideProps> = (props: ServerSideProps) => {
  const { loggedIn } = useContext<ProfileProps>(ProfileContext);

  useProfile(props);

  return (
    <>
      <Head>
        <title>Poli</title>
      </Head>
      {loggedIn ? (
        <div className="m-3 flex justify-around bg-gray-800 text-gray-300">
          <h1>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat, facere. Officia dignissimos ex expedita
            dolore laboriosam enim minima amet sequi, velit veniam tenetur recusandae eum obcaecati fuga beatae
            exercitationem et? Sequi aliquam, accusantium necessitatibus ex amet temporibus impedit architecto autem
            commodi ullam praesentium iure minus? Asperiores veritatis voluptas sit sed dolores odit. Laudantium,
            impedit. Excepturi natus nesciunt rem impedit perspiciatis! Voluptate quo, eveniet iusto alias unde,
            voluptatum officiis, ea neque suscipit ipsa nemo ratione ab. Nisi illum adipisci quod debitis odio nobis,
            ipsam repudiandae quaerat minus porro autem impedit reiciendis?
          </h1>
        </div>
      ) : (
        <div className="m-3 flex justify-around bg-gray-800 text-gray-300 rounded-full">
          <Link href="/login">
            <button>LOGIN</button>
          </Link>
          <Link href="/signup">
            <button>SIGNUP</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Home;

import getUserByToken from "../utils/getUserByToken";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
export const getServerSideProps: GetServerSideProps<UseProfileProps> = async ({ req, res }) => {
  const { data, error } = await getUserByToken(req, res);

  if (error)
    return {
      redirect: {
        destination: "/login",
        permanent: true, // I dont know what this does
      },
    };

  return {
    props: {
      token: data.token,
      name: data.name,
      username: data.username,
      picture: data.picture,
      email: data.email,
      biography: data.biography,
      location: data.location,
      followers: data.followers,
      following: data.following,
      opinions: data.opinions,
    },
  };
};

type ServerSideProps = InferGetServerSidePropsType<typeof getServerSideProps>;
