import React, {useState} from 'react';
import PropTypes from "prop-types";

import FormModalComponent from "../modals/FormModalComponent";
import {dateToString, formatNumber} from "../../functions/generalFunctions";
import AgentDetailsContainer from "../../containers/agents/AgentDetailsContainer";

// Component
function SimCardComponent({sim}) {
    // Local states
    const [agentDetailsModal, setAgentDetailsModal] = useState({show: false, header: "DETAIL DE L'AGENT/RESSOURCE", id: ''});

    // Hide agent details modal form
    const handleAgentDetailsModalHide = () => {
        setAgentDetailsModal({...agentDetailsModal, show: false})
    }

    // Render
    return (
        <div>
            <ul className="list-group list-group-unbordered">
                <li className="list-group-item">
                    <b>Créer le</b>
                    <span className="float-right">{dateToString(sim.creation)}</span>
                </li>
                <li className="list-group-item">
                    <b>Nom</b>
                    <span className="float-right">{sim.name}</span>
                </li>
                <li className="list-group-item">
                    <b>Numéro</b>
                    <span className="float-right">{sim.number}</span>
                </li>
                <li className="list-group-item">
                    <b>Solde flotte</b>
                    <span className="float-right text-success text-bold">{formatNumber(sim.balance)}</span>
                </li>
                <li className="list-group-item">
                    <b>Opérateur</b>
                    <span className="float-right">{sim.operator.name}</span>
                </li>
            </ul>
            {/* Modal */}
            <FormModalComponent modal={agentDetailsModal} handleClose={handleAgentDetailsModalHide}>
                <AgentDetailsContainer id={agentDetailsModal.id} />
            </FormModalComponent>
        </div>
    )
}

// Prop types to ensure destroyed props data type
SimCardComponent.propTypes = {
    sim: PropTypes.object.isRequired
};

export default React.memo(SimCardComponent);
