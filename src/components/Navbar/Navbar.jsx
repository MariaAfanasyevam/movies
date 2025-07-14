import React from 'react'
import './Navbar.css'
import Fire from '../../assets/fire.png'
import Star from '../../assets/glowing-star.png'
import Party from '../../assets/partying-face.png'
import {Link} from "react-router-dom";


const Navbar = () => {
    return (
        <nav className='navbar'>
            <Link to="/"><h1>Movies</h1></Link>

            <div className='navbar_links'>
                <a href='#popular'>
                    Popular{" "}
                    <img src={Fire} alt='fire emoji' className='navbar_emoji' />
                </a>
                <a href='#top_rated'>
                    Top Rated{" "}
                    <img src={Star} alt='star emoji' className='navbar_emoji' />
                </a>

            </div>
        </nav>
    );
};

export default Navbar;