import React, { useState } from "react";
import "./signup.css";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [isRedirecting, setIsRedirecting] = useState(false);
  const navigate = useNavigate();

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  function handleRegisterSubmit(event) {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      registerEmail: registerEmail,
      registerPassword: registerPassword,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:5000/register", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        if (result.message === "Registration successful") {
          navigate("/");
        }
      })
      .catch((error) => console.log("error", error));
  }

  function handleLoginSubmit(event) {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      loginEmail: loginEmail,
      loginPassword: loginPassword,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:5000/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.message);
        if (result.message === "Login successful") {
          navigate("/");
        }
      })
      .catch((error) => console.log("error", error));
  }

  return (
    <div className="wrapper">
      <div className="card-switch">
        <label className="switch">
          <input
            type="checkbox"
            className="toggle"
            checked={isSignUp}
            onChange={toggleSignUp}
          />
          <span className="slider"></span>
          <span className="card-side"></span>
          <div className={`flip-card__inner ${isSignUp ? "flipped" : ""}`}>
            <div className="flip-card__front">
              <div className="title">Log in</div>
              <form className="flip-card__form" onSubmit={handleLoginSubmit}>
                <input
                  className="flip-card__input"
                  name="loginEmail"
                  placeholder="Email"
                  type="email"
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
                <input
                  className="flip-card__input"
                  name="loginPassword"
                  placeholder="Password"
                  type="password"
                  onChange={(e) => setLoginPassword(e.target.value)}
                />

                <button className="flip-card__btn">Let's go</button>
              </form>
            </div>
            <div className="flip-card__back">
              <div className="title">Sign up</div>
              <form
                className="flip-card__form"
                action=""
                onSubmit={handleRegisterSubmit}
              >
                <input
                  className="flip-card__input"
                  placeholder="Name"
                  type="text"
                />
                <input
                  className="flip-card__input"
                  name="registerEmail"
                  placeholder="Email"
                  type="email"
                  onChange={(e) => setRegisterEmail(e.target.value)}
                />
                <input
                  className="flip-card__input"
                  name="registerPassword"
                  placeholder="Password"
                  type="password"
                  onChange={(e) => setRegisterPassword(e.target.value)}
                />
                <button className="flip-card__btn">Confirm!</button>
              </form>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}

export default SignUp;
