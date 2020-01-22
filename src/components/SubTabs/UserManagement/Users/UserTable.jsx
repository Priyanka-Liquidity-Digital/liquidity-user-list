import React, { Component } from 'react';
import axios from 'axios';

import MoreAction from "../../../../assets/action.svg";

class UserTable extends Component {

    state = {
        isLoading: false,
        error : null,
        users : [],
    }

    componentDidMount(){
        this.setState({isLoading : true})
        axios.get(`https://peaceful-wildwood-93487.herokuapp.com/users`)
        .then(res => {
            const users = res.data;
            this.setState({users, isLoading : false });
        })
    }

    render() {
        if(this.state.error){
            return <p className="text-danger">{this.state.error.message}</p>
        }
        if(this.state.isLoading){
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
                        {this.state.users.map(
                            user => (
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
                                            <div class="dropdown-menu dropdown-menu-right">
                                                <button className="dropdown-item custom-dropdown-item" type="button">
                                                    <i className="fa fa-pencil mr-2" aria-hidden="true"></i>Edit
                                                </button>
                                                <div class="dropdown-divider"></div>
                                                <button className="dropdown-item custom-dropdown-item delete" type="button">
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
            </div>
        )
    }
}

export default UserTable