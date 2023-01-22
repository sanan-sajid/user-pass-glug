import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import "./App.css";
import { auth } from "./firebase-config";

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
      alert(error.message);
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
      setError("Successfully Logined");
    } catch (error) {
      console.log(error.message);
      setError("Email or Password is incorrect");
    }
  };
  const clearinput = () => {
    setLoginEmail("");
    setLoginPassword("");
  };
  const logoutmain = () => {
    logout();
    clearinput();
    setError("");
  };
  const logout = async () => {
    await signOut(auth);
  };
  const [passwordShown, setPasswordShown] = useState(false);
  const [error, setError] = useState(null);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="App">
      <nav class="navbar navbar-light bg-dark">
        <a class="navbar-brand" href="#home">
          <img
            src="https://miro.medium.com/max/1400/1*0k_-eyWyc_fQztDqck39lQ.png"
            width="40"
            height="40"
            class="d-inline-block align-top"
            alt=""
          />
          <span className="test">User Password</span>
        </a>
      </nav>
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
            placeholder="Password (Atleast 6 char long)"
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
            value={loginEmail}
            className="form-control"
            onChange={(event) => {
              setLoginEmail(event.target.value);
            }}
          />
          <label>Password:</label>
          <input
            placeholder="Password"
            value={loginPassword}
            className="form-control"
            type={passwordShown ? "text" : "password"}
            onChange={(event) => {
              setLoginPassword(event.target.value);
            }}
          />
          {error && <p>{error} </p>}
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
