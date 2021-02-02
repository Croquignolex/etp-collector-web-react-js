import PropTypes from "prop-types";
import React, {useEffect, useMemo, useState} from 'react';

import ButtonComponent from "../form/ButtonComponent";
import AmountComponent from "../form/AmountComponent";
import SelectComponent from "../form/SelectComponent";
import ErrorAlertComponent from "../ErrorAlertComponent";
import {MASTER_TYPE} from "../../constants/typeConstants";
import {emitAddAfford} from "../../redux/affords/actions";
import * as constants from "../../constants/defaultConstants";
import FileDocumentComponent from "../form/FileDocumentComponent";
import {playWarningSound} from "../../functions/playSoundFunctions";
import {DEFAULT_FORM_DATA, VENDORS} from "../../constants/defaultConstants";
import {storeAddAffordRequestReset} from "../../redux/requests/affords/actions";
import {dataToArrayForSelect, mappedSims} from "../../functions/arrayFunctions";
import {requiredChecker, requiredFileChecker} from "../../functions/checkerFunctions";
import {
    applySuccess,
    requestFailed,
    requestLoading,
    requestSucceeded
} from "../../functions/generalFunctions";

// Component
function OperationsAffordsAddAffordComponent({request, sims, allSimsRequests, dispatch, handleClose}) {
    // Local state
    const [amount, setAmount] = useState(DEFAULT_FORM_DATA);
    const [doc, setDoc] = useState(constants.DEFAULT_FORM_DATA);
    const [incomingSim, setIncomingSim] = useState(DEFAULT_FORM_DATA);
    const [vendor, setVendor] = useState({...DEFAULT_FORM_DATA});

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

    const handleIncomingSelect = (data) => {
        shouldResetErrorData();
        setIncomingSim({...incomingSim,  isValid: true, data})
    }

    const handleVendorSelect = (data) => {
        shouldResetErrorData();
        setVendor({...vendor,  isValid: true, data})
    }

    const handleAmountInput = (data) => {
        shouldResetErrorData();
        setAmount({...amount, isValid: true, data})
    }

    const handleFileInput = (data) => {
        shouldResetErrorData();
        setDoc({...doc, isValid: true, data})
    }

    // Build select options
    const incomingSelectOptions = useMemo(() => {
        return dataToArrayForSelect(mappedSims(sims.filter(item => MASTER_TYPE === item.type.name)))
    }, [sims]);

    // Build vendor options
    const agentVendorOptions = useMemo(() => {
        return dataToArrayForSelect(VENDORS)
    }, []);

    // Reset error alert
    const shouldResetErrorData = () => {
        dispatch(storeAddAffordRequestReset());
    };

    // Trigger add supply form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        const _vendor = requiredChecker(vendor);
        const _amount = requiredChecker(amount);
        const _document = requiredFileChecker(doc);
        const _incomingSim = requiredChecker(incomingSim);
        // Set value
        setDoc(_document);
        setVendor(_vendor);
        setAmount(_amount);
        setIncomingSim(_incomingSim);
        const validationOK = (
            _amount.isValid && _incomingSim.isValid &&
            _vendor.isValid && _document.isValid
        );
        // Check
        if(validationOK) {
            dispatch(emitAddAfford({
                vendor: _vendor.data,
                amount: _amount.data,
                sim: _incomingSim.data,
                receipt: _document.data,
            }));
        }
        else playWarningSound();
    };

    // Render
    return (
        <>
            {requestFailed(request) && <ErrorAlertComponent message={request.message} />}
            {requestFailed(allSimsRequests) && <ErrorAlertComponent message={allSimsRequests.message} />}
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='col-sm-6'>
                        <AmountComponent input={amount}
                                         id='inputAmount'
                                         label='Montant à déstocker'
                                         handleInput={handleAmountInput}
                        />
                    </div>
                    <div className='col-sm-6'>
                        <SelectComponent input={vendor}
                                         id='inputVendor'
                                         label='Fournisseur'
                                         requestProcessing={false}
                                         options={agentVendorOptions}
                                         title='Choisir un fournisseur'
                                         handleInput={handleVendorSelect}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-6'>
                        <SelectComponent input={incomingSim}
                                         id='inputSimManger'
                                         label='Puce réceptrice'
                                         title='Choisir une puce'
                                         options={incomingSelectOptions}
                                         handleInput={handleIncomingSelect}
                                         requestProcessing={requestLoading(allSimsRequests)}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <FileDocumentComponent id='file'
                                               input={doc}
                                               label='Récus'
                                               handleInput={handleFileInput}
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
OperationsAffordsAddAffordComponent.propTypes = {
    sims: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
    allSimsRequests: PropTypes.object.isRequired
};

export default React.memo(OperationsAffordsAddAffordComponent);
