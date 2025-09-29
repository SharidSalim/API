import { initThemeMode } from "flowbite-react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { createRoot } from "react-dom/client";
import { ThemeInit } from "../.flowbite-react/init";
import App from "./App.tsx";
import "./index.css";
import LoginPage from "./pages/LoginPage.tsx";
import OtpPage from "./pages/OtpPage.tsx";
import WelcomePage from "./pages/WelcomePage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/otp",
    element: <OtpPage />,
  },
  {
    path: "/welcome",
    element: <WelcomePage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <>
    <ThemeInit />
    <RouterProvider router={router} />
  </>,
);

initThemeMode();
