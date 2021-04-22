const Error404: React.FC = () => {
  return (
    <div className="text-gray-800 grid justify-center items-center h-[75vh]">
      <p className="text-center text-3xl sm:text-5xl md:text-6xl font-bold">
        ERROR 404 <span className="hidden md:inline text-[2.5rem] font-normal">| How did you get here?</span>
        <p className="text-2xl sm:text-4xl md:hidden font-normal">How did you get here?</p>
      </p>
    </div>
  );
};

export default Error404;
