import { useEffect } from "react";
import { Auth } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";

function LogIn() {
  const navigate = useNavigate();

  const checkAuthState = async () => {
    try {
      await Auth.currentAuthenticatedUser();
      navigate("/Calculator");
    } catch (error) {
      console.log("User is not authenticated");
    }
  };

  useEffect(() => {
    checkAuthState();
  }, []);

  const handleSignIn = async () => {
    checkAuthState();
  };

  return (
    <div>
        <Authenticator onSignIn={handleSignIn} signUpAttributes={["phone_number"]}>
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
