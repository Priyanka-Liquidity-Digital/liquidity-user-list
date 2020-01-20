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
                                    <td><img src={MoreAction} alt="More actions" className="more-actions" /> </td>
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