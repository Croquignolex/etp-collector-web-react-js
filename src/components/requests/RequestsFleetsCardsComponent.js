import PropTypes from "prop-types";
import React, {useState} from 'react';

import LoaderComponent from "../LoaderComponent";
import OperatorComponent from "../OperatorComponent";
import FormModalComponent from "../modals/FormModalComponent";
import {fleetTypeBadgeColor} from "../../functions/typeFunctions";
import {CANCEL, DONE, PENDING} from "../../constants/typeConstants";
import {dateToString, formatNumber} from "../../functions/generalFunctions";
import AgentDetailsContainer from "../../containers/agents/AgentDetailsContainer";

// Component
function RequestsFleetsCardsComponent({fleets, handleCancelModalShow}) {
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
                {fleets.map((item, key) => {
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
                                            <b>Flotte démandée</b>
                                            <span className="float-right">{formatNumber(item.amount)}</span>
                                        </li>
                                        {(item.status === DONE) && (
                                            <li className="list-group-item">
                                                <b>Flotte servie</b>
                                                <span className="float-right text-danger text-bold">
                                                    {formatNumber(parseInt(item.amount) - parseInt(item.remaining))}
                                                </span>
                                            </li>
                                        )}
                                        <li className="list-group-item">
                                            <b>Compte à flotter</b>
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
                                            {item.status === DONE && <b className="text-success text-bold">Flottée</b>}
                                            {item.status === CANCEL && <b className="text-danger text-bold">Annulé</b>}
                                            {item.status === PENDING && <b className="text-danger text-bold">En attente de flottage</b>}
                                        </li>
                                    </ul>
                                    {(item.status === PENDING) && (
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
                {fleets.length === 0 &&
                    <div className="col-12">
                        <div className='alert custom-active text-center'>
                            Pas de demandes de flotte
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
RequestsFleetsCardsComponent.propTypes = {
    fleets: PropTypes.array.isRequired,
    handleCancelModalShow: PropTypes.func.isRequired,
};

export default React.memo(RequestsFleetsCardsComponent);
