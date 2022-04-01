import React from 'react';
import PropTypes from "prop-types";

import LoaderComponent from "../LoaderComponent";
import OperatorComponent from "../OperatorComponent";
import {fleetTypeBadgeColor} from "../../functions/typeFunctions";
import {dateToString, formatNumber} from "../../functions/generalFunctions";
import {CANCEL, COLLECTOR_TYPE, DONE, PROCESSING} from "../../constants/typeConstants";

// Component
function OperationsTransfersCardsComponent({transfers, group, user, handleCancelModalShow, handleConfirmModalShow}) {
    // Render
    return (
        <>
            <div className="row m-1">
                {transfers.map((item, key) => {
                    return (
                        <div className={`${group ? "col-lg-6" : "col-lg-4"} col-md-6`} key={key}>
                            <div className="card">
                                <div className={`${fleetTypeBadgeColor(item.status).background} card-header`} />
                                <div className="card-body">
                                    <ul className="list-group list-group-unbordered">
                                        <OperatorComponent operator={item.operator} />
                                        <li className="list-group-item">
                                            <b>Création</b>
                                            <span className="float-right">{dateToString(item.creation)}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Compte émetteur</b>
                                            <span className="float-right">{item.sim_outgoing?.number}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Compte recepteur</b>
                                            <span className="float-right">{item.sim_incoming?.number}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Flotte envoyé</b>
                                            <span className="float-right text-success text-bold">
                                                {formatNumber(item.amount)}
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Emetteur</b>
                                            <span className="float-right">{item.user?.name}</span>
                                        </li>
                                        {(!group) && (
                                            <li className="list-group-item">
                                                {item.status === DONE && <b className="text-success text-bold">Confirmé</b>}
                                                {item.status === CANCEL && <b className="text-danger text-bold">Annulé</b>}
                                                {item.status === PROCESSING && <b className="text-danger text-bold">En attente de confirmation</b>}
                                            </li>
                                        )}
                                    </ul>
                                    {(!group) && (
                                        <>
                                            {
                                                (item.status === PROCESSING) &&
                                                (item.collector?.id === user?.id) &&
                                                (item.type.includes('->' + COLLECTOR_TYPE)
                                                ) && (
                                                    <div className="mt-3 text-right">
                                                        {item.actionLoader ? <LoaderComponent little={true} /> : (
                                                            <button type="button"
                                                                    className="btn btn-theme btn-sm"
                                                                    onClick={() => handleConfirmModalShow(item)}
                                                            >
                                                                <i className="fa fa-check" /> Confirmer
                                                            </button>
                                                        )}
                                                    </div>
                                                )
                                            }
                                            {
                                                (item.status === PROCESSING) &&
                                                (item.user?.id === user?.id) &&
                                                (item.type.includes(COLLECTOR_TYPE + '->')
                                                ) && (
                                                    <div className="mt-3 text-right">
                                                        {item.actionLoader ? <LoaderComponent little={true} /> : (
                                                            <button type="button"
                                                                    className="btn btn-danger btn-sm"
                                                                    onClick={() => handleCancelModalShow(item)}
                                                            >
                                                                <i className="fa fa-times" /> Annuler
                                                            </button>
                                                        )}
                                                    </div>
                                                )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })}
                {transfers.length === 0 &&
                    <div className="col-12">
                        <div className='alert custom-active text-center'>
                            Pas de transferts
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

// Prop types to ensure destroyed props data type
OperationsTransfersCardsComponent.propTypes = {
    group: PropTypes.bool,
    transfers: PropTypes.array.isRequired,
    handleCancelModalShow: PropTypes.func,
    handleConfirmModalShow: PropTypes.func,
};

// Prop types to ensure destroyed props data type
OperationsTransfersCardsComponent.defaultProps = {
    group: false
};

export default React.memo(OperationsTransfersCardsComponent);
