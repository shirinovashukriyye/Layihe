import React from 'react'
import { Link } from 'react-router-dom'
import './Navlist.css'

const Navlist = () => {
   return (
        <div>
            <ul className='list'>
                <li><Link to="/" className="list-link">Home</Link></li>
                <li><Link to="/events" className="list-link">Events</Link></li>
                <li><Link to="/shop" className="list-link">Shop</Link></li>
                <li><Link to="/news" className="list-link">News</Link></li>
                <li><Link to="/createaevent" className="list-link">Create A Event</Link></li>
                <li><Link to="/contact" className="list-link">Contact</Link></li>
            </ul>
            {/* <div className="burger">
                <RxHamburgerMenu />
            </div> */}
        </div>
   )
}

export default Navlist