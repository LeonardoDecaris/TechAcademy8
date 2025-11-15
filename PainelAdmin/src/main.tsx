import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import WebRoutes from "./routes/Routes";
import { Toaster } from "./components/ui/sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster position="top-center" />
    <WebRoutes />
  </React.StrictMode>
);
