import React from 'react';
import {Link,useHistory} from 'react-router-dom';

const Feed = (props) => {
    const history = useHistory();
    let load = true;
    const handleFeedClick = (e) => {
        if(props.dashboard){
            props.handleFeedClick(props.blog._id,true)
        } else{
            props.handleFeedClick(props.blog._id,false)
        }
    }
    
    if (!props.blog) {
        history.push('/Blogastic/');
        load = false;
    }

    const handleFeedEdit =(e)=>{
        props.handleFeedEdit(props.blog._id)
    }

    const handleFeedRemove = (e)=>{
        props.handleFeedRemove(props.blog._id,props.blog.image.publicID)
    }

    const handleTagClick = (e) => {
        props.handleTagClick(e.target.innerText.toString().slice(1,e.target.innerText.toString().length))
    }
    
    return (
        <section id="feedSection" style={{width:props.width}}>
            {load && <div onClick={handleFeedClick}>
                <div className="d-flex">
                    <div className="feedBy">
                        <img src={props.blog.image.url} alt={props.blog.title} />
                        <p>{props.blog.owner}</p>
                    </div>
                    <div>
                        <p>{props.blog.date.toString().slice(0, 10)}</p>
                    </div>
                </div>
                <div className="feedTitle">
                    <p>{props.blog.title}</p>
                </div>
                <div className="feedTags">
                    {
                        props.blog.tags.map(tag => {
                            return <Link key={tag} to="/Blogastic/blog/tags" onClick={handleTagClick} className="tag"> #{tag} </Link>
                        })
                    }
                </div>
            </div>}
            {load && <div className="btn-d-flex">
                {
                    props.dashboard ? <div>
                        <button onClick={handleFeedClick}>Open</button>
                        <button onClick={handleFeedEdit}>Edit</button>
                        <button onClick={handleFeedRemove}>Remove</button>
                    </div> : ""
                }
            </div>}
        </section>
    )
}

export default Feed
