import React from "react";
import MainRouter from "./routers/MainRouter";
import { FormProvider } from "antd/lib/form/context";

function App() {
  return (
    <div>
      <FormProvider>
        <MainRouter />
      </FormProvider>
    </div>
  );
}

export default App;
