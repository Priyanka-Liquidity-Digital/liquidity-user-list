import React from 'react';

import Add from "../../../../assets/add.svg";

const AddUser = () => {
    return (
        <div className="add-user">
            <button className="btn btn-add-user"> <img src={Add} alt="Add user" className="mr-2" /> Add User</button>
        </div> 
    )
}

export default AddUser