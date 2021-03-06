import React, { Component } from 'react';
import axios from 'axios';
import MoreAction from "../../../../assets/action.svg";
import { NotificationContainer, NotificationManager } from 'react-notifications';

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

            Name: '',
            Email: '',
            Department: '',
            PhoneNumber: '',

            formErrors: {
                Name: '',
                Email: '',
                Department: '',
                PhoneNumber: ''
            },
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

    handleChange = event => {
        event.preventDefault();
        const { name, value } = event.target;

        let formErrors = { ...this.state.formErrors };

        switch (name) {
            case "Name":
                formErrors.Name =
                    value.length < 2 ? "Enter your full name" : ""
                break;
            case "Email":
                formErrors.Email = emailRegex.test(value)
                    ? ""
                    : "Invalid email address";
                break;
            case "Department":
                formErrors.Department =
                    value.length < 2 ? "Enter Department" : "";
                break;
            case "PhoneNumber":
                formErrors.PhoneNumber = phoneNoRegex.test(value)
                    ? ""
                    : "Enter only 10 digit phone No"
                break;
            default:
                break;
        }
        this.setState({ formErrors, [name]: value });
    };

    createNotification = (type) => {
        return () => {
            switch (type) {
                case 'info':
                    NotificationManager.info('Info message');
                    break;
                case 'success':
                    NotificationManager.success('Success message', 'New User added Successfully', 3000);
                    break;
                case 'warning':
                    NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
                    break;
                case 'error':
                    NotificationManager.error('Error message', 'Click me!', 5000, () => {
                        alert('callback');
                    });
                    break;
            }
        };
    };

    refreshUserList = () => {
        window.location.reload(false);
    }

    updateUser = (userEmail) => {
        axios.get(`https://peaceful-wildwood-93487.herokuapp.com/users/` + userEmail)
            .then(res => {
                this.setState({
                    Name: res.data[0].Name,
                    Email :res.data[0].Email,
                    Department :res.data[0].Department,
                    PhoneNumber :res.data[0].PhoneNumber,
                });
            })
    }


    handleUpdateSubmit = (event) => {
        event.preventDefault();

        const user = {
            Name: this.state.Name,
            Email: this.state.Email,
            Department: this.state.Department,
            PhoneNumber: this.state.PhoneNumber

        }

        axios.put(`https://peaceful-wildwood-93487.herokuapp.com/users/`+ user.Email, user)
            .then(res => {
                const users = res.data;
                console.log(users);
            })
            .catch(error => {
                console.log(error);
            })
    }


    // deleteUser = (userEmail) => {
    //     axios.delete(`https://peaceful-wildwood-93487.herokuapp.com/users/` + userEmail)
    //         .then(res => {
    //             window.confirm('Are you sure you wish to delete this item?')
    //             const users = res.data;
    //             console.log(users);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         })
    // }

    handleDelete = (event) => {
        event.preventDefault();

        const user = {
            Name: this.state.Name,
            Email: this.state.Email,
            Department: this.state.Department,
            PhoneNumber: this.state.PhoneNumber
        }

        axios.delete(`https://peaceful-wildwood-93487.herokuapp.com/users/` + user.Email)
        .then(res => {
            const users = res.data;
            console.log(users);
            window.location.reload(false);
        })
        .catch(error => {
            console.log(error);
        })
    }

    render() {
        const {formErrors } = this.state

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
                                                onClick={() => this.updateUser(user.Email)}
                                            >
                                                <i className="fa fa-pencil mr-2" aria-hidden="true"></i>Edit
                                            </button>

                                            <div className="dropdown-divider"></div>
                                            
                                            <button className="dropdown-item custom-dropdown-item delete" type="button"
                                                    data-toggle="modal" data-target="#deleteUser"
                                                onClick={() => this.updateUser(user.Email)}
                                                // onClick={() => this.deleteUser(user.Email)}
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

                <div className="mt-4">
                    <div className="modal custom-modal fade" id="editUser">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <button type="button" className="close" data-dismiss="modal" onClick={this.refreshUserList}>Close <i className="fa fa-times ml-2" aria-hidden="true"></i></button>
                                    <div className="mt-4">
                                        <h4 className="form-modal-heading"> Update User Information</h4>

                                        <form method="POST" className="add-user-form" onSubmit={this.handleUpdateSubmit}>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>Name</label>
                                                        <input type="text" name="Name" placeholder="Enter Name"
                                                            defaultValue={this.state.Name}
                                                            onChange={this.handleChange}
                                                            className={formErrors.Name.length > 0 ? "error" : null, "form-control"}
                                                            autoFocus={true}
                                                            autoComplete="off" />

                                                        {formErrors.Name.length > 0 && (
                                                            <span className="errorMessage">{formErrors.Name}</span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>Email</label>
                                                        <input type="text" name="Email" placeholder="Enter e-mail"
                                                            defaultValue={this.state.Email}
                                                            onChange={this.handleChange}
                                                            className={formErrors.Email.length > 0 ? "error" : null, "form-control"}
                                                            autoComplete="off" />

                                                        {formErrors.Email.length > 0 && (
                                                            <span className="errorMessage">{formErrors.Email}</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>Department</label>
                                                        <input type="text" name="Department" placeholder="Enter Department"
                                                            defaultValue={this.state.Department}
                                                            onChange={this.handleChange}
                                                            className={formErrors.Department.length > 0 ? "error" : null, "form-control"}
                                                            autoComplete="off"
                                                        />

                                                        {formErrors.Department.length > 0 && (
                                                            <span className="errorMessage">{formErrors.Department}</span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>PhoneNumber</label>
                                                        <input type="tel" name="PhoneNumber" placeholder="Enter Phone No"
                                                            defaultValue={this.state.PhoneNumber} onChange={this.handleChange}
                                                            className={formErrors.PhoneNumber.length > 0 ? "error" : null, "form-control"}
                                                            autoComplete="off"
                                                        />

                                                        {formErrors.PhoneNumber.length > 0 && (
                                                            <span className="errorMessage">{formErrors.PhoneNumber}</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-modal-buttons">
                                                <button type="button" data-dismiss="modal" className="cancel" onClick={this.refreshUserList}>Cancel</button>
                                                <button type="submit" className="add-user">Update</button>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal modal-md delete-user-modal fade" id="deleteUser">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <form onSubmit={this.handleDelete}>
                                    <h4>Confirm user removal</h4>
                                    <p>This action can't be revert</p>
                                    <div className="mt-4 float-right">
                                        <button type="button" data-dismiss="modal" className="cancel">Cancel</button>
                                        <button type="submit" className="remove" >Remove</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                
                <NotificationContainer />
            </div>
        )
    }
}

export default UserTable



// {/* <div className="modal modal-md delete-user-modal fade" id="deleteUser">
//     <div className="modal-dialog">
//         <div className="modal-content">
//             <div className="modal-body">
//                 <div>
//                     <h4>Confirm user removal</h4>
//                     <p>This action can't be revert</p>
//                     <div className="mt-4 float-right">
//                         <button type="button" data-dismiss="modal" className="cancel">Cancel</button>
//                         <button type="button" className="remove" >Remove</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// </div> */}