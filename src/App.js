import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import "./App.css";
import { auth } from "./firebase-config";
import { CSSTransition } from 'react-transition-group';

function App() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);
  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
      alert("email or password is incorrect");
    }
  };
  const clearinput = () => {
    setLoginEmail("");
    setLoginPassword("");
  };
  const logoutmain = () => {
    logout();
    clearinput();
  };
  const logout = async () => {
    await signOut(auth);
  };
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="App">
      
      <div className="row">
        <div className="col">
          <h3> Register Here </h3>
          <label>Email address:</label>
          <input
            placeholder="Email"
            className="form-control"
            onChange={(event) => {
              setRegisterEmail(event.target.value);
            }}
          />
          <label>Password:</label>
          <input
            className="form-control"
            type={passwordShown ? "text" : "password"}
            placeholder="Password"
            onChange={(event) => {
              setRegisterPassword(event.target.value);
            }}
          />

          <button onClick={register} className="btn btn-success">
            {" "}
            Create User
          </button>
        </div>

        <div className="col">
          <h3> Login </h3>
          <label>Registered Email:</label>
          <input
            placeholder="Email"
            className="form-control"
            onChange={(event) => {
              setLoginEmail(event.target.value);
            }}
          />
          <label>Password:</label>
          <input
            placeholder="Password"
            className="form-control"
            type={passwordShown ? "text" : "password"}
            onChange={(event) => {
              setLoginPassword(event.target.value);
            }}
          />

          <button onClick={login} className="btn btn-primary">
            {" "}
            Login
          </button>
        </div>
      </div>
      
      <input
        type="checkbox"
        className="btn-check"
        id="btn-check-outlined"
        autocomplete="off"
        onChange={togglePassword}
      />
      <label className="btn btn-outline-primary" for="btn-check-outlined">
        Show/Hide Password
      </label>
      <br></br>

      <h4> User Logged In: </h4>
      {user ? user.email : "Not Logged In"}

      <button onClick={logoutmain} className="btn btn-danger">
        {" "}
        Sign Out{" "}
      </button>
    </div>
  );
}

export default App;
