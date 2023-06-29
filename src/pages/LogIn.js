import React, { useEffect, useState } from "react";
import { useAuthenticator, Authenticator } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import "@aws-amplify/ui-react/styles.css";
import "../styles/LogIn.css";

function LogIn() {
  const navigate = useNavigate();
  const authState = useAuthenticator((context) => [context.authStatus]);
  console.log(authState.authStatus);
  if (authState.authStatus === "authenticated") {
    navigate("/Calculator");
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        color: "white",
        background:
          "radial-gradient(at 0% 0%, hsla(253, 16%, 7%, 1) 0, transparent 50%), radial-gradient(at 5% 200%, #006eeb9a 0, transparent 50%), radial-gradient(at 100% -75%, #d402029a 0, transparent 50%)",
      }}
    >
      <Authenticator
        signUpConfig={{ hiddenDefaults: ["phone_number"] }}
        onAuthUIStateChange={(nextAuthState, data) =>
          console.log(`Auth state changed: ${nextAuthState}`)
        }
      >
        {({ signOut, user }) => (
          <main>
            <button onClick={signOut}>Sign out</button>
          </main>
        )}
      </Authenticator>
    </div>
  );
}

export default LogIn;
