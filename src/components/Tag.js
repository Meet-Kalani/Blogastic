import React from "react";
import { Link } from "react-router-dom";

const Tag = (props) => {
  const handleTagClick = (e) => {
    props.handleTagClick(e.target.innerText.toString().slice(1,-1))
  }

  return (
    <section id="tagsSection">
      <h3>Popular Tags</h3>
      {
        props.tags.map((tag) => {
          return <Link onClick={handleTagClick} key={tag} to="/Blogastic/blog/tags">#{tag}<br /></Link>
        })
      }
    </section>
  );
};

export default Tag;
