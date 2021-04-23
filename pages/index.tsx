import Link from "next/link";
import Head from "next/head";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Poli</title>
      </Head>
      <main className="m-3 flex justify-around bg-gray-800 text-gray-300 rounded-full">
        <Link href="/login">
          <button>LOGIN</button>
        </Link>
        <Link href="/signup">
          <button>SIGNUP</button>
        </Link>
      </main>
    </>
  );
};

export default Home;
