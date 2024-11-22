import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter} from "react-router-dom"; 
import store, { history } from "./store";
import MyRouter from "./routes/Router.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/custom.scss";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter history={history}>  {/* Using Router with the correct history prop */}
        <MyRouter />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
