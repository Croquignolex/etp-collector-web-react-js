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
import {emitCancelFleet, emitFleetsFetch, emitNextFleetsFetch} from "../../redux/fleets/actions";
import RequestsFleetsCardsComponent from "../../components/requests/RequestsFleetsCardsComponent";
import RequestsFleetsAddFleetContainer from "../../containers/requests/RequestsFleetsAddFleetContainer";
import {
    storeFleetsRequestReset,
    storeNextFleetsRequestReset,
    storeCancelFleetRequestReset
} from "../../redux/requests/fleets/actions";
import {
    applySuccess,
    dateToString,
    formatNumber,
    needleSearch,
    requestFailed,
    requestLoading,
    requestSucceeded
} from "../../functions/generalFunctions";

// Component
function RequestsFleetsPage({fleets, fleetsRequests, hasMoreData, page, dispatch, location}) {
    // Local states
    const [needle, setNeedle] = useState('');
    const [cancelModal, setCancelModal] = useState({show: false, body: '', id: 0});
    const [fleetModal, setFleetModal] = useState({show: false, header: 'DEMANDE DE FLOTTE'});

    // Local effects
    useEffect(() => {
        dispatch(emitFleetsFetch());
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    // Local effects
    useEffect(() => {
        // Reset inputs while toast (well done) into current scope
        if(requestSucceeded(fleetsRequests.cancel)) {
            applySuccess(fleetsRequests.cancel.message);
        }
        // eslint-disable-next-line
    }, [fleetsRequests.cancel]);

    const handleNeedleInput = (data) => {
        setNeedle(data)
    }

    // Reset error alert
    const shouldResetErrorData = () => {
        dispatch(storeFleetsRequestReset());
        dispatch(storeNextFleetsRequestReset());
        dispatch(storeCancelFleetRequestReset());
    };

    // Fetch next fleets data to enhance infinite scroll
    const handleNextFleetsData = () => {
        dispatch(emitNextFleetsFetch({page}));
    }

    // Show fleet modal form
    const handleFleetModalShow = (item) => {
        setFleetModal({...fleetModal, item, show: true})
    }

    // Hide fleet modal form
    const handleFleetModalHide = () => {
        setFleetModal({...fleetModal, show: false})
    }

    // Show cancel modal form
    const handleCancelModalShow = ({id, amount, sim}) => {
        setCancelModal({...cancelModal, id, body: `Annuler la demande de flotte vers ${sim.number} de ${formatNumber(amount)}?`, show: true})
    }

    // Hide cancel modal form
    const handleCancelModalHide = () => {
        setCancelModal({...cancelModal, show: false})
    }

    // Trigger when clearance cancel confirmed on modal
    const handleCancel = (id) => {
        handleCancelModalHide();
        dispatch(emitCancelFleet({id}));
    };

    // Render
    return (
        <>
            <AppLayoutContainer pathname={location.pathname}>
                <div className="content-wrapper">
                    <HeaderComponent title="Demandes de flottes" icon={'fa fa-rss'} />
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
                                            {requestFailed(fleetsRequests.list) && <ErrorAlertComponent message={fleetsRequests.list.message} />}
                                            {requestFailed(fleetsRequests.next) && <ErrorAlertComponent message={fleetsRequests.next.message} />}
                                            {requestFailed(fleetsRequests.cancel) && <ErrorAlertComponent message={fleetsRequests.cancel.message} />}
                                            <button type="button"
                                                    className="btn btn-theme mb-2"
                                                    onClick={handleFleetModalShow}
                                            >
                                                <i className="fa fa-rss" /> Passer une demande de flotte
                                            </button>
                                            {/* Search result & Infinite scroll */}
                                            {(needle !== '' && needle !== undefined)
                                                ? <RequestsFleetsCardsComponent fleets={searchEngine(fleets, needle)}
                                                                                handleCancelModalShow={handleCancelModalShow}
                                                />
                                                : (requestLoading(fleetsRequests.list) ? <LoaderComponent /> :
                                                        <InfiniteScroll hasMore={hasMoreData}
                                                                        dataLength={fleets.length}
                                                                        next={handleNextFleetsData}
                                                                        loader={<LoaderComponent />}
                                                                        style={{ overflow: 'hidden' }}
                                                        >
                                                            <RequestsFleetsCardsComponent fleets={fleets}
                                                                                          handleCancelModalShow={handleCancelModalShow}
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
            <FormModalComponent modal={fleetModal} handleClose={handleFleetModalHide}>
                <RequestsFleetsAddFleetContainer handleClose={handleFleetModalHide} />
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
                needleSearch(item.agent.name, _needle) ||
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
RequestsFleetsPage.propTypes = {
    page: PropTypes.number.isRequired,
    fleets: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    hasMoreData: PropTypes.bool.isRequired,
    fleetsRequests: PropTypes.object.isRequired,
};

export default React.memo(RequestsFleetsPage);
