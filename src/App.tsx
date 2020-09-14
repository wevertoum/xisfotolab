import { UserProvider } from "contexts/UserContext";
import React from "react";
import MainRouter from "./routers/MainRouter";

function App() {
  return (
    <div>
      <UserProvider>
        <MainRouter />
      </UserProvider>
    </div>
  );
}

export default App;
