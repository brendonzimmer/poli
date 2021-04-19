import { FC } from "react";

const ProfileCards: FC = () => {
  return (
    <>
      {/* Cards */}
      <div className="flex overflow-x-scroll space-x-3 px-2 mb-3">
        <div className="bg-blue-100 rounded-lg p-2 min-w-[100%] h-[40vh] divide-y divide-blue-200">
          <h1 className="text-xl font-medium mb-1">{"This is a questoon"}</h1>
          <p className="pt-2">{"This is my respinse"}</p>
        </div>
        <div className="bg-blue-100 rounded-lg p-2 min-w-[100%] h-[40vh] divide-y divide-blue-200">
          <h1 className="text-xl font-medium mb-1">{"This is a questoon"}</h1>
          <p className="pt-2">{"This is my respinse"}</p>
        </div>
        <div className="bg-blue-100 rounded-lg p-2 min-w-[100%] h-[40vh] divide-y divide-blue-200">
          <h1 className="text-xl font-medium mb-1">{"This is a questoon"}</h1>
          <p className="pt-2">{"This is my respinse"}</p>
        </div>
        <div className="bg-blue-100 rounded-lg p-2 min-w-[100%] h-[40vh] divide-y divide-blue-200">
          <h1 className="text-xl font-medium mb-1">{"This is a questoon"}</h1>
          <p className="pt-2">{"This is my respinse"}</p>
        </div>
      </div>
    </>
  );
};

export default ProfileCards;
