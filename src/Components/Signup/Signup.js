import React, { useState, useContext } from "react";
import Logo from "../../olx-logo.png";
import "./Signup.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { FirebaseContext } from "../../store/FirebaseContext";
import Loading from "../loading/Loading";

export default function Signup() {
  let [userName, setUserName] = useState("");
  let [email, setEmail] = useState("");
  let [phone, setPhone] = useState("");
  let [password, setPassword] = useState("");
  let [loading, setLoading] = useState(false);
  const history = useHistory();

  const { firebase } = useContext(FirebaseContext);
  // handleSubmit
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        alert(error.message)
        window.location.reload()
      })
      .then((result) => {
        result.user.updateProfile({ displayName: userName }).then(() => {
          firebase.firestore().collection("users").add({
            id: result.user.uid,
            username: userName,
            phone: phone,
          });
        });
      })

      .then(() => {
        history.push("/login");
      });
  };

  return (
    <>
      <div>
        <div className="signupParentDiv">
          <img width="200px" height="200px" src={Logo} alt="logo"></img>
          {loading && (
            <Loading type="bars" color="green" height={"50%"} width={"50%"} />
          )}
          <form onSubmit={handleSubmit}>
            <label htmlFor="fname">Username</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="name"
              value={userName}
              required
              onChange={(e) => setUserName(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Email</label>
            <br />
            <input
              className="input"
              type="email"
              id="email"
              name="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <label htmlFor="lname">Phone</label>
            <br />
            <input
              className="input"
              type="number"
              id="lname"
              name="phone"
              required
              placeholder="00000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <br />
            <label htmlFor="lname">Password</label>
            <br />
            <input
              className="input"
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <br />
            <button type="submit">Signup</button>
          </form>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </>
  );
}
