import React from "react";
import Routing from "./pages/Routing.js";
import { Authenticator, View } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css"; // default theme

function App() {
  return (
    <Authenticator.Provider>
      <View>
        <Routing />
      </View>
    </Authenticator.Provider>
  );
}

export default App;
