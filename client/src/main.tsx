import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MobileProvider } from "@contexts/MobileContext.tsx";
import { UserContextProvider } from "@contexts/userContext/UserContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MobileProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </MobileProvider>
  </React.StrictMode>
);
