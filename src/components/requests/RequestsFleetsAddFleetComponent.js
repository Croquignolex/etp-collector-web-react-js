import PropTypes from "prop-types";
import React, {useEffect, useMemo, useState} from 'react';

import ButtonComponent from "../form/ButtonComponent";
import AmountComponent from "../form/AmountComponent";
import SelectComponent from "../form/SelectComponent";
import {emitAddFleet} from "../../redux/fleets/actions";
import ErrorAlertComponent from "../ErrorAlertComponent";
import {emitAllAgentsFetch} from "../../redux/agents/actions";
import {requiredChecker} from "../../functions/checkerFunctions";
import {emitAllExternalSimsFetch} from "../../redux/sims/actions";
import {emitAllAgenciesFetch} from "../../redux/agencies/actions";
import {DEFAULT_FORM_DATA} from "../../constants/defaultConstants";
import {playWarningSound} from "../../functions/playSoundFunctions";
import {AGENT_TYPE, RESOURCE_TYPE} from "../../constants/typeConstants";
import {storeAddFleetRequestReset} from "../../redux/requests/fleets/actions";
import {storeAllAgentsRequestReset} from "../../redux/requests/agents/actions";
import {dataToArrayForSelect, mappedSims} from "../../functions/arrayFunctions";
import {storeAllExternalSimsRequestReset} from "../../redux/requests/sims/actions";
import {storeAllAgenciesRequestReset} from "../../redux/requests/agencies/actions";
import {applySuccess, requestFailed, requestLoading, requestSucceeded} from "../../functions/generalFunctions";

// Component
function RequestsFleetsAddFleetComponent({request, sims, agents, agencies, allAgentsRequests,
                                             allSimsRequests, allAgenciesRequests, dispatch, handleClose}) {
    // Local state
    const [amount, setAmount] = useState(DEFAULT_FORM_DATA);
    const [agency, setAgency] = useState(DEFAULT_FORM_DATA);
    const [incomingSim, setIncomingSim] = useState(DEFAULT_FORM_DATA);
    const [showAgencies, setShowAgencies] = useState(false);
    const [agent, setAgent] = useState({...DEFAULT_FORM_DATA, data: 0});

    // Local effects
    useEffect(() => {
        dispatch(emitAllAgentsFetch());
        dispatch(emitAllAgenciesFetch());
        dispatch(emitAllExternalSimsFetch());
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    // Local effects
    useEffect(() => {
        // Reset inputs while toast (well done) into current scope
        if(requestSucceeded(request)) {
            applySuccess(request.message);
            handleClose()
        }
        // eslint-disable-next-line
    }, [request]);

    const handleIncomingSelect = (data) => {
        shouldResetErrorData();
        setIncomingSim({...incomingSim,  isValid: true, data})
    }

    const handleAmountInput = (data) => {
        shouldResetErrorData();
        setAmount({...amount, isValid: true, data})
    }

    const handleAgentSelect = (data) => {
        shouldResetErrorData();
        const selectedAgent = agents.find((item) => item.id === data);
        setShowAgencies(selectedAgent.reference === RESOURCE_TYPE);
        setAgent({...agent, isValid: true, data})
    }

    const handleAgencySelect = (data) => {
        shouldResetErrorData();
        setAgency({...agency,  isValid: true, data})
    }

    // Build select options
    const agentSelectOptions = useMemo(() => {
        return dataToArrayForSelect(agents)
    }, [agents]);

    // Build select options
    const agencySelectOptions = useMemo(() => {
        return dataToArrayForSelect(agencies);
    }, [agencies]);

    // Build select options
    const incomingSelectOptions = useMemo(() => {
        const selectedAgent = agents.find((item) => item.id === agent.data);
        if(selectedAgent) {
            if(selectedAgent.reference === AGENT_TYPE) {
                return dataToArrayForSelect(mappedSims(sims.filter(
                    item => (item.agent.id === agent.data)
                )))
            } else {
                return dataToArrayForSelect(mappedSims(sims.filter(
                    item => (
                        (item.type.name === RESOURCE_TYPE) &&
                        (item.agency.id === agency.data)
                    )
                )))
            }
        } else return [];
    }, [sims, agent.data, agency.data, agents]);

    // Reset error alert
    const shouldResetErrorData = () => {
        dispatch(storeAddFleetRequestReset());
        dispatch(storeAllAgentsRequestReset());
        dispatch(storeAllAgenciesRequestReset());
        dispatch(storeAllExternalSimsRequestReset());
    };

    // Trigger add supply form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        const _agent = requiredChecker(agent);
        const _amount = requiredChecker(amount);
        const _incomingSim = requiredChecker(incomingSim);
        // Set value
        setAgent(_agent);
        setAmount(_amount);
        setIncomingSim(_incomingSim);
        const validationOK = (_amount.isValid && _incomingSim.isValid && _agent.isValid);
        // Check
        if(validationOK) {
            dispatch(emitAddFleet({
                agent: _agent.data,
                amount: _amount.data,
                sim: _incomingSim.data,
            }));
        }
        else playWarningSound();
    };

    // Render
    return (
        <>
            {requestFailed(request) && <ErrorAlertComponent message={request.message} />}
            {requestFailed(allSimsRequests) && <ErrorAlertComponent message={allSimsRequests.message} />}
            {requestFailed(allAgentsRequests) && <ErrorAlertComponent message={allAgentsRequests.message} />}
            {requestFailed(allAgenciesRequests) && <ErrorAlertComponent message={allAgenciesRequests.message} />}
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='col-sm-6'>
                        <SelectComponent input={agent}
                                         id='inputSimAgent'
                                         label='Agent/ressource'
                                         options={agentSelectOptions}
                                         handleInput={handleAgentSelect}
                                         title='Choisir un agent/ressource'
                                         requestProcessing={requestLoading(allAgentsRequests)}
                        />
                    </div>
                    {showAgencies && (
                        <div className='col-sm-6'>
                            <SelectComponent id='inputAgencyAgent'
                                             input={agency}
                                             label="Agence"
                                             title='Choisir une agence'
                                             options={agencySelectOptions}
                                             handleInput={handleAgencySelect}
                                             requestProcessing={requestLoading(allAgenciesRequests)}
                            />
                        </div>
                    )}
                </div>
                <div className='row'>
                    <div className='col-sm-6'>
                        <SelectComponent input={incomingSim}
                                         id='inputSimAgent'
                                         title='Choisir une puce'
                                         options={incomingSelectOptions}
                                         label="Compte de l'agent/ressource"
                                         handleInput={handleIncomingSelect}
                                         requestProcessing={requestLoading(allSimsRequests)}
                        />
                    </div>
                    <div className='col-sm-6'>
                        <AmountComponent input={amount}
                                         id='inputFleet'
                                         label='Montant à demander'
                                         handleInput={handleAmountInput}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <ButtonComponent processing={requestLoading(request)} />
                </div>
            </form>
        </>
    )
}

// Prop types to ensure destroyed props data type
RequestsFleetsAddFleetComponent.propTypes = {
    sims: PropTypes.array.isRequired,
    agents: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
    allSimsRequests: PropTypes.object.isRequired,
    allAgentsRequests: PropTypes.object.isRequired,
};

export default React.memo(RequestsFleetsAddFleetComponent);
