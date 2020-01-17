import React from 'react';

import SearchUser from "./SearchUsers";
import AddUser from "./AddUser";
import UserTable from "./UserTable";

const Users = () => {
    return (
        <div className="tabs-content">
            <div className="row search-addUser">
                <div className="col-6">
                    <SearchUser />
                </div>
                <div className="col-6">
                    <AddUser />
                </div>
           </div>
           
            <UserTable />
        </div>
    )
}

export default Users