import React from "react";

const Button = ({ type = "button", buttonText, onClick, loading }) => {
  return (
    <div className="mt-8">
      <button
        type={type}
        onClick={onClick}
        className="relative flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-blue-500 border border-transparent rounded-md group hover:bg-opacity-90 focus:outline-none"
      >
        {loading ? "Loading..." : buttonText}
      </button>
    </div>
  );
};

export default Button;
