import React from 'react';
import PropTypes from "prop-types";

import {DONE} from "../../constants/typeConstants";
import {dateToString, formatNumber} from "../../functions/generalFunctions";

// Component
function OperationsAffordsCardsComponent({affords}) {
    // Render
    return (
        <>
            <div className="row m-1">
                {affords.map((item, key) => {
                    return (
                        <div className="col-lg-4 col-md-6" key={key}>
                            <div className="card">
                                <div className={`card-header ${item.status === DONE ? 'bg-secondary' : 'bg-primary'}`}>
                                    <h3 className="card-title text-bold">
                                        <i className="fa fa-money-bill" /> {formatNumber(item.amount)}
                                    </h3>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group list-group-unbordered">
                                        <li className="list-group-item">
                                            <b>Créer le</b>
                                            <span className="float-right">{dateToString(item.creation)}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Fournisseur</b>
                                            <span className="float-right">{item.vendor}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Puce réceptrice</b>
                                            <span className="float-right">{item.sim.number}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Responsable</b>
                                            <span className="float-right">{item.collector.name}</span>
                                        </li>
                                        <li className="list-group-item">
                                            {(item.status === DONE)
                                                ? <b className="text-success">Confirmé</b>
                                                : <b className="text-danger">En attente de confirmation</b>
                                            }
                                        </li>
                                        {item.receipt && (
                                            <li className="list-group-item text-center">
                                                <a download target='_blank' href={item.receipt} rel='noopener noreferrer' className="btn btn-theme">
                                                    <i className="fa fa-file-archive" /> Reçus
                                                </a>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {affords.length === 0 &&
                    <div className="col-12">
                        <div className='alert custom-active text-center'>
                            Pas d'approvisionnement
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

// Prop types to ensure destroyed props data type
OperationsAffordsCardsComponent.propTypes = {
    affords: PropTypes.array.isRequired
};

export default React.memo(OperationsAffordsCardsComponent);
