import React from 'react'
import './Navbar.css'
import Logo from './Logo.jsx'
const Navbar = () => {
    return (
        <div className="nav-container">
            <div className='container nav-container-inner'>
                <div className="img-container">
                    {/* <img src="ToolBarIcons/0.svg" alt=""></img> */}
                    <Logo />
                </div>
                <div className="data">
                    <h3>Notes++</h3>
                </div>
            </div>
        </div>
    )
}

export default Navbar