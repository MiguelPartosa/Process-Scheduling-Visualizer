import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.tsx";
import Calculations from "./Calculation.tsx";

import { Router } from "../electron/lib/electron-router-dom";
import { Route } from "react-router-dom";

import GeneralContextProvider from "./store/globalStateProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GeneralContextProvider>
      <Router
        main={
          <>
            <Route path="/" element={<App />} />
            <Route path="/Calculations" element={<Calculations />} />
          </>
        }
      />
    </GeneralContextProvider>
  </StrictMode>
);
