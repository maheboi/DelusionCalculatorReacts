import React, { useEffect } from "react";
import { useAuthenticator, Authenticator } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import "@aws-amplify/ui-react/styles.css";
import "../styles/LogIn.css";

import { Auth } from "aws-amplify";

function LogIn() {
  const navigate = useNavigate();

  const authState = useAuthenticator((context) => [context.authStatus]);
  console.log(authState.authStatus);

  useEffect(() => {
    const signInAndNavigate = async () => {
      if (authState.authStatus === "authenticated") {
        navigate("/Calculator");
      } else {
        try {
          await Auth.signIn("icor13no@gmail.com", "12345678");
          navigate("/Calculator");
        } catch (error) {
          console.log("Error signing in:", error);
        }
      }
    };

    signInAndNavigate();
  }, [authState.authStatus, navigate]);

  return <div className="LogIn"></div>;
}

export default LogIn;
