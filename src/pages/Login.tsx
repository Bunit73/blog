import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, useContext } from "react";
import { auth } from "../config/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { BaseFunctionComponent } from "../common/BaseComponent";
import { AuthContext } from "../contexts/AuthContext";

const Login: BaseFunctionComponent<{}> = (props) => {
  const user = useContext(AuthContext);

  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = async () => {
    await auth.signOut();
  };

  return (
    <div
      className="border p-3 bg-light mx-auto"
      style={{ maxWidth: 400, marginTop: 60 }}
    >
      {!user ? (
        <>
          <h1>Login</h1>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <br />
          <button className="btn btn-primary" onClick={handleLogin}>
            Login
          </button>
        </>
      ) : (
        <button className="btn btn-primary" onClick={signOut}>
          Logout
        </button>
      )}
    </div>
  );
};

export { Login };
