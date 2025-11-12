import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";

import "./index.css";
import WebRoutes from "./routes/Routes";
import { Toaster } from "./components/ui/sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster position="top-center" />
    <AuthProvider>
        <WebRoutes />
    </AuthProvider>
  </React.StrictMode>
);
