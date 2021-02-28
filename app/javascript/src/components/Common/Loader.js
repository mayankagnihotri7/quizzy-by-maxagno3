import React from "react";
import BounceLoader from "react-spinners/BounceLoader";

const Loader = () => {
  return (
    <div className="flex justify-center items-center fixed top- 0 h-full w-full bg-opacity-25">
      <BounceLoader size={100} color="#4299e1" />
    </div>
  );
};

export default Loader;
