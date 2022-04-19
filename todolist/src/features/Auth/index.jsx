import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, makeStyles } from "@material-ui/core";
import Register from "./components/Register";
import Login from "./components/Login";
import SocialLogin from "./components/SocialLogin";

AuthFeatures.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "20px",
    width: "500px",
    margin: "0 auto",
  },
}));

function AuthFeatures(props) {
  const classes = useStyles();
  const MODE = {
    LOGIN: "login",
    REGISTER: "register",
  };
  const [mode, setMode] = useState(MODE.LOGIN);
  return (
    <Box className={classes.root}>
      {mode === MODE.REGISTER && (
        <>
          <Register />
          <Box textAlign="center">
            <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
              Already have an account. Login here
            </Button>
          </Box>
        </>
      )}

      {mode === MODE.LOGIN && (
        <>
          <Login />
          <Box textAlign="center">
            <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
              Don't have an account. Register here
            </Button>
          </Box>
        </>
      )}

      <SocialLogin />
    </Box>
  );
}

export default AuthFeatures;
