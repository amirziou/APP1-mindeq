import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes";
import "bootstrap/dist/css/bootstrap.css";

const customTheme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: "gray.200", // Set your desired background color here
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
