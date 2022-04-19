import React from "react";
import PropTypes from "prop-types";
import LoginForm from "../LoginForm";
import FireBase from "../../../../config/firebase";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { login } from "../../userSlice";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

Login.propTypes = {};

function Login(props) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (values) => {
    try {
      const action = login(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      history.push("/todos");
    } catch (error) {
      console.log("Failed to login: ", error);
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Login;
