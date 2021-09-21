import React from "react";
import Feed from "./Feed";
import { Link,useHistory } from "react-router-dom";

const Dashboard = (props) => {
  const history = useHistory()
  let load = true;

  if(!props.data){
    history.push('/Blogastic/')
    load = false;
  }
  
  if(props.data.name === "JsonWebTokenError"){
    history.push('/Blogastic/login');
    load = false;
  }

  return (
    <section id="dashboard">
      <div className="feedHeader">
        <h3>My Blogs</h3>
        <Link to="/Blogastic/blog/create">Create New Blog</Link>
      </div>
      {load && props.data.map((blog) => {
        return (
          <Feed
            blog={blog}
            key={blog._id}
            handleFeedClick={props.handleFeedClick}
            handleFeedEdit={props.handleFeedEdit}
            handleFeedRemove={props.handleFeedRemove}
            handleTagClick={props.handleTagClick}
            dashboard={true}
          />
        );
      })}
    </section>
  );
};

export default Dashboard;
