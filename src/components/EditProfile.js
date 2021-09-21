import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const EditProfile = (props) => {
    const [name, setName] = useState("");
    const [mail, setMail] = useState("");
    const [bio, setBio] = useState("");
    const [place, setPlace] = useState("");
    const [image, setImage] = useState("");
    const [nameErr, setNameErr] = useState(false);
    const [mailErr, setMailErr] = useState(false);
    const [bioErr, setBioErr] = useState(false);
    const [placeErr, setPlaceErr] = useState(false);
    const [imageErr, setImageErr] = useState(false);
    const [loadSubmit, setLoadSubmit] = useState(true)
    const history = useHistory();
    let load = true;

    useEffect(() => {
        setName(props.profile.userName)
        setMail(props.profile.mail)
    }, [props])

    if(!props.profile){
        history.push('/Blogastic/');
        load = false;
    }

    if(props.profile.name === "JsonWebTokenError"){
        history.push('/Blogastic/login');
        load = false;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoadSubmit(false)
        if (name !== "" && mail !== "" && bio !== "" && place !== "" && image.name !== undefined) {
            setNameErr(false)
            setMailErr(false)
            setBioErr(false)
            setPlaceErr(false)
            setImageErr(false)
            const formData = new FormData();
            formData.append("file", image);
            formData.append("upload_preset", "cloudinary_images");
            axios
                .post("https://api.cloudinary.com/v1_1/meetkalani/image/upload", formData)
                .then((response) => {
                    props.handleProfileEditSubmit(name, bio, { url: response.data.url, publicID: response.data.public_id }, place)
                });
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
            if (place === "") {
                setPlaceErr(true)
            } else {
                setPlaceErr(false)
            }
            if (bio === "") {
                setBioErr(true)
            } else {
                setBioErr(false)
            }
            if (image === "") {
                setImageErr(true)
            } else {
                setImageErr(false)
            }
        }
    };

    return (
        <section id="editProfile">
            <h3>Edit Profile</h3>
            {load && <form>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {nameErr ? <span>This field cannot be empty.</span> : ""}
                </div>
                <div>
                    <label htmlFor="bio">Bio</label>
                    <br />
                    <textarea
                        name="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    ></textarea>
                    {bioErr ? <span>This field cannot be empty.</span> : ""}
                </div>
                <div>
                    <label htmlFor="image">Profile Picture</label>
                    <input
                        type="file"
                        name="image"
                        className="imageInput"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    {imageErr ? <span>This field cannot be empty.</span> : ""}
                </div>
                <div>
                    <label htmlFor="place">Place</label>
                    <input
                        type="text"
                        name="place"
                        value={place}
                        onChange={(e) => setPlace(e.target.value)}
                    />
                    {placeErr ? <span>This field cannot be empty.</span> : ""}
                </div>
                <div>
                    <label htmlFor="mail">Mail</label>
                    <input
                        readOnly
                        type="text"
                        name="mail"
                        value={mail}
                    />
                    {mailErr ? <span>This field cannot be empty.</span> : ""}
                </div>
                <div>
                    {loadSubmit ? <button onClick={handleSubmit}>Submit</button> : <center><p>Hold on! We will redirect you to dashboard as soon as we are done.</p></center>}
                </div>
            </form>}
        </section>
    )

}

export default EditProfile
