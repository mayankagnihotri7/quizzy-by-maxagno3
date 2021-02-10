import React from "react";
import { toast, Slide } from "react-toastify";

const ToastrComponent = ({ type, message }) => {
  return (
    <div className="flex flex-row items-start justify-start">
      <p className="mx-4 font-medium leading-5 text-white">{message}</p>
    </div>
  );
};

const showToastr = message => {
  toast.success(<ToastrComponent type="success" message={message} />, {
    position: toast.POSITION.BOTTOM_CENTER,
    transition: Slide,
  });
};

const isError = e => e && e.stack && e.message;

const showErrorToastr = error => {
  const errorMessage = isError(error) ? error.message : error;
  toast.error(<ToastrComponent type="error" message={errorMessage} />, {
    position: toast.POSITION.BOTTOM_CENTER,
    transition: Slide,
  });
};

export const Toastr = {
  success: showToastr,
  error: showErrorToastr,
};

export default Toastr;
