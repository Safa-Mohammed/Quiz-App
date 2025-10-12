import React from "react";
import { CircleLoader } from "react-spinners";

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <CircleLoader
        color="#FFEDDF"
        size={80}
      />
    </div>
  );
};

export default Loader;