import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

import HeaderComponent from "../../components/HeaderComponent";
import LoaderComponent from "../../components/LoaderComponent";
import {fleetTypeBadgeColor} from "../../functions/typeFunctions";
import AppLayoutContainer from "../../containers/AppLayoutContainer";
import ErrorAlertComponent from "../../components/ErrorAlertComponent";
import TableSearchComponent from "../../components/TableSearchComponent";
import FormModalComponent from "../../components/modals/FormModalComponent";
import DeleteModelComponent from "../../components/modals/DeleteModalComponent";
import RequestsClearancesCardsComponent from "../../components/requests/RequestsClearancesCardsComponent";
import {emitCancelClearance, emitClearancesFetch, emitNextClearancesFetch} from "../../redux/clearances/actions";
import RequestsClearancesAddDeclareContainer from "../../containers/requests/RequestsClearancesAddDeclareContainer";
import RequestsClearancesAddClearanceContainer from "../../containers/requests/RequestsClearancesAddClearanceContainer";
import {
    applySuccess,
    dateToString,
    formatNumber,
    needleSearch,
    requestFailed,
    requestLoading,
    requestSucceeded
} from "../../functions/generalFunctions";
import {
    storeClearancesRequestReset,
    storeNextClearancesRequestReset,
    storeCancelClearanceRequestReset
} from "../../redux/requests/clearances/actions";

