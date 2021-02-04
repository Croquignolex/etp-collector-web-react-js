import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

import {emitAllSimsFetch} from "../../redux/sims/actions";
import {emitAllAgentsFetch} from "../../redux/agents/actions";
import HeaderComponent from "../../components/HeaderComponent";
import LoaderComponent from "../../components/LoaderComponent";
import AppLayoutContainer from "../../containers/AppLayoutContainer";
import ErrorAlertComponent from "../../components/ErrorAlertComponent";
import TableSearchComponent from "../../components/TableSearchComponent";
import {storeAllSimsRequestReset} from "../../redux/requests/sims/actions";
import FormModalComponent from "../../components/modals/FormModalComponent";
import {storeAllAgentsRequestReset} from "../../redux/requests/agents/actions";
import NetworkFleetsCardsComponent from "../../components/network/NetworkFleetsCardsComponent";
import NetworkFleetsAddSupplyContainer from "../../containers/network/NetworkFleetsAddSupplyContainer";
import {dateToString, needleSearch, requestFailed, requestLoading} from "../../functions/generalFunctions";
import {emitNetworkSuppliesFetch, emitNextNetworkSuppliesFetch} from "../../redux/networkSupplies/actions";
import {storeNetworkSuppliesRequestReset, storeNextNetworkSuppliesRequestReset} from "../../redux/requests/networkSupplies/actions";

// Component
function NetworkFleetsPage({networkSupplies, networkSuppliesRequests, hasMoreData, page, dispatch, location}) {
    // Local states
    const [needle, setNeedle] = useState('');
    const [networkSupplyModal, setNetworkSupplyModalModal] = useState({show: false, header: 'EFFECTUER UN FLOTTAGE'});

    // Local effects
    useEffect(() => {
        dispatch(emitNetworkSuppliesFetch());
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
        dispatch(storeNetworkSuppliesRequestReset());
        dispatch(storeAllAgentsRequestReset());
        dispatch(storeNextNetworkSuppliesRequestReset());
    };

    // Fetch next network supplies data to enhance infinite scroll
    const handleNextNetworkSuppliesData = () => {
        dispatch(emitNextNetworkSuppliesFetch({page}));
    }

    // Show network supply modal form
    const handleNetworkSupplyModalShow = (item) => {
        setNetworkSupplyModalModal({...networkSupplyModal, item, show: true})
    }

    // Hide network supply modal form
    const handleNetworkSupplyModalHide = () => {
        setNetworkSupplyModalModal({...networkSupplyModal, show: false})
    }

    // Render
    return (
        <>
            <AppLayoutContainer pathname={location.pathname}>
                <div className="content-wrapper">
                    <HeaderComponent title="Flottages dans mon réseau" icon={'fa fa-rss'} />
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
                                            {requestFailed(networkSuppliesRequests.list) && <ErrorAlertComponent message={networkSuppliesRequests.list.message} />}
                                            {requestFailed(networkSuppliesRequests.next) && <ErrorAlertComponent message={networkSuppliesRequests.next.message} />}
                                            <button type="button"
                                                    className="btn btn-theme mb-2"
                                                    onClick={handleNetworkSupplyModalShow}
                                            >
                                                <i className="fa fa-plus" /> Effectuer un flottage
                                            </button>
                                            {/* Search result & Infinite scroll */}
                                            {(needle !== '' && needle !== undefined)
                                                ? <NetworkFleetsCardsComponent networkSupplies={searchEngine(networkSupplies, needle)} />
                                                : (requestLoading(networkSuppliesRequests.list) ? <LoaderComponent /> :
                                                        <InfiniteScroll hasMore={hasMoreData}
                                                                        loader={<LoaderComponent />}
                                                                        dataLength={networkSupplies.length}
                                                                        next={handleNextNetworkSuppliesData}
                                                                        style={{ overflow: 'hidden' }}
                                                        >
                                                            <NetworkFleetsCardsComponent networkSupplies={networkSupplies} />
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
            <FormModalComponent modal={networkSupplyModal} handleClose={handleNetworkSupplyModalHide}>
                <NetworkFleetsAddSupplyContainer handleClose={handleNetworkSupplyModalHide} />
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
                needleSearch(item.agent.name, _needle) ||
                needleSearch(item.sim_incoming.number, _needle) ||
                needleSearch(dateToString(item.creation), _needle)
            )
        });
    }
    // Return data
    return data;
}

// Prop types to ensure destroyed props data type
NetworkFleetsPage.propTypes = {
    page: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    hasMoreData: PropTypes.bool.isRequired,
    networkSupplies: PropTypes.array.isRequired,
    networkSuppliesRequests: PropTypes.object.isRequired,
};

export default React.memo(NetworkFleetsPage);