import Head from "next/head";
import { Transition } from "@headlessui/react";
import { Fragment } from "react";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Poli</title>
      </Head>
      <Transition
        as={Fragment}
        appear={true}
        show={true}
        enter="transition ease-out duration-500"
        enterFrom="transform opacity-0 scale-[0.99]"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-out duration-75"
        leaveFrom="transform opacity-100 scale-500"
        leaveTo="transform opacity-0 scale-95"
      >
        <main className="m-3 space-y-3">
          <h1 className="bg-blue-200 text-center rounded-lg text-3xl px-2 py-1 font-medium text-gray-800">Welcome to Poli</h1>
          <h2 className="bg-purple-200 text-center rounded-lg text-xl px-2 py-1 font-medium text-gray-800">Trending Discussions</h2>
          <div className="flex justify-center items-center">{"Topic Cards"}</div>
        </main>
      </Transition>
    </>
  );
};

export default Home;
