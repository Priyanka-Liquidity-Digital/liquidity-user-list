import React from 'react';

const SearchUser = () => {
    return (
        <div className="search-user">
            <form>
                <div className="input-group">
                    <input type="text" className="form-control" name="searchUser" placeholder="search for User" />
                    <div className="input-group-append">
                        <button className="btn btn-primary search-button-user" type="button">
                            <i className="fa fa-search"></i>
                        </button>
                    </div>
                </div>
            </form>
        </div> 
    )
}

export default SearchUser