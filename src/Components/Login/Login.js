import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Logo from "../../olx-logo.png";
import { FirebaseContext } from "../../store/FirebaseContext";
import Loading from "../loading/Loading";
import "./Login.css";

function Login() {
  const history = useHistory();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loading, setLoading] = useState(false);

  const { firebase } = useContext(FirebaseContext);

  // handleSubmit
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        alert(error.message);
        window.location.reload()
      });
  };
  return (
    <>
      <div>
        <div className="loginParentDiv">
          <img width="200px" height="200px" src={Logo} alt="logo"></img>
          {loading && <Loading type="spin" color="green" height={"50%"} width={"50%"} />}
          <form onSubmit={handleSubmit}>
            <label htmlFor="fname">Email</label>
            <br />
            <input
              className="input"
              type="email"
              id="fname"
              placeholder="email"
              name="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <label htmlFor="lname">Password</label>
            <br />
            <input
              className="input"
              type="password"
              id="lname"
              name="password"
              placeholder="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <br />
            <button>Login</button>
          </form>
          <Link to="/signup">Signup</Link>
        </div>
      </div>
    </>
  );
}

export default Login;
