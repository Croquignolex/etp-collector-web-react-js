import React from 'react';
import PropTypes from "prop-types";

import {dateToString, formatNumber} from "../../functions/generalFunctions";

// Component
function NetworkAnonymousCardsComponent({anonymous}) {
    // Render
    return (
        <>
            <div className="row m-1">
                {anonymous.map((item, key) => {
                    return (
                        <div className="col-lg-4 col-md-6" key={key}>
                            <div className="card">
                                <div className="card-header bg-secondary">
                                    <h3 className="card-title text-bold">
                                        <i className="fa fa-phone" /> {formatNumber(item.amount)}
                                    </h3>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group list-group-unbordered">
                                        <li className="list-group-item">
                                            <b>Création</b>
                                            <span className="float-right">{dateToString(item.creation)}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Emetteur</b>
                                            <span className="float-right">{item.claimant.name}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Puce émetrice</b>
                                            <span className="float-right">
                                                {item.sim_outgoing.number}
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Puce receptrice</b>
                                            <span className="float-right">{item.receiverSim}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Recepteur</b>
                                            <span className="float-right">{item.receiver}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {anonymous.length === 0 &&
                    <div className="col-12">
                        <div className='alert custom-active text-center'>
                            Pas de flottages anonymes
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

// Prop types to ensure destroyed props data type
NetworkAnonymousCardsComponent.propTypes = {
    anonymous: PropTypes.array.isRequired
};

export default React.memo(NetworkAnonymousCardsComponent);
