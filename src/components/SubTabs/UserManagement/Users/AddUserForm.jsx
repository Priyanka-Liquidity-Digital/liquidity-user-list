import React, { Component } from 'react';
import axios from 'axios';

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);


class AddUserForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            Name : '',
            Email: '',
            Department: '',
            PhoneNumber: '',

            formErrors: {
                Name : '',
                Email: '',
                Department: '',
                PhoneNumber: ''
            }
        };
    }

    handleChange = event =>{
        event.preventDefault();
        // this.setState({
        //     [event.target.name]: event.target.value
        // })
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
                    value.length < 3 ? "Enter Department" : "";
                    break;
            case "PhoneNumber":
                formErrors.PhoneNumber =
                    value.length < 10 ? "Enter 10 digit" : "";
                    break;
            default:
              break;
          }
          this.setState({ formErrors, [name]: value });
    };


    handleSubmit = event => {
        event.preventDefault();

        const user = {
            Name:           this.state.Name,
            Email:          this.state.Email,
            Department:     this.state.Department,
            PhoneNumber:    this.state.PhoneNumber
        }

        axios.post(`https://peaceful-wildwood-93487.herokuapp.com/users/register`, user)
        .then(res => {
            window.location.reload(false);
        })
        .catch(error => {
            console.log(error);
        })

    }
    
    render(){
        const {Name, Email, Department, PhoneNumber, formErrors} = this.state
        return (
            <div className="mt-4">
                <h4 className="form-modal-heading"> Add User</h4>

                <form className="add-user-form" onSubmit={this.handleSubmit}>
                   <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" name="Name" placeholder="Enter Name" 
                                    value={Name} onChange={this.handleChange}
                                    className={ formErrors.Name.length > 0 ? "error" : null, "form-control"} />

                                {formErrors.Name.length > 0 && (
                                    <span className="errorMessage">{formErrors.Name}</span>
                                )}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Email</label>
                                <input type="text" name="Email" placeholder="Enter e-mail"
                                    value={Email} onChange={this.handleChange} 
                                    className={ formErrors.Name.length > 0 ? "error" : null, "form-control"}/>

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
                                    value={Department} onChange={this.handleChange}
                                    className={ formErrors.Name.length > 0 ? "error" : null, "form-control"} />

                                {formErrors.Department.length > 0 && (
                                    <span className="errorMessage">{formErrors.Department}</span>
                                )}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>PhoneNumber</label>
                                <input type="tel" name="PhoneNumber" placeholder="Enter Phone No" 
                                value={PhoneNumber} onChange={this.handleChange}
                                className={ formErrors.Name.length > 0 ? "error" : null, "form-control"} />

                                {formErrors.PhoneNumber.length > 0 && (
                                    <span className="errorMessage">{formErrors.PhoneNumber}</span>
                                )}
                            </div>
                        </div>
                   </div>

                   <div className="form-modal-buttons">
                       <button type="button" data-dismiss="modal" className="cancel">Cancel</button>
                       <button type="submit" className="add-user">Add</button>
                   </div>

                </form>
            </div>
        )
    }
}

export default AddUserForm