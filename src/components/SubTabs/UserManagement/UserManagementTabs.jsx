import React from 'react';

import Originators from "./Originators/Originators";
import RegisteredReps from "./RegisteredReps/RegisteredReps";
import Users from "./Users/Users";

const Tabs = () => {
    return (
        <div>
            <ul className="nav nav-tabs">
                <li><a data-toggle="tab" href="#tab1">Originators</a></li>
                <li><a data-toggle="tab" href="#tab2">Registered Reps</a></li>
                <li><a data-toggle="tab" href="#tab3" className="active">Users</a></li>
            </ul>

            <div className="tab-content">
                <div id="tab1" className="tab-pane fade">
                    <Originators />
                </div>
                <div id="tab2" className="tab-pane fade">
                   <RegisteredReps />
                </div>
                <div id="tab3" className="tab-pane fade active show">
                    <Users />
                </div>
            </div>
        </div>
    )
}

export default Tabs


