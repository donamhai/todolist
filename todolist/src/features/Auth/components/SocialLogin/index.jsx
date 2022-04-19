import React from "react";
import PropTypes from "prop-types";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

SocialLogin.propTypes = {};

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "redirect",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/todos",
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
};

function SocialLogin(props) {
  return (
    <div>
      <div className="text-center">
        <p>login with social account</p>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    </div>
  );
}

export default SocialLogin;
