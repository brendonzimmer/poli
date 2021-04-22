import Head from "next/head";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Poli</title>
      </Head>
      <main className="m-3 space-y-3">
        <h1 className="bg-blue-200 text-center rounded-lg text-3xl px-2 py-1 font-medium text-gray-800">Welcome to Poli</h1>
        <h2 className="bg-purple-200 text-center rounded-lg text-xl px-2 py-1 font-medium text-gray-800">Trending Discussions</h2>
        <div className="flex justify-center items-center">{"Topic Cards"}</div>
      </main>
    </>
  );
};

export default Home;
