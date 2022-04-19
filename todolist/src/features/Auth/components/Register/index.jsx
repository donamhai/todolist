import React from "react";
import PropTypes from "prop-types";
import RegisterForm from "../RegisterForm";
import FireBase from "../../../../config/firebase";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { register } from "../../userSlice";
import { unwrapResult } from "@reduxjs/toolkit";

Register.propTypes = {};

function Register(props) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    try {
      const action = register(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);

      enqueueSnackbar("Register successfully!!!", { variant: "success" });
    } catch (error) {
      console.log("Failed to register: ", error);
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Register;
