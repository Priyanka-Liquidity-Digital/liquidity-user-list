import React, { Component } from 'react';

import Tabs from '../components/SubTabs/UserManagement/UserManagementTabs';
// import UserDealInformationModal from '../components/Modal/UserDealInformationModal';

class UserManagement extends Component {
    render(){
        return(
            <div className="inner-container mt-4">
                <h2 className="main-heading">User Management</h2>
                <Tabs />
            </div>
        )
    }
}

export default UserManagement

