import React from 'react';

const Footer = () => {
    const handleClick = () => {
        window.open('https://meetkalani.github.io/Portfolio');
    }

    return (
        <section id="footer">
            <div>
                <p>Blogastic by <span onClick={handleClick}>Meet Kalani</span> | meetkalani2002@gmail.com</p>
            </div>
        </section>
    )
}

export default Footer
