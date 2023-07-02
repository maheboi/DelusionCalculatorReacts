import React, { useEffect } from "react";
import { useAuthenticator, Authenticator } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import "@aws-amplify/ui-react/styles.css";
import "../styles/LogIn.css";

function LogIn() {
  const navigate = useNavigate();
  const authState = useAuthenticator((context) => [context.authStatus]);

  useEffect(() => {
    if (authState.authStatus === "authenticated") {
      navigate("/Calculator");
    }
  }, [authState.authStatus, navigate]);

  return (
    <div className="LogIn">
      <Authenticator signUpConfig={{ hiddenDefaults: ["phone_number"] }}>
        {({ signOut }) => (
          <main>
            <button onClick={signOut}>Sign out</button>
          </main>
        )}
      </Authenticator>
    </div>
  );
}

export default LogIn;
