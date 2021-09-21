import React, { useState } from "react";
import showdown from "showdown";
import Parser from "html-react-parser";
import send from "../imgs/send.png";
import user from "../imgs/name.png";
import { useHistory } from "react-router-dom";

const Blog = (props) => {
  const [comment, setComment] = useState("");
  const converter = new showdown.Converter();
  const history = useHistory();
  let load = true;

  if (props.blog.image === undefined) {
    history.push('/Blogastic/');
    load = false;
  }

  const sendComment = () => {
    props.sendComment(props.blog.blogID, comment);
  };
  
  return (
    <section id="blog">
      {load && 
      <div>
      <img src={props.blog.image.url} alt={props.blog.image} />
      <div className="blogBy">
        <p>{props.blog.owner}</p>
        <p>{props.blog.date.toString().slice(0, 10)}</p>
      </div>
      <div className="blogData">
        <div><h2>{props.blog.title}</h2></div>
        {Parser(converter.makeHtml(props.blog.description))}
      </div>
      <hr />
      <div className="blogComment">
        <h3>Comments</h3>
        <div className="sendComment">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button onClick={sendComment}>
            <img src={send} alt="send" />
          </button>
        </div>
          {props.blog.commentData
            && props.blog.commentData[0].map((comment) => {
                return (
                  <div className="comment" key={comment._id}>
                  <div className="d-flex">
                      <img src={user} alt="user" />
                      <p>{comment.userName}</p>
                    </div>
                    <div><p>{comment.commentText}</p></div>
                  </div>
                );
              })
            }
      </div>
    </div> 
    }
    </section>
  );
};

export default Blog;
