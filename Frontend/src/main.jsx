import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";
import { enUS } from "@clerk/localizations";
import SmoothScrollProvider from "./providers/SmoothScrollProvider.jsx";

const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const localization = {
  ...enUS,
  signUp: {
    start: {
      title: "Ride the Wave — Join Boat 2.0 🎧",
    },
  },
  signIn: {
    start: {
      title: "Welcome Back to Boat 2.0 🎶",
    },
  },
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkKey} localization={localization}>
      <ClerkLoaded>
        <BrowserRouter>
          <SmoothScrollProvider>
            <App />
          </SmoothScrollProvider>
        </BrowserRouter>
      </ClerkLoaded>
    </ClerkProvider>
  </React.StrictMode>
);
