import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom"; // Correct import from react-router-dom
import store, { history } from "./store"; // Assuming history is exported from store.js
import MyRouter from "./routes/Router.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/custom.scss";

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>  {/* Using Router with the correct history prop */}
        <MyRouter />
      </Router>
    </Provider>
  );
};

export default App;
