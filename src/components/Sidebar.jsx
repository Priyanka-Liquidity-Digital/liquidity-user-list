import React from 'react';

import { Link, NavLink, withRouter } from 'react-router-dom';

import ArcticLogo from '../assets/arctic-logo.png';


const SideNavbar = () => {
    return(
        <div className="sidebar">
            <div className="logo">
                <Link to="/"><img src={ArcticLogo} alt="Arctic Securities" className="liquidity-logo" /></Link>
            </div>
            <div className="side-tabs">
                <NavLink activeClassName="sidenav-active" to="/deal-room" className="nav-link">Deal Room</NavLink>
                <NavLink activeClassName="sidenav-active" to="/user-management" className="nav-link">User Management</NavLink>
                <NavLink activeClassName="sidenav-active" to="/issuance-statistics" className="nav-link">Issuance Statistics</NavLink>
            </div>
            <div className="footer-text">
                <p>Contact us if you have questions:</p>
                <p className="mail"><a href="mailto:support@liquidity.digital">support@liquidity.digital</a></p>
            </div>
        </div>
    )
}

export default withRouter(SideNavbar)