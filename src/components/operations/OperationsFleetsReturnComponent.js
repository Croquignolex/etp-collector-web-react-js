import PropTypes from "prop-types";
import React, {useEffect, useMemo, useState} from 'react';

import DisabledInput from "../form/DisabledInput";
import ButtonComponent from "../form/ButtonComponent";
import AmountComponent from "../form/AmountComponent";
import SelectComponent from "../form/SelectComponent";
import ErrorAlertComponent from "../ErrorAlertComponent";
import {emitNewReturn} from "../../redux/returns/actions";
import {emitAllSimsFetch} from "../../redux/sims/actions";
import {requiredChecker} from "../../functions/checkerFunctions";
import {emitAllAgenciesFetch} from "../../redux/agencies/actions";
import {DEFAULT_FORM_DATA} from "../../constants/defaultConstants";
import {playWarningSound} from "../../functions/playSoundFunctions";
import {storeAllSimsRequestReset} from "../../redux/requests/sims/actions";
import {storeReturnRequestReset} from "../../redux/requests/returns/actions";
import {dataToArrayForSelect, mappedSims} from "../../functions/arrayFunctions";
import {storeAllAgenciesRequestReset} from "../../redux/requests/agencies/actions";
import {AGENT_TYPE, FLEET_TYPE, RESOURCE_TYPE} from "../../constants/typeConstants";
import {applySuccess, requestFailed, requestLoading, requestSucceeded} from "../../functions/generalFunctions";

// Component
function OperationsFleetsReturnComponent({supply, request, sims, user, agencies, allSimsRequests,
                                             allAgenciesRequests, dispatch, handleClose}) {
    // Local state
    const [selectedOp, setSelectedOp] = useState('');
    const [agency, setAgency] = useState(DEFAULT_FORM_DATA);
    const [outgoingSim, setOutgoingSim] = useState(DEFAULT_FORM_DATA);
    const [incomingSim, setIncomingSim] = useState(DEFAULT_FORM_DATA);
    const [amount, setAmount] = useState({...DEFAULT_FORM_DATA, data: supply.remaining});

    // Local effects
    useEffect(() => {
        dispatch(emitAllSimsFetch());
        dispatch(emitAllAgenciesFetch());
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

    const handleOutgoingSelect = (data) => {
        shouldResetErrorData();
        const foundSim = sims.find(item => item.id === data);
        setSelectedOp(foundSim && foundSim.operator.id);
        setOutgoingSim({...outgoingSim, isValid: true, data});
    }

    const handleIncomingSelect = (data) => {
        shouldResetErrorData();
        setIncomingSim({...incomingSim,  isValid: true, data});
    }

    const handleAmountInput = (data) => {
        shouldResetErrorData();
        setAmount({...amount, isValid: true, data});
    }

    const handleAgencySelect = (data) => {
        shouldResetErrorData();
        setAgency({...agency,  isValid: true, data})
    }

    // Build select options
    const incomingSelectOptions = useMemo(() => {
        return dataToArrayForSelect(mappedSims(sims.filter(
            item => (
                (item.operator.id === selectedOp) && (
                    (item.type.name === FLEET_TYPE) ||
                    (user.id === item.collector.id)
                )
            )
        )))
    }, [sims, user, selectedOp]);

    // Build select options
    const agencySelectOptions = useMemo(() => {
        return dataToArrayForSelect(agencies);
    }, [agencies]);

    // Build select options
    const outgoingSelectOptions = useMemo(() => {
        if(supply.agent?.reference === AGENT_TYPE) {
            return dataToArrayForSelect(mappedSims(sims.filter(item => supply.agent.id === item.agent.id)))
        } else {
            return dataToArrayForSelect(mappedSims(sims.filter(
                item => (
                    (item.type.name === RESOURCE_TYPE) &&
                    (item.agency.id === agency.data)
                )
            )))
        }
    }, [sims, agency.data, supply]);

    // Reset error alert
    const shouldResetErrorData = () => {
        dispatch(storeReturnRequestReset());
        dispatch(storeAllSimsRequestReset());
        dispatch(storeAllAgenciesRequestReset());
    };

    // Trigger add supply form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        const _amount = requiredChecker(amount);
        const _outgoingSim = requiredChecker(outgoingSim);
        const _incomingSim = requiredChecker(incomingSim);
        // Set value
        setAmount(_amount);
        setOutgoingSim(_outgoingSim);
        setIncomingSim(_incomingSim);
        const validationOK = (_amount.isValid && _incomingSim.isValid && _outgoingSim.isValid);
        // Check
        if(validationOK) {
            dispatch(emitNewReturn({
                supply: supply.id,
                amount: _amount.data,
                agentSim: _outgoingSim.data,
                managerSim: _incomingSim.data
            }));
        }
        else playWarningSound();
    };

    // Render
    return (
        <>
            {requestFailed(request) && <ErrorAlertComponent message={request.message} />}
            {requestFailed(allSimsRequests) && <ErrorAlertComponent message={allSimsRequests.message} />}
            {requestFailed(allAgenciesRequests) && <ErrorAlertComponent message={allAgenciesRequests.message} />}
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='col-sm-6'>
                        <DisabledInput label='Agent/Ressource'
                                       id='inputAgent'
                                       val={supply.agent.name}
                        />
                    </div>
                    {(supply.agent.reference === RESOURCE_TYPE) && (
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
                        <SelectComponent input={outgoingSim}
                                         id='inputSimAgent'
                                         label='Compte émetteur'
                                         title='Choisir une puce'
                                         options={outgoingSelectOptions}
                                         handleInput={handleOutgoingSelect}
                                         requestProcessing={requestLoading(allSimsRequests)}
                        />
                    </div>
                    <div className='col-sm-6'>
                        <SelectComponent input={incomingSim}
                                         id='inputSimManager'
                                         label='Compte recepteur'
                                         title='Choisir une puce'
                                         options={incomingSelectOptions}
                                         handleInput={handleIncomingSelect}
                                         requestProcessing={requestLoading(allSimsRequests)}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-6'>
                        <AmountComponent input={amount}
                                         id='inputFleet'
                                         label='Flotte à retourner'
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
OperationsFleetsReturnComponent.propTypes = {
    sims: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    supply: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
    allSimsRequests: PropTypes.object.isRequired,
};

export default React.memo(OperationsFleetsReturnComponent);
