import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { FirebaseContext } from "./store/FirebaseContext";
import firebase from "./firebase/config";
import ContextAuth from "./store/AuthContext";
import ContextAllPost from "./store/AllPostContext";
import ContextPost from "./store/PostContext";

ReactDOM.render(
  <FirebaseContext.Provider value={{ firebase }}>
    <ContextAllPost>
      <ContextAuth>
        <ContextPost>
          <App />
        </ContextPost>
      </ContextAuth>
    </ContextAllPost>
  </FirebaseContext.Provider>,
  document.getElementById("root")
);
