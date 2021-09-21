import React, { useEffect, useState } from "react";
import "./App.scss";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import CreateBlog from "./components/CreateBlog";
import CreateBlogCTA from "./components/CreateBlogCTA";
import Dashboard from "./components/Dashboard";
import EditBlog from "./components/EditBlog";
import EditProfile from "./components/EditProfile";
import Error from "./components/Error";
import Feed from "./components/Feed";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import SignUp from "./components/SignUp";
import Tag from "./components/Tag";
import axios from "axios";
import { Switch, Route, useHistory } from "react-router-dom";

const App = () => {
  const baseURL = "https://blogastic.herokuapp.com";
  const history = useHistory();
  const [blogs, setBlogs] = useState([]);
  const [blog, setBlog] = useState({});
  const [tags, setTags] = useState([]);
  const [searchedBlogs, setSearchedBlogs] = useState([]);
  const [profile, setProfile] = useState({});
  const [dashboardBlogs, setDashboardBlogs] = useState([]);
  const [render, setRender] = useState(true)
  useEffect(() => {
    axios
      .get(baseURL + "/blog")
      .then((res) => {
        setBlogs(res.data);
        res.data.map((blog) => {
          return setTags((prev) => [...new Set([...prev, ...blog.tags])]);
        });
      })
      .catch((err) => {
        history.push("/Blogastic/error");
      });

    axios
      .get(baseURL + "/user/profile", {
        headers: {
          "x-access-token": window.localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setProfile(res.data);
      })  
      .catch((err) => {
        history.push("/Blogastic/error");
      });

    axios
      .get(baseURL + "/user/blogs", {
        headers: {
          "x-access-token": window.localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setDashboardBlogs(res.data);
      })
      .catch((err) => {
        history.push("/Blogastic/error");
      });
  }, [history,render]);

  const handleFeedClick = (blogID, isFromDashboard) => {
    axios
      .get(baseURL + "/blog/" + blogID)
      .then((res) => {
        setBlog(res.data);
        history.push("/Blogastic/blog/" + blogID);
      })
      .catch((err) => {
        history.push("/Blogastic/error");
      });
  };

  const handleTagClick = (tagName) => {
    handleSearch(tagName);
  };

  const handleSearch = (tagName) => {
    axios
      .get(baseURL + "/blog/tag/" + tagName)
      .then((res) => {
        setSearchedBlogs(res.data);
      })
      .catch((err) => {
        history.push("/Blogastic/error");
      });
  };

  const handleContactSubmit = (name, mail, message) => {
    axios
      .post(baseURL + "/user/contact", {
        name: name,
        mail: mail,
        message: message,
      })
      .then((res) => {
        history.push("/Blogastic/");
      })
      .catch((err) => {
        history.push("/Blogastic/error");
      });
  };

  const handleLogin = (mail, password) => {
    axios
      .post(baseURL + "/user/login", {
        mail: mail,
        password: password,
      })
      .then((res) => {
        setRender(!render)
        window.localStorage.setItem("token", res.data.token);
        history.push("/Blogastic/");
      })
      .catch((err) => {
        history.push("/Blogastic/error");
      });
  };

  const handleSignup = (userName, mail, password) => {
    axios
      .post(baseURL + "/user/signup", {
        userName: userName,
        mail: mail,
        password: password,
      })
      .then((res) => {
        setRender(!render)
        history.push("/Blogastic/");
      })
      .catch((err) => {
        history.push("/Blogastic/error");
      });
  };

  const handleProfileEditSubmit = (name, bio, image, place) => {
    axios
      .put(
        baseURL + "/user/profile/edit",
        {
          name: name,
          bio: bio,
          image: image,
          place: place,
        },
        {
          headers: {
            "x-access-token": window.localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setRender(!render)
        history.push("/Blogastic/profile");
      })
      .catch((err) => {
        history.push("/Blogastic/error");
      });
  };

  const sendComment = (blogID, commentText) => {
    axios
      .post(
        baseURL + "/blog/" + blogID + "/comment",
        {
          commentText: commentText,
        },
        {
          headers: {
            "x-access-token": window.localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setRender(!render)
        history.push("/Blogastic/");
      })
      .catch((err) => {
        console.log(err)
        history.push("/Blogastic/error");
      });
  };

  const handleFeedRemove = (ID, publicID) => {
    axios
      .delete(baseURL + "/blog/" + ID + "/" + publicID, {
        headers: {
          "x-access-token": window.localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setRender(!render)
        history.push("/Blogastic/dashboard");
      })
      .catch((err) => {
        history.push("/Blogastic/error");
      });
  };

  const handleFeedEdit = (ID) => {
    axios
      .get(baseURL + "/blog/" + ID, {
        headers: {
          "x-access-token": window.localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setBlog(res.data);
        history.push("/Blogastic/blog/" + ID + "/edit");
      })
      .catch((err) => {
        history.push("/Blogastic/error");
      });
  };

  const handleEditSubmit = (ID, title, desc, image, tags) => {
    axios
      .put(
        baseURL + "/blog/edit/" + ID,
        {
          title: title,
          description: desc,
          image: image,
          tags: tags,
        },
        {
          headers: {
            "x-access-token": window.localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setRender(!render)
        history.push("/Blogastic/dashboard");
      })
      .catch((err) => {
        history.push("/Blogastic/error");
      });
  };

  const handleSubmit = (title, description, image, tags) => {
    axios
      .post(
        baseURL + "/blog",
        {
          title: title,
          description: description,
          image: image,
          tags: tags,
        },
        {
          headers: {
            "x-access-token": window.localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setRender(!render)
        history.push("/Blogastic/");
      })
      .catch((err) => {
        history.push("/Blogastic/error");
      });
  };

  return (
    <section>
      <main>
        <Navbar search={handleSearch} name={profile.userName} />
        <Switch>
          <Route path="/Blogastic/blog/search">
            <div className="feedHeader" style={{marginLeft:"50px"}}>
              <h3>Feed</h3>
            </div>
            {searchedBlogs.map((blog) => {
              return (
                <Feed
                  blog={blog}
                  handleFeedClick={handleFeedClick}
                  handleTagClick={handleTagClick}
                  dashboard={false}
                  key={blog._id}
                  width="90%"
                />
              );
            })}
            {
              searchedBlogs.length === 0 && <p style={{textAlign:"center"}}>No blogs found with that tag.</p>
            }
          </Route>
          <Route path="/Blogastic/blog/tags">
            <div className="feedHeader">
              <h3>Feed</h3>
            </div>
            {searchedBlogs.map((blog) => {
              return (
                <Feed
                  blog={blog}
                  handleFeedClick={handleFeedClick}
                  handleTagClick={handleTagClick}
                  dashboard={false}
                  key={blog._id}
                />
              );
            })}
          </Route>
          <Route path="/Blogastic/blog/create">
            <CreateBlog handleSubmit={handleSubmit} isLoggedIn={window.localStorage.getItem('token')} />
          </Route>
          <Route path="/Blogastic/blog/:id/edit">
            <EditBlog blog={blog} handleEditSubmit={handleEditSubmit} />
          </Route>
          <Route path="/Blogastic/blog/:id">
            <Blog blog={blog} sendComment={sendComment} />
          </Route>
          <Route path="/Blogastic/profile/edit">
            <EditProfile
              profile={profile}
              handleProfileEditSubmit={handleProfileEditSubmit}
            />
          </Route>
          <Route path="/Blogastic/error">
            <Error />
          </Route>
          <Route path="/Blogastic/dashboard">
            <Dashboard
              data={dashboardBlogs}
              handleFeedClick={handleFeedClick}
              handleTagClick={handleTagClick}
              handleFeedRemove={handleFeedRemove}
              handleFeedEdit={handleFeedEdit}
            />
          </Route>
          <Route path="/Blogastic/profile">
            <Profile profile={profile} />
          </Route>
          <Route path="/Blogastic/contact">
            <Contact handleContactSubmit={handleContactSubmit} />
          </Route>
          <Route path="/Blogastic/login">
            <Login handleLogin={handleLogin} />
          </Route>
          <Route path="/Blogastic/signup">
            <SignUp handleSignup={handleSignup} />
          </Route>
          <Route path="/Blogastic/">
            <div id="splitter">
              <div className="split">
                <Tag tags={tags} handleTagClick={handleTagClick} />
              </div>
              <div className="split-2">
                <div className="feedHeader">
                  <h3>Feed</h3>
                </div>
                {blogs.map((blog) => {
                  return (
                    <Feed
                      blog={blog}
                      handleFeedClick={handleFeedClick}
                      handleTagClick={handleTagClick}
                      dashboard={false}
                      key={blog._id}
                      width="100%"
                    />
                  );
                })}
                {
              blogs.length === 0 && <p style={{textAlign:"center"}}>No blogs found.</p>
            }
              </div>
              <div className="split-3">
                <CreateBlogCTA />
              </div>
            </div>
          </Route>
        </Switch>
        <Footer />
      </main>
    </section>
  );
};

export default App;
