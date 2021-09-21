import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = (props) => {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [mailErr, setMailErr] = useState(false);
    const [passwordErr, setPasswordErr] = useState(false);
    const [userNameErr, setUserNameErr] = useState(false);
    const [loadSubmit, setLoadSubmit] = useState(true)

    const handleSignupBtnClick = (e) => {
        e.preventDefault();
        setLoadSubmit(false)
        if (mail !== "" && password !== "" && userName !== "") {
            setMailErr(false);
            setPasswordErr(false);
            setUserNameErr(false);
            props.handleSignup(userName, mail, password);
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
            if (userName === "") {
                setUserNameErr(true);
            } else {
                setUserNameErr(false);
            }
        }
    }

    return (
        <section id="signup">
            <div className="signupHeader">
                <h3>Signup</h3>
            </div>
            <form className="signupForm">
                <div>
                    <label>Name</label><br />
                    <input type="text" name="name" value={userName} onChange={ (e)=> setUserName(e.target.value)}/>
                    {userNameErr ? <span>This field cannot be empty.</span> : ""}
                </div>
                <div>
                    <label>Mail</label><br />
                    <input type="text" name="mail" value={mail} onChange={ (e)=> setMail(e.target.value)} />
                    {mailErr ? <span>This field cannot be empty.</span> : ""}
                </div>
                <div>
                    <label>Password</label><br />
                    <input type="password" name="password" value={password} onChange={ (e)=> setPassword(e.target.value)} />
                    {passwordErr ? <span>This field cannot be empty.</span> : ""}
                </div>
                <div className="d-flex">
                    {loadSubmit ? <button onClick={handleSignupBtnClick}>Submit</button> : <center><p>Hold on! Redirecting...</p></center>}
                    <Link to="/Blogastic/login">Already a Member?</Link>
                </div>
            </form>
        </section>
    );
};

export default SignUp;
