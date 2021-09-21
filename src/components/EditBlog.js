import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const EditBlog = (props) => {
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
  let load = true;

  let tagStr = '';
  props.blog.tags.map(tag => {
    return tagStr=tagStr+tag+' '
  })

  useEffect(() => {
    setTitle(props.blog.title)
    setDesc(props.blog.description)
    setTags(tagStr)
  }, [props,tagStr])

  if (!props.blog) {
    history.push('/Blogastic/');
    load = false;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadSubmit(false)
    if (title !== "" && desc !== "" &&  tags.length !== 0 && image.name !== undefined) {
      setTitleErr(false)
      setDescErr(false)
      setImageErr(false)
      setTagsErr(false)
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "cloudinary_images");
      axios
        .post("https://api.cloudinary.com/v1_1/meetkalani/image/upload", formData)
        .then((response) => {
          console.log(response.data.url);
          props.handleEditSubmit(props.blog.blogID , title, desc, { url: response.data.url, publicID: response.data.public_id }, tags)
        });
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

  return (
    <section id="editBlog">
      <h3>Edit Blog</h3>
      {load && <form>
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
      </form>}
    </section>
  )
}

export default EditBlog
