import React from 'react';

const Header = () => {
    return (
        <nav className="navbar text-black nav-custom">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown show">
                    <button className="nav-link dropdown-toggle" id="navbardrop" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        Alan Lambert &nbsp;
                    </button>
                    <div className="dropdown-menu" aria-labelledby="navbardrop">
                        <button className="dropdown-item">
                            Settings
                        </button>
                        <button className="dropdown-item">
                            Log out
                        </button>
                    </div>
                </li>
            </ul>
        </nav>
    )
}

export default Header;