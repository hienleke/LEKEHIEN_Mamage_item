import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store/store"; // Assuming you have a Redux store set up in a separate file
import App from "./App";

ReactDOM.render(
     <Provider store={store}>
          <React.StrictMode>
               <App />
          </React.StrictMode>
     </Provider>,
     document.getElementById("root")
);
