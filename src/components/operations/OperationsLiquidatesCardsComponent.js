import React from 'react';
import PropTypes from "prop-types";

import LoaderComponent from "../LoaderComponent";
import {APPROVE, PENDING} from "../../constants/typeConstants";
import {dateToString, formatNumber} from "../../functions/generalFunctions";

// Component
function OperationsLiquidatesCardsComponent({liquidates, user, handleConfirmModalShow}) {
    // Render
    return (
        <>
            <div className="row m-1">
                {liquidates.map((item, key) => {
                    return (
                        <div className="col-lg-4 col-md-6" key={key}>
                            <div className="card">
                                <div className={`card-header ${item.status === APPROVE ? 'bg-secondary' : 'bg-primary'}`}>
                                    <h3 className="card-title text-bold">
                                        <i className="fa fa-money-bill" /> {formatNumber(item.amount)}
                                    </h3>
                                    <div className="card-tools">
                                        {(item.status === PENDING && item.receiver.id === user.id) && (
                                            item.actionLoader ? <LoaderComponent little={true} /> : (
                                                <button type="button"
                                                        title="Confirmer"
                                                        className="btn btn-tool"
                                                        onClick={() => handleConfirmModalShow(item)}
                                                >
                                                    <i className="fa fa-check" />
                                                </button>
                                            )
                                        )}
                                    </div>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group list-group-unbordered">
                                        <li className="list-group-item">
                                            <b>Création</b>
                                            <span className="float-right">{dateToString(item.creation)}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Emetteur</b>
                                            <span className="float-right">{item.sender.name}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Recepteur</b>
                                            <span className="float-right">{item.receiver.name}</span>
                                        </li>
                                        <li className="list-group-item">
                                            {(item.status === APPROVE)
                                                ? <b className="text-success">Confirmé</b>
                                                : <b className="text-danger">En attente de confirmation</b>
                                            }
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {liquidates.length === 0 &&
                    <div className="col-12">
                        <div className='alert custom-active text-center'>
                            Pas de transferts de liquidités
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

// Prop types to ensure destroyed props data type
OperationsLiquidatesCardsComponent.propTypes = {
    user: PropTypes.object.isRequired,
    liquidates: PropTypes.array.isRequired,
    handleConfirmModalShow: PropTypes.func.isRequired,
};

export default React.memo(OperationsLiquidatesCardsComponent);
