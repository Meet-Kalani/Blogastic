import React, { useState } from "react";

const Contact = (props) => {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [message, setMessage] = useState("");
  const [nameErr, setNameErr] = useState(false);
  const [mailErr, setMailErr] = useState(false);
  const [messageErr, setMessageErr] = useState(false);
  const [loadSubmit,setLoadSubmit] = useState(true)
    
    const handleContactSubmit = (e) => {
      e.preventDefault();
      setLoadSubmit(false)
      if (name !== "" && mail !== "" && message !== "") {
        setNameErr(false);
        setMailErr(false);
        setMessageErr(false);
        props.handleContactSubmit(name, mail,message);
      } else {
        setLoadSubmit(true)
        if (name === "") {
          setNameErr(true)
        } else {
          setNameErr(false)
        }
        if (mail === "") {
          setMailErr(true)
        } else {
          setMailErr(false)
        }
        if (message === "") {
          setMessageErr(true)
        } else {
          setMessageErr(false)
        }
      }
    }

  return (
    <section id="contact">
      <h3>Contact</h3>
      <form>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {nameErr?<span>This field cannot be empty.</span>:""}
        </div>
        <div>
          <label htmlFor="mail">Mail</label>
          <input
            type="email"
            name="mail"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
          {mailErr?<span>This field cannot be empty.</span>:""}
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <br />
          <textarea
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          {messageErr?<span>This field cannot be empty.</span>:""}
        </div>
        <div>
          {loadSubmit ? <button onClick={handleContactSubmit}>Submit</button> : <center><p>Hold on! We will redirect you to dashboard as soon as we are done.</p></center>}
        </div>
      </form>
    </section>
  );
};

export default Contact;
