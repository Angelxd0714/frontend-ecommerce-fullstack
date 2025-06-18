import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@mantine/core/styles.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { createTheme } from "@mantine/core";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import { Notifications } from "@mantine/notifications";
import '@mantine/notifications/styles.css';
const theme = createTheme({
  fontFamily: "Open Sans, sans-serif",
  primaryColor: "cyan",
});
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <MantineProvider theme={theme}>
    
        <Provider store={store}>
         <Notifications/>
          <App />
        </Provider>
      </MantineProvider>
    </BrowserRouter>
  </StrictMode>
);
