import PropTypes from "prop-types";
import React, {useEffect, useMemo, useState} from 'react';

import ButtonComponent from "../form/ButtonComponent";
import AmountComponent from "../form/AmountComponent";
import SelectComponent from "../form/SelectComponent";
import ErrorAlertComponent from "../ErrorAlertComponent";
import {emitAddLiquidate} from "../../redux/liquidates/actions";
import {requiredChecker} from "../../functions/checkerFunctions";
import {DEFAULT_FORM_DATA} from "../../constants/defaultConstants";
import {playWarningSound} from "../../functions/playSoundFunctions";
import {dataToArrayForSelect} from "../../functions/arrayFunctions";
import {storeAddLiquidateRequestReset} from "../../redux/requests/liquidates/actions";
import {applySuccess, requestFailed, requestLoading, requestSucceeded} from "../../functions/generalFunctions";

// Component
function OperationsTransfersAddTransferComponent({request, user, collectors, allCollectorsRequests, dispatch, handleClose}) {
    // Local state
    const [amount, setAmount] = useState(DEFAULT_FORM_DATA);
    const [receiver, setReceiver] = useState(DEFAULT_FORM_DATA);

    // Local effects
    useEffect(() => {
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

    const handleReceiverSelect = (data) => {
        shouldResetErrorData();
        setReceiver({...receiver,  isValid: true, data})
    }

    const handleAmountInput = (data) => {
        shouldResetErrorData();
        setAmount({...amount, isValid: true, data})
    }

    // Build select options
    const receiverSelectOptions = useMemo(() => {
        return dataToArrayForSelect(collectors)
    }, [collectors]);

    // Reset error alert
    const shouldResetErrorData = () => {
        dispatch(storeAddLiquidateRequestReset());
    };

    // Trigger add supply form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        const _amount = requiredChecker(amount);
        const _receiver = requiredChecker(receiver);
        // Set value
        setAmount(_amount);
        setReceiver(_receiver);
        const validationOK = (_amount.isValid && _receiver.isValid);
        // Check
        if(validationOK) {
            dispatch(emitAddLiquidate({
                amount: _amount.data,
                collector: _receiver.data,
            }));
        }
        else playWarningSound();
    };

    // Render
    return (
        <>
            {requestFailed(request) && <ErrorAlertComponent message={request.message} />}
            {requestFailed(allCollectorsRequests) && <ErrorAlertComponent message={allCollectorsRequests.message} />}
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='col-sm-6'>
                        <SelectComponent input={receiver}
                                         label='Recepteur'
                                         id='inputCollector'
                                         options={receiverSelectOptions}
                                         handleInput={handleReceiverSelect}
                                         title='Choisir un responsable de zone'
                                         requestProcessing={requestLoading(allCollectorsRequests)}
                        />
                    </div>
                    <div className='col-sm-6'>
                        <AmountComponent input={amount}
                                         id='inputFleet'
                                         label='Montant'
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
OperationsTransfersAddTransferComponent.propTypes = {
    user: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
    collectors: PropTypes.array.isRequired,
    allCollectorsRequests: PropTypes.object.isRequired,
};

export default React.memo(OperationsTransfersAddTransferComponent);
