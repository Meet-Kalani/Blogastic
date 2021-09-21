import React from 'react';
import { Link } from 'react-router-dom';

const CreateBlogCTA = () => {
    return (
        <section id="createBlogCTA">
            <h3>Want to Create your own Blog!</h3>
            <Link to="/Blogastic/blog/create">Click Here</Link>
        </section>
    )
}

export default CreateBlogCTA
