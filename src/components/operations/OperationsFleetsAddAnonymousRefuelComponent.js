import PropTypes from "prop-types";
import React, {useEffect, useMemo, useState} from 'react';

import InputComponent from "../form/InputComponent";
import ButtonComponent from "../form/ButtonComponent";
import AmountComponent from "../form/AmountComponent";
import SelectComponent from "../form/SelectComponent";
import ErrorAlertComponent from "../ErrorAlertComponent";
import {FLEET_TYPE} from "../../constants/typeConstants";
import {emitAllInternalSimsFetch} from "../../redux/sims/actions";
import {emitAddAnonymousRefuel} from "../../redux/refuels/actions";
import {DEFAULT_FORM_DATA} from "../../constants/defaultConstants";
import {playWarningSound} from "../../functions/playSoundFunctions";
import {phoneChecker, requiredChecker} from "../../functions/checkerFunctions";
import {dataToArrayForSelect, mappedSims} from "../../functions/arrayFunctions";
import {storeAllInternalSimsRequestReset} from "../../redux/requests/sims/actions";
import {storeAddAnonymousRefuelRequestReset} from "../../redux/requests/refuels/actions";
import {applySuccess, requestFailed, requestLoading, requestSucceeded} from "../../functions/generalFunctions";

// Component
function OperationsFleetsAddAnonymousRefuelComponent({request, sims, user, simsRequests, dispatch, handleClose}) {
    // Local state
    const [amount, setAmount] = useState(DEFAULT_FORM_DATA);
    const [sender, setSender] = useState(DEFAULT_FORM_DATA);
    const [senderSim, setSenderSim] = useState(DEFAULT_FORM_DATA);
    const [incomingSim, setIncomingSim] = useState(DEFAULT_FORM_DATA);

    // Local effects
    useEffect(() => {
        dispatch(emitAllInternalSimsFetch());
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

    const handleSenderInput = (data) => {
        shouldResetErrorData();
        setSender({...sender, isValid: true, data})
    }

    const handleSenderSimInput = (data) => {
        shouldResetErrorData();
        setSenderSim({...senderSim, isValid: true, data})
    }

    // Build select options
    const incomingSelectOptions = useMemo(() => {
        return dataToArrayForSelect(mappedSims(sims.filter(
            item => (
                (FLEET_TYPE === item.type.name)
                || (item.collector.id === user)
            )
        )))
    }, [sims, user]);

    // Reset error alert
    const shouldResetErrorData = () => {
        dispatch(storeAllInternalSimsRequestReset());
        dispatch(storeAddAnonymousRefuelRequestReset());
    };

    // Trigger add supply form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        const _amount = requiredChecker(amount);
        const _sender = requiredChecker(sender);
        const _senderSim = phoneChecker(senderSim);
        const _incomingSim = requiredChecker(incomingSim);
        // Set value
        setAmount(_amount);
        setSender(_sender);
        setIncomingSim(_incomingSim);
        const validationOK = (
            _amount.isValid && _sender.isValid &&
            _incomingSim.isValid && _senderSim.isValid
        );
        // Check
        if(validationOK) {
            dispatch(emitAddAnonymousRefuel({
                sender: _sender.data,
                amount: _amount.data,
                sim: _incomingSim.data,
                senderSim: _senderSim.data,
            }));
        }
        else playWarningSound();
    };

    // Render
    return (
        <>
            {requestFailed(request) && <ErrorAlertComponent message={request.message} />}
            {requestFailed(simsRequests) && <ErrorAlertComponent message={simsRequests.message} />}
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='col-sm-6'>
                        <AmountComponent input={amount}
                                         id='inputFleet'
                                         label='Montant à déstocker'
                                         handleInput={handleAmountInput}
                        />
                    </div>
                    <div className='col-sm-6'>
                        <InputComponent type='text'
                                        input={sender}
                                        id='inputAnonymousName'
                                        label="Nom de l'agent anonyme"
                                        handleInput={handleSenderInput}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-6'>
                        <InputComponent type='text'
                                        input={senderSim}
                                        id='inputAnonymousSim'
                                        label="Compte de l'agent anonyme"
                                        handleInput={handleSenderSimInput}
                        />
                    </div>
                    <div className='col-sm-6'>
                        <SelectComponent input={incomingSim}
                                         id='inputSimManger'
                                         label='Compte recepteur'
                                         title='Choisir une puce'
                                         options={incomingSelectOptions}
                                         handleInput={handleIncomingSelect}
                                         requestProcessing={requestLoading(simsRequests)}
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
OperationsFleetsAddAnonymousRefuelComponent.propTypes = {
    sims: PropTypes.array.isRequired,
    user: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
    simsRequests: PropTypes.object.isRequired,
};

export default React.memo(OperationsFleetsAddAnonymousRefuelComponent);
