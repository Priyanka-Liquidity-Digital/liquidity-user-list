import React, { Component } from 'react';

import Add from "../../../../assets/add.svg";
import AddUserForm from './AddUserForm';

class AddUser extends Component {
   render(){
    return (
        <div className="add-user">
            <button className="btn btn-add-user" data-toggle="modal" data-target="#addNewUser">
                <img src={Add} alt="Add user" className="mr-2"/>
             Add User</button>

            <div className="modal custom-modal fade" id="addNewUser" autoFocus={true}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <button type="button" className="close" data-dismiss="modal">Close <i className="fa fa-times ml-2" aria-hidden="true"></i></button>
                            <div>
                                <AddUserForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    )
   }
}

export default AddUser