import { initializeNetwork } from "@/common/network/init";
import { NetworkMessages } from "@/common/network/messages";
import { NetworkSide } from "@/common/network/sides";
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./components/theme-provider";
import {
  RouterProvider,
  createMemoryRouter,
} from "react-router-dom";
import { App, Dashboard } from "./pages";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
  }
];

const router = createMemoryRouter(routes, {
  initialEntries: ["/", "/dashboard"],
  initialIndex: 0,
});

async function bootstrap() {
  initializeNetwork(NetworkSide.UI);

  NetworkMessages.HELLO_PLUGIN.send({ text: "Hey there, Figma!" });

  // const App = (await import("./app")).default;

  const rootElement = document.getElementById("root") as HTMLElement;
  const root = ReactDOM.createRoot(rootElement);


  root.render(
    <React.StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.StrictMode>
  );
}

bootstrap();