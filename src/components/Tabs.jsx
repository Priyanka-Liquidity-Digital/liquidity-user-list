import React from 'react';

// import ExternalIssuancesTabContent from './ExternalIssuancesTabContent';
// import FevoriteIssuancesTabContent from './FevoriteIssuancesTabContent';
// import MyIssuancesTabContent from './MyIssuancesTabContent';
// import MNDAManagementTabContent from './MyIssuancesTabContent';

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
                    {/* <ExternalIssuancesTabContent /> */}
                    <h3> First tab </h3>
                </div>
                <div id="tab2" className="tab-pane fade">
                    {/* <FevoriteIssuancesTabContent /> */}
                    <h3> Second tab </h3>
                </div>
                <div id="tab3" className="tab-pane fade active show">
                    {/* <MyIssuancesTabContent /> */}
                    <h3> Third tab </h3>
                </div>
            </div>
        </div>
    )
}

export default Tabs


