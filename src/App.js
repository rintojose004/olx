import React,{useEffect,useContext} from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login"
import Create from "./Pages/Create"
import ViewPost from "./Pages/ViewPost"
import { FirebaseContext } from "./store/FirebaseContext";
import { AuthContext } from "./store/AuthContext";
import ViewMore from "./Pages/ViewMore";

function App() {
  const {firebase} = useContext(FirebaseContext)
  const {setUser} = useContext(AuthContext)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user)=>{
      setUser(user)
    })
  }, [])
  
  return (
    <Router>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/create">
        <Create />
      </Route>
      <Route path="/view">
        <ViewPost />
      </Route>
      <Route path="/viewmore">
        <ViewMore />
      </Route>
    </Router>
  );
}

export default App;