// Component
function RequestsClearancesPage({clearances, clearancesRequests, hasMoreData, page, user, dispatch, location}) {
    // Local states
    const [needle, setNeedle] = useState('');
    const [cancelModal, setCancelModal] = useState({show: false, body: '', id: 0});
    const [declareModal, setDeclareModal] = useState({show: false, header: 'PRENDRE EN CHARGE', item: {}});
    const [clearanceModal, setClearanceModal] = useState({show: false, header: 'PASSER UNE DEMANDE DE DESTOCKAGE'});

    // Local effects
    useEffect(() => {
        dispatch(emitClearancesFetch());
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    // Local effects
    useEffect(() => {
        // Reset inputs while toast (well done) into current scope
        if(requestSucceeded(clearancesRequests.cancel)) {
            applySuccess(clearancesRequests.cancel.message);
        }
        // eslint-disable-next-line
    }, [clearancesRequests.cancel]);

    const handleNeedleInput = (data) => {
        setNeedle(data)
    }

    // Reset error alert
    const shouldResetErrorData = () => {
        dispatch(storeClearancesRequestReset());
        dispatch(storeNextClearancesRequestReset());
        dispatch(storeCancelClearanceRequestReset());
    };

    // Fetch next clearances data to enhance infinite scroll
    const handleNextClearancesData = () => {
        dispatch(emitNextClearancesFetch({page}));
    }

    // Show clearance modal form
    const handleClearanceModalShow = (item) => {
        setClearanceModal({...clearanceModal, item, show: true})
    }

    // Hide clearance modal form
    const handleClearanceModalHide = () => {
        setClearanceModal({...clearanceModal, show: false})
    }

    // Show declare modal form
    const handleDeclareModalShow = (item) => {
        setDeclareModal({...declareModal, item, show: true})
    }

    // Hide declare modal form
    const handleDeclareModalHide = () => {
        setDeclareModal({...declareModal, show: false})
    }

    // Show cancel modal form
    const handleCancelModalShow = ({id, amount, sim}) => {
        setCancelModal({...cancelModal, id, body: `Annuler la demande de déstockage vers ${sim.number} de ${formatNumber(amount)}?`, show: true})
    }

    // Hide cancel modal form
    const handleCancelModalHide = () => {
        setCancelModal({...cancelModal, show: false})
    }

    // Trigger when clearance cancel confirmed on modal
    const handleCancel = (id) => {
        handleCancelModalHide();
        dispatch(emitCancelClearance({id}));
    };

    // Render
    return (
        <>
            <AppLayoutContainer pathname={location.pathname}>
                <div className="content-wrapper">
                    <HeaderComponent title="Demandes de déstockages" icon={'fa fa-rss-square'} />
                    <section className="content">
                        <div className='container-fluid'>
                            <div className="row">
                                <div className="col-12">
                                    <div className="card custom-card-outline">
                                        {/* Search input */}
                                        <div className="card-header">
                                            <div className="card-tools">
                                                <TableSearchComponent needle={needle} handleNeedle={handleNeedleInput} />
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            {/* Error message */}
                                            {requestFailed(clearancesRequests.list) && <ErrorAlertComponent message={clearancesRequests.list.message} />}
                                            {requestFailed(clearancesRequests.next) && <ErrorAlertComponent message={clearancesRequests.next.message} />}
                                            {requestFailed(clearancesRequests.cancel) && <ErrorAlertComponent message={clearancesRequests.cancel.message} />}
                                            <button type="button"
                                                    className="btn btn-theme mb-2"
                                                    onClick={handleClearanceModalShow}
                                            >
                                                <i className="fa fa-rss-square" /> Passe une demande de déstockage
                                            </button>
                                            {/* Search result & Infinite scroll */}
                                            {(needle !== '' && needle !== undefined)
                                                ? <RequestsClearancesCardsComponent user={user}
                                                                                    clearances={searchEngine(clearances, needle)}
                                                                                    handleCancelModalShow={handleCancelModalShow}
                                                                                    handleDeclareModalShow={handleDeclareModalShow}
                                                />
                                                : (requestLoading(clearancesRequests.list) ? <LoaderComponent /> :
                                                        <InfiniteScroll hasMore={hasMoreData}
                                                                        loader={<LoaderComponent />}
                                                                        dataLength={clearances.length}
                                                                        style={{ overflow: 'hidden' }}
                                                                        next={handleNextClearancesData}
                                                        >
                                                            <RequestsClearancesCardsComponent user={user}
                                                                                              clearances={clearances}
                                                                                              handleCancelModalShow={handleCancelModalShow}
                                                                                              handleDeclareModalShow={handleDeclareModalShow}
                                                            />
                                                        </InfiniteScroll>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </AppLayoutContainer>
            {/* Modal */}
            <DeleteModelComponent modal={cancelModal}
                                  handleModal={handleCancel}
                                  handleClose={handleCancelModalHide}
            />
            <FormModalComponent modal={clearanceModal} handleClose={handleClearanceModalHide}>
                <RequestsClearancesAddClearanceContainer handleClose={handleClearanceModalHide} />
            </FormModalComponent>
            <FormModalComponent modal={declareModal} handleClose={handleDeclareModalHide}>
                <RequestsClearancesAddDeclareContainer clearance={declareModal.item}
                                                       handleClose={handleDeclareModalHide}
                />
            </FormModalComponent>
        </>
    )
}

// Search engine
function searchEngine(data, _needle) {
    // Avoid empty filtering
    if(_needle !== '' && _needle !== undefined) {
        // Filter
        data = data.filter((item) => {
            return (
                needleSearch(item.amount, _needle) ||
                needleSearch(item.remaining, _needle) ||
                needleSearch(item.sim.number, _needle) ||
                needleSearch(item.agent.number, _needle) ||
                needleSearch(item.claimant.name, _needle) ||
                needleSearch(item.operator.name, _needle) ||
                needleSearch(dateToString(item.creation), _needle) ||
                needleSearch(fleetTypeBadgeColor(item.status).text, _needle)
            )
        });
    }
    // Return data
    return data;
}

// Prop types to ensure destroyed props data type
RequestsClearancesPage.propTypes = {
    page: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    hasMoreData: PropTypes.bool.isRequired,
    clearances: PropTypes.array.isRequired,
    clearancesRequests: PropTypes.object.isRequired,
};

export default React.memo(RequestsClearancesPage);
