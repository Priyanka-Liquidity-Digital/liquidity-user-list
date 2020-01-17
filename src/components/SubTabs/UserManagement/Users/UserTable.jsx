import React, { Component } from 'react';

import MoreAction from "../../../../assets/action.svg"

const getUserList = "https://peaceful-wildwood-93487.herokuapp.com/users";

class UserDataFetcher extends Component{
    state = {
        isLoading: false,
        error : null,
        users : []
    }

    componentDidMount(){
        this.setState({isLoading : true})
        fetch(this.props.url)
        .then(res => {
            if(res.ok){
               return res.json()
            }else{
                throw Error("Error occured while Fetching users data")
            }
        })
        .then(users => {
            this.setState({ users, isLoading : false });
        })
        .catch(error => this.setState({
            error
        }))
    }
    render(){
        return this.props.children(this.state)
    }
}

class UserTable extends Component {
    render(){
        return(
            <UserDataFetcher url={getUserList}>
                {
                    ({error, isLoading, users}) => {
                        if(error){
                            return <p className="text-danger">{this.state.error.message}</p>
                        }
                        if(isLoading){
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
                                        {users.map(
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
            </UserDataFetcher>
        )
    }
}


export default UserTable
