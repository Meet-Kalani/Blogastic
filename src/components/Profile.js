import React from "react";
import { useHistory } from "react-router-dom";
import cake from "../imgs/cake.png";
import mail from "../imgs/mail.png";
import place from "../imgs/place.png";
import bio from "../imgs/bio.png";
import name from "../imgs/name.png";

const Profile = (props) => {
  const history = useHistory();
  let load = true;
  
  if (props.profile.profilePicture === undefined) {
    history.push("/Blogastic/profile/edit");
    load = false;
  }

  return (
    <section id="profile">
      <div className="imgContainer">
        {
          load && <img src={props.profile.profilePicture.url} alt={props.profile.userName} />
        }
      </div>
      {load && <div className="info">
        <div className="d-flex"><img src={name} alt="name" /><h3>{props.profile.userName}</h3></div>
        <div className="d-flex"><img src={bio} alt="bio" /><p>{props.profile.bio}</p></div>
        <div className="d-flex"><img src={place} alt="place" /><p>{props.profile.place}</p></div>
        <div className="d-flex"><img src={mail} alt="mail" /><p>{props.profile.mail}</p></div>
        <div className="d-flex">
          <img src={cake} alt="Join Date" /><p> Joined On {props.profile.joinDate.toString().slice(0, 10)}
          </p></div>
        <button onClick={() => history.push("/Blogastic/profile/edit")}>Edit</button>
      </div>}
    </section>
  );
};

export default Profile;
