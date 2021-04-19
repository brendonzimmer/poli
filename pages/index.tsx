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
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <main>
          <h1>Hello!</h1>
          <div className="flex justify-center items-center h-96">
            <button>WORKs :)</button>
          </div>
        </main>
      </Transition>
    </>
  );
};

export default Home;
