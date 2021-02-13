import React from "react";

const Container = ({ children }) => {
  return (
    <>
      <div className="px-4 py-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">{children}</div>
      </div>
    </>
  );
};

export default Container;
