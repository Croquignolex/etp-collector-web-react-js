import React, {useState} from 'react';
import PropTypes from "prop-types";

import LoaderComponent from "../LoaderComponent";
import OperatorComponent from "../OperatorComponent";
import FormModalComponent from "../modals/FormModalComponent";
import {fleetTypeBadgeColor} from "../../functions/typeFunctions";
import {dateToString, formatNumber} from "../../functions/generalFunctions";
import {CANCEL, DONE, PENDING, PROCESSING} from "../../constants/typeConstants";
import AgentDetailsContainer from "../../containers/agents/AgentDetailsContainer";

// Component
function RequestsClearancesCardsComponent({clearances, user, handleDeclareModalShow, handleCancelModalShow}) {
    // Local states
    const [agentDetailsModal, setAgentDetailsModal] = useState({show: false, header: "DETAIL DE L'AGENT/RESSOURCE", id: ''});

    // Hide agent details modal form
    const handleAgentDetailsModalHide = () => {
        setAgentDetailsModal({...agentDetailsModal, show: false})
    }

    // Render
    return (
        <>
            <div className="row m-1">
                {clearances.map((item, key) => {
                    return (
                        <div className="col-lg-4 col-md-6" key={key}>
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
                                            <b>Montant demandé</b>
                                            <span className="float-right text-success text-bold">
                                                {formatNumber(item.amount)}
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Reste à accepter</b>
                                            <span className="float-right text-danger text-bold">
                                                {formatNumber(item.remaining)}
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Compte à déstocker</b>
                                            <span className="float-right">{item.sim.number}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Agent/Ressource</b>
                                            <span className="float-right">
                                                {item.agent.name}
                                                <i className="fa fa-question-circle small ml-1 hand-cursor text-theme"
                                                   onClick={() => setAgentDetailsModal({...agentDetailsModal, show: true, id: item.agent.id})}
                                                />
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Demandeur</b>
                                            <span className="float-right">{item.claimant.name}</span>
                                        </li>
                                        <li className="list-group-item">
                                            {item.status === CANCEL && <b className="text-danger text-bold">Annulé</b>}
                                            {item.status === DONE && <b className="text-success text-bold">Pris en charge totalement</b>}
                                            {item.status === PROCESSING && <b className="text-primary text-bold">Pris en charge partiellement</b>}
                                            {item.status === PENDING && <b className="text-danger text-bold">En attente de prise en charge</b>}
                                        </li>
                                        {[PENDING, PROCESSING].includes(item.status) &&
                                            <div className="mt-3 text-right">
                                                {item.actionLoader ? <LoaderComponent little={true} /> :
                                                    <button type="button"
                                                            className="btn btn-sm btn-theme"
                                                            onClick={() => handleDeclareModalShow(item)}
                                                    >
                                                        <i className="fa fa-hand-holding" /> Prendre en charge
                                                    </button>
                                                }
                                            </div>
                                        }
                                    </ul>
                                    {((item.status === PENDING) && (item.supplier.id.toString() === user.id.toString())) && (
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
                                </div>
                            </div>
                        </div>
                    )
                })}
                {clearances.length === 0 &&
                    <div className="col-12">
                        <div className='alert custom-active text-center'>
                            Pas de demandes de déstockages
                        </div>
                    </div>
                }
            </div>
            {/* Modal */}
            <FormModalComponent modal={agentDetailsModal} handleClose={handleAgentDetailsModalHide}>
                <AgentDetailsContainer id={agentDetailsModal.id} />
            </FormModalComponent>
        </>
    )
}

// Prop types to ensure destroyed props data type
RequestsClearancesCardsComponent.propTypes = {
    user: PropTypes.object.isRequired,
    clearances: PropTypes.array.isRequired,
    handleCancelModalShow: PropTypes.func.isRequired,
    handleDeclareModalShow: PropTypes.func.isRequired,
};

export default React.memo(RequestsClearancesCardsComponent);
