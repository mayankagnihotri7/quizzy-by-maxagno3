import React from "react";
// import Container from "components/Container";
import Button from "components/Button";

const index = () => {
  return (
    <>
      <div className="md:container md:mx-auto px-24 flex justify-end">
        <Button type="button" buttonText="Add new quiz" />
      </div>
      <div>
        <h1 className="text-xl leading-5 text-center">
          You have not created any quiz.
        </h1>
      </div>
    </>
  );
};

export default index;
