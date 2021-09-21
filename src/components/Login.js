import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = (props) => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('')
  const [mailErr, setMailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [loadSubmit, setLoadSubmit] = useState(true)

  const handleLoginBtnClick = (e) => {
    e.preventDefault();
    setLoadSubmit(false)
    if (mail !== "" && password !== "") {
      setMailErr(false);
      setPasswordErr(false);
      props.handleLogin(mail, password);
    } else {
      setLoadSubmit(true)
      if (mail === "") {
        setMailErr(true);
      } else {
        setMailErr(false);
      }
      if (password === "") {
        setPasswordErr(true);
      } else{
        setPasswordErr(false);
      }
    }
  }

  return (
    <section id="login">
      <div className="loginHeader">
        <h3>Login</h3>
      </div>
      <form className="loginForm">
        <div>
          <label>Mail</label><br />
          <input type="text" name="mail" value={mail} onChange={(e) => setMail(e.target.value)} />
          {mailErr ? <span>This field cannot be empty.</span> : ""}
        </div>
        <div>
          <label>Password</label><br />
          <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {passwordErr ? <span>This field cannot be empty.</span> : ""}
        </div>
        <div className="d-flex">
          {loadSubmit ? <button onClick={handleLoginBtnClick}>Submit</button> : <center><p>Hold on! Redirecting...</p></center>}
          <Link to="/Blogastic/signup">New Member?</Link>
        </div>
      </form>
    </section>
  );
};

export default Login;
