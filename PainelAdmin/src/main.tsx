import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";

import "./index.css";
import WebRoutes from "./routes/Routes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
        <WebRoutes />
    </AuthProvider>
  </React.StrictMode>
);
