import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  ChakraProvider,
  extendTheme,
  localStorageManager,
} from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/skyblue";
import "leaflet/dist/leaflet.css";
import "./style.css";

const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" ? "gray.800" : "white",
        color: props.colorMode === "dark" ? "white" : "black",
      },
    }),
  },
});

// ADD CHAKRA PROVİDER AS PROPS

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider colorModeManager={localStorageManager} theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);
