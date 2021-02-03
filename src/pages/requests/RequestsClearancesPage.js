import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

import {emitAllSimsFetch} from "../../redux/sims/actions";
import {emitAllAgentsFetch} from "../../redux/agents/actions";
import HeaderComponent from "../../components/HeaderComponent";
import LoaderComponent from "../../components/LoaderComponent";
import {fleetTypeBadgeColor} from "../../functions/typeFunctions";
import AppLayoutContainer from "../../containers/AppLayoutContainer";
import ErrorAlertComponent from "../../components/ErrorAlertComponent";
import TableSearchComponent from "../../components/TableSearchComponent";
import {storeAllSimsRequestReset} from "../../redux/requests/sims/actions";
import FormModalComponent from "../../components/modals/FormModalComponent";
import {storeAllAgentsRequestReset} from "../../redux/requests/agents/actions";
import {emitClearancesFetch, emitNextClearancesFetch} from "../../redux/clearances/actions";
import RequestsClearancesCardsComponent from "../../components/requests/RequestsClearancesCardsComponent";
import RequestsClearancesAddDeclareContainer from "../../containers/requests/RequestsClearancesAddDeclareContainer";
import {storeClearancesRequestReset, storeNextClearancesRequestReset} from "../../redux/requests/clearances/actions";
import RequestsClearancesAddClearanceContainer from "../../containers/requests/RequestsClearancesAddClearanceContainer";
import {
    dateToString,
    needleSearch,
    requestFailed,
    requestLoading,
} from "../../functions/generalFunctions";

// Component
function RequestsClearancesPage({clearances, clearancesRequests, hasMoreData, page, dispatch, location}) {
    // Local states
    const [needle, setNeedle] = useState('');
    const [declareModal, setDeclareModal] = useState({show: false, header: 'PRENDRE EN CHARGE', item: {}});
    const [clearanceModal, setClearanceModal] = useState({show: false, header: 'PASSER UNE DEMANDE DE DESTOCKAGE'});

    // Local effects
    useEffect(() => {
        dispatch(emitClearancesFetch());
        dispatch(emitAllSimsFetch());
        dispatch(emitAllAgentsFetch());
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    const handleNeedleInput = (data) => {
        setNeedle(data)
    }

    // Reset error alert
    const shouldResetErrorData = () => {
        dispatch(storeAllSimsRequestReset());
        dispatch(storeAllAgentsRequestReset());
        dispatch(storeClearancesRequestReset());
        dispatch(storeNextClearancesRequestReset());
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
                                            <button type="button"
                                                    className="btn btn-theme mb-2"
                                                    onClick={handleClearanceModalShow}
                                            >
                                                <i className="fa fa-plus" /> Passe une demande de déstockage
                                            </button>
                                            {/* Search result & Infinite scroll */}
                                            {(needle !== '' && needle !== undefined)
                                                ? <RequestsClearancesCardsComponent clearances={searchEngine(clearances, needle)}
                                                                                    handleDeclareModalShow={handleDeclareModalShow}
                                                />
                                                : (requestLoading(clearancesRequests.list) ? <LoaderComponent /> :
                                                        <InfiniteScroll hasMore={hasMoreData}
                                                                        loader={<LoaderComponent />}
                                                                        dataLength={clearances.length}
                                                                        style={{ overflow: 'hidden' }}
                                                                        next={handleNextClearancesData}
                                                        >
                                                            <RequestsClearancesCardsComponent clearances={clearances}
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
                needleSearch(item.number, _needle) ||
                needleSearch(item.amount, _needle) ||
                needleSearch(item.remaining, _needle) ||
                needleSearch(item.sim.number, _needle) ||
                needleSearch(item.agent.number, _needle) ||
                needleSearch(item.claimant.name, _needle) ||
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