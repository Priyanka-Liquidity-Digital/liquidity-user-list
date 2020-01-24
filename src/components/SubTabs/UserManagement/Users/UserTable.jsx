import React, { Component } from 'react';
import axios from 'axios';
import MoreAction from "../../../../assets/action.svg";
import {NotificationContainer, NotificationManager} from 'react-notifications';

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const phoneNoRegex = RegExp(
    /^[0][1-9]\d{9}$|^[1-9]\d{9}$/
);

class UserTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            error: null,
            users: [],
        };

    }

    componentDidMount() {
        this.setState({ isLoading: true })
        axios.get(`https://peaceful-wildwood-93487.herokuapp.com/users`)
            .then(res => {
                const users = res.data;
                this.setState({ users, isLoading: false });
            })
    }

    deleteUser = (userEmail) => {
        axios.delete(`https://peaceful-wildwood-93487.herokuapp.com/users/` + userEmail)
            .then(res => {
                window.confirm('Are you sure you wish to delete this item?')
                const users = res.data;
                console.log(users);
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        const {formErrors} = this.state

        if (this.state.error) {
            return <p className="text-danger">{this.state.error.message}</p>
        }
        if (this.state.isLoading) {
            return <p>Loading...</p>
        }
        return (

            <div className="table-responsive-lg">
                <table className="table custom-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name <i className="fa fa-caret-up ml-2" aria-hidden="true"></i></th>
                            <th>Email <i className="fa fa-caret-up ml-2" aria-hidden="true"></i></th>
                            <th>Phone no <i className="fa fa-caret-up ml-2" aria-hidden="true"></i></th>
                            <th>Department <i className="fa fa-caret-up ml-2" aria-hidden="true"></i></th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map(user => (
                            <tr key={user._id}>
                                <td></td>
                                <td>{user.Name}</td>
                                <td className="email-primary"><i className="fa fa-envelope mr-2" aria-hidden="true"></i> {user.Email}</td>
                                <td>{user.PhoneNumber}</td>
                                <td>{user.Department}</td>
                                <td>

                                    <div className="btn-group">
                                        <a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <img src={MoreAction} alt="More actions" className="more-actions" />
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right">


                                            
                                            <button className="dropdown-item custom-dropdown-item" type="button"
                                                data-toggle="modal" data-target="#editUser"
                                                onClick={() => this.props.updateUser(user)}
                                            >
                                                <i className="fa fa-pencil mr-2" aria-hidden="true"></i>Edit
                                                </button>




                                                

                                            <div className="dropdown-divider"></div>

                                            <button className="dropdown-item custom-dropdown-item delete" type="button"
                                                onClick={() => this.deleteUser(user)}
                                            >
                                                <i className="fa fa-trash mr-2" aria-hidden="true"></i> Delete
                                                    </button>
                                        </div>

                                    </div>

                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
                <NotificationContainer />
            </div>
        )
    }
}

export default UserTable



{/* <div className="modal modal-md delete-user-modal fade" id="deleteUser">
    <div className="modal-dialog">
        <div className="modal-content">
            <div className="modal-body">
                <div>
                    <h4>Confirm user removal</h4>
                    <p>This action can't be revert</p>
                    <div className="mt-4 float-right">
                        <button type="button" data-dismiss="modal" className="cancel">Cancel</button>
                        <button type="button" className="remove" >Remove</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> */}