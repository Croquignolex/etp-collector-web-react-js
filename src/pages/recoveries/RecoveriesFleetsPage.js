import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

import HeaderComponent from "../../components/HeaderComponent";
import LoaderComponent from "../../components/LoaderComponent";
import {fleetTypeBadgeColor} from "../../functions/typeFunctions";
import AppLayoutContainer from "../../containers/AppLayoutContainer";
import ErrorAlertComponent from "../../components/ErrorAlertComponent";
import {RECOVERIES_FLEET_PAGE} from "../../constants/pageNameConstants";
import TableSearchComponent from "../../components/TableSearchComponent";
import DeleteModelComponent from "../../components/modals/DeleteModalComponent";
import {emitCancelReturn, emitNextReturnsFetch, emitReturnsFetch} from "../../redux/returns/actions";
import RecoveriesFleetsCardsComponent from "../../components/recoveries/RecoveriesFleetsCardsComponent";
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
    storeReturnsRequestReset,
    storeNextReturnsRequestReset,
    storeCancelReturnRequestReset
} from "../../redux/requests/returns/actions";

// Component
function RecoveriesFleetsPage({returns, returnsRequests, hasMoreData, page, dispatch, location}) {
    // Local states
    const [needle, setNeedle] = useState('');
    const [cancelModal, setCancelModal] = useState({show: false, body: '', id: 0});

    // Local effects
    useEffect(() => {
        dispatch(emitReturnsFetch());
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    // Local effects
    useEffect(() => {
        // Reset inputs while toast (well done) into current scope
        if(requestSucceeded(returnsRequests.cancel)) {
            applySuccess(returnsRequests.cancel.message);
        }
        // eslint-disable-next-line
    }, [returnsRequests.cancel]);

    const handleNeedleInput = (data) => {
        setNeedle(data)
    }

    // Reset error alert
    const shouldResetErrorData = () => {
        dispatch(storeReturnsRequestReset());
        dispatch(storeNextReturnsRequestReset());
        dispatch(storeCancelReturnRequestReset());
    };

    // Fetch next returns data to enhance infinite scroll
    const handleNextReturnsData = () => {
        dispatch(emitNextReturnsFetch({page}));
    }

    // Show cancel modal form
    const handleCancelModalShow = ({id, amount, sim_incoming}) => {
        setCancelModal({...cancelModal, id, body: `Annuler le retour flotte vers ${sim_incoming.number} de ${formatNumber(amount)}?`, show: true})
    }

    // Hide cancel modal form
    const handleCancelModalHide = () => {
        setCancelModal({...cancelModal, show: false})
    }

    // Trigger when clearance cancel confirmed on modal
    const handleCancel = (id) => {
        handleCancelModalHide();
        dispatch(emitCancelReturn({id}));
    };

    // Render
    return (
        <>
            <AppLayoutContainer pathname={location.pathname}>
                <div className="content-wrapper">
                    <HeaderComponent title={RECOVERIES_FLEET_PAGE} icon={'fa fa-redo'} />
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
                                            {requestFailed(returnsRequests.list) && <ErrorAlertComponent message={returnsRequests.list.message} />}
                                            {requestFailed(returnsRequests.next) && <ErrorAlertComponent message={returnsRequests.next.message} />}
                                            {requestFailed(returnsRequests.cancel) && <ErrorAlertComponent message={returnsRequests.cancel.message} />}
                                            {/* Search result & Infinite scroll */}
                                            {(needle !== '' && needle !== undefined)
                                                ? <RecoveriesFleetsCardsComponent returns={searchEngine(returns, needle)}
                                                                                  handleCancelModalShow={handleCancelModalShow}
                                                />
                                                : (requestLoading(returnsRequests.list) ? <LoaderComponent /> :
                                                        <InfiniteScroll hasMore={hasMoreData}
                                                                        dataLength={returns.length}
                                                                        loader={<LoaderComponent />}
                                                                        next={handleNextReturnsData}
                                                                        style={{ overflow: 'hidden' }}
                                                        >
                                                            <RecoveriesFleetsCardsComponent returns={returns}
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
            <DeleteModelComponent modal={cancelModal}
                                  handleModal={handleCancel}
                                  handleClose={handleCancelModalHide}
            />
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
                needleSearch(item.agent.name, _needle) ||
                needleSearch(item.collector.name, _needle) ||
                needleSearch(item.sim_incoming.number, _needle) ||
                needleSearch(item.sim_outgoing.number, _needle) ||
                needleSearch(dateToString(item.creation), _needle) ||
                needleSearch(fleetTypeBadgeColor(item.status).text, _needle)
            )
        });
    }
    // Return data
    return data;
}

// Prop types to ensure destroyed props data type
RecoveriesFleetsPage.propTypes = {
    page: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
    returns: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired,
    hasMoreData: PropTypes.bool.isRequired,
    returnsRequests: PropTypes.object.isRequired,
};

export default React.memo(RecoveriesFleetsPage);
