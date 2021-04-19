import { Transition } from "@headlessui/react";
import { Fragment } from "react";

const Error404: React.FC = () => {
  return (
    <Transition
      show={true}
      as={Fragment}
      enter="transition ease-out duration-200"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-200"
      leaveTo="transform opacity-0 scale-95"
    >
      <div className="text-gray-800 grid justify-center items-center h-[75vh]">
        <p className="text-center text-3xl sm:text-5xl md:text-6xl font-bold">
          ERROR 404 <span className="hidden md:inline text-[2.5rem] font-normal">| How did you get here?</span>
          <p className="text-2xl sm:text-4xl md:hidden font-normal">How did you get here?</p>
        </p>
      </div>
    </Transition>
  );
};

export default Error404;
