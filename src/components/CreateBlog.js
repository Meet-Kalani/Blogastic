import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const CreateBlog = (props) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState({});
  const [tags, setTags] = useState([]);
  const [titleErr, setTitleErr] = useState(false);
  const [descErr, setDescErr] = useState(false);
  const [imageErr, setImageErr] = useState(false);
  const [tagsErr, setTagsErr] = useState(false);
  const [loadSubmit, setLoadSubmit] = useState(true);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadSubmit(false)
    if (title !== "" && desc !== "" &&  tags.length !== 0 && image.name !== undefined) {
      setTitleErr(false)
      setDescErr(false)
      setImageErr(false)
      setTagsErr(false)
      console.log('in')
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "cloudinary_images");
      axios
        .post("https://api.cloudinary.com/v1_1/meetkalani/image/upload", formData)
        .then((response) => {
          console.log(response.data);
          props.handleSubmit(title, desc, { url: response.data.url, publicID: response.data.public_id }, tags)
        })
        .catch((err) => {
          console.log(err)
        })
        ;
    } else {
      setLoadSubmit(true)
      if (title === "") {
        setTitleErr(true)
      } else {
        setTitleErr(false)
      }

      if (desc === "") {
        setDescErr(true)
      } else {
        setDescErr(false)
      }

      if (Object.keys(image).length === 0 && image.constructor === Object) {
        setImageErr(true)
      } else {
        setImageErr(false)
      }

      if (tags.length === 0) {
        setTagsErr(true)
      } else {
        setTagsErr(false)
      }
    }
  };

  if(props.isLoggedIn === null){
    history.push('/Blogastic/login');
  }

  return (
    <section id="createBlog">
      <h3>Create Blog</h3>
      <form>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {titleErr ? <span>This field cannot be empty.</span> : ""}
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <br />
          <textarea
            name="description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          {descErr ? <span>This field cannot be empty.</span> : ""}
        </div>
        <div>
          <label htmlFor="image">Image</label>
          <input
            type="file"
            name="image"
            className="imageInput"
            onChange={(e) => setImage(e.target.files[0])}
          />
          {imageErr ? <span>This field cannot be empty.</span> : ""}
        </div>
        <div>
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            name="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <span>NOTE: give space(whitespace) to create individual tags(i.e this is tag => this,is,tag)</span><br />
          {tagsErr ? <span>This field cannot be empty.</span> : ""}
        </div>
        <div>
          {loadSubmit ? <button onClick={handleSubmit}>Submit</button> : <center><p>Hold on! We will redirect you to dashboard as soon as we are done.</p></center>}
        </div>
      </form>
    </section>
  );
};

export default CreateBlog;
