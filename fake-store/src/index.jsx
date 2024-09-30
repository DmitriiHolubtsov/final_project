import React from "react";
import ReactDOM from "react-dom/client"; // Import from 'react-dom/client' instead of 'react-dom'
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import App from "./App";
import "./index.scss";

// Create the root element
const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement); // Use createRoot instead of ReactDOM.render

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
