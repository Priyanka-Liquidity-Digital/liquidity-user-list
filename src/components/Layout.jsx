import React, { Component } from 'react';
import { BrowserRouter as Router,Switch, Route} from 'react-router-dom';


import Header from './Header';
import SideNavbar from './Sidebar';
// import Home from '../pages/home';
import DealRoom from '../pages/deal-room';
import UserManagement from '../pages/user-management';
import IssuanceStatistics from '../pages/issuance-statistics';

import '../scss/style.scss';

class Layout extends Component {
    render(){
        return(
            <div className="layout">
                <Router>
                    <SideNavbar /> 
                    <div className="main-container">
                        <Header />
                        <Switch>
                            <Route exact path={"/deal-room"} component={DealRoom} />
                            <Route exact path={"/user-management"} component={UserManagement} />
                            <Route exact path={"/issuance-statistics"} component={IssuanceStatistics} />
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}

export default Layout