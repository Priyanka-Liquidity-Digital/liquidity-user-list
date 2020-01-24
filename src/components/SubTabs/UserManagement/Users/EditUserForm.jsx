import React, { Component } from 'react';
import axios from 'axios';


const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const phoneNoRegex = RegExp(
    /^[0][1-9]\d{9}$|^[1-9]\d{9}$/
);


class EditUserForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            users: [],

            Name : '',
            Email: '',
            Department: '',
            PhoneNumber: '',

            formErrors: {
                Name : '',
                Email: '',
                Department: '',
                PhoneNumber: ''
            },
        };  
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

    updateUser = (user) => { 
        console.log(user.Name);
        console.log(user.Email);
        console.log(user.Department);
        console.log(user.PhoneNumber);

        this.state.Name = user.Name;
    }

    handleUpdateSubmit = (event) => {
        event.preventDefault();

        const user = {
            // Name:           this.state.Name,
            // Email:          this.state.Email,
            // Department:     this.state.Department,
            // PhoneNumber:    this.state.PhoneNumber

            Name: 'Priyanka',
            Email: 'priyankatakkekar@gmail.com',
            Department: 'Development',
            PhoneNumber: '8585858585'

            // Name: 'Bala V',
            // Email: 'bala#gmail.com',
            // Department: 'Manager',
            // PhoneNumber: '6363636363'
        }

        axios.put(`https://peaceful-wildwood-93487.herokuapp.com/users/`, user)
            .then(res => {
                const users = res.data;
                console.log(users);
            })
            .catch(error => {
                console.log(error);
            })
    }

    render(){
        const {Name, Email, Department, PhoneNumber, formErrors} = this.state
        return (
            <div className="mt-4">
                <h4 className="form-modal-heading"> Update User Information</h4>

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
                                                                                defaultValue="Empty"

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
                                                                                defaultValue={user.Email}
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
                                                                                defaultValue={user.Department}
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
                                                                                defaultValue={user.PhoneNumber} onChange={this.handleChange}
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

                                                            {/* <form className="add-user-form" onSubmit={this.handleUpdateSubmit}>
                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <div className="form-group">
                                                                            <label>Name</label>
                                                                            <input type="text" name="Name"
                                                                                className="form-control"
                                                                                autoComplete="off" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <div className="form-group">
                                                                            <label>Email</label>
                                                                            <input type="text" name="Email"
                                                                                className="form-control"
                                                                                autoComplete="off" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <div className="form-group">
                                                                            <label>Department</label>
                                                                            <input type="text" name="Department"
                                                                                className="form-control"
                                                                                autoComplete="off"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <div className="form-group">
                                                                            <label>PhoneNumber</label>
                                                                            <input type="tel" name="PhoneNumber"
                                                                                className="form-control"
                                                                                autoComplete="off"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="form-modal-buttons">
                                                                    <button type="button" data-dismiss="modal" className="cancel">Cancel</button>
                                                                    <button type="submit" className="add-user">Update</button>
                                                                </div>
                                                            </form> */}

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


            </div>
        )
    }
}

export default EditUserForm