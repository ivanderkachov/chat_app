import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { logIn } from "../../redux/reducers/chat";

import './login.css'

const Login = () => {
  const dispatch = useDispatch()
  const [toggle, setToggle] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    isReg: false
  })

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  const handleLoginButtonClick = () => {
    dispatch(logIn(form))
    setForm({ ...form, name: "", email: "", password: ""})
    setToggle(false)
    setForm({ name: "", email: "", password: "", isReg: false });
  }
  const handleTypeButtonClick = () => {
    setToggle(!toggle);
    setForm({ ...form, isReg: !form.isReg });

  }

  return (
    <div className="login">
      <div className="loginForm">
        <div className="loginFormWrapper">
          <h1>Welcome</h1>
          <div className="loginFormInputField">
            <input type="text" placeholder="Name" name="name" value={form.name} onChange={handleInputChange}></input>
            <input type="email" placeholder="Email" name="email" value={form.email} onChange={handleInputChange}></input>
            <input type="password" placeholder="Password" name="password" value={form.password} onChange={handleInputChange}></input>
          </div>
          {!toggle ? (
            <div className="loginFormButtonField">
              <Link onClick={handleLoginButtonClick} to={"/Chat"}>
                <button type="button">Sign In</button>
              </Link>
              <Link className="loginFormLink" onClick={handleTypeButtonClick} to={'/'}>
                Join
              </Link>
            </div>
          ) : (
            <div className="loginFormButtonField">
              <Link onClick={handleLoginButtonClick} to={"/"}>
                <button type="button">Join</button>
              </Link>
              <Link className="loginFormLink" onClick={handleTypeButtonClick} to={'/'}>
                Sign in
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login