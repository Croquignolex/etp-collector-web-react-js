import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

import HeaderComponent from "../../components/HeaderComponent";
import LoaderComponent from "../../components/LoaderComponent";
import AppLayoutContainer from "../../containers/AppLayoutContainer";
import ErrorAlertComponent from "../../components/ErrorAlertComponent";
import FormModalComponent from "../../components/modals/FormModalComponent";
import {OPERATIONS_CLEARANCES_PAGE} from "../../constants/pageNameConstants";
import DeleteModelComponent from "../../components/modals/DeleteModalComponent";
import TableSearchWithButtonComponent from "../../components/TableSearchWithButtonComponent";
import OperationsClearancesCardsComponent from "../../components/operations/OperationsClearancesCardsComponent";
import OperationsClearancesAddRefuelContainer from "../../containers/operations/OperationsClearancesAddRefuelContainer";
import OperationsFleetsAddAnonymousRefuelContainer from "../../containers/operations/OperationsFleetsAddAnonymousRefuelContainer";
import {
    emitRefuelsFetch,
    emitCancelRefuel,
    emitNextRefuelsFetch,
    emitSearchRefuelsFetch
} from "../../redux/refuels/actions";
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
    storeRefuelsRequestReset,
    storeNextRefuelsRequestReset,
    storeCancelRefuelRequestReset
} from "../../redux/requests/refuels/actions";

// Component
function OperationsClearancesPage({refuels, refuelsRequests, hasMoreData, page, dispatch, location}) {
    // Local states
    const [needle, setNeedle] = useState('');
    const [cancelModal, setCancelModal] = useState({show: false, body: '', id: 0});
    const [refuelModal, setRefuelModal] = useState({show: false, header: 'EFFECTUER UN DESTOCKAGE'});
    const [anonymousRefuelModal, setAnonymousRefuelModal] = useState({show: false, header: 'EFFECTUER UN DESTOCKAGE ANONYME'});

    // Local effects
    useEffect(() => {
        dispatch(emitRefuelsFetch());
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    // Local effects
    useEffect(() => {
        // Reset inputs while toast (well done) into current scope
        if(requestSucceeded(refuelsRequests.cancel)) {
            applySuccess(refuelsRequests.cancel.message);
        }
        // eslint-disable-next-line
    }, [refuelsRequests.cancel]);

    const handleNeedleInput = (data) => {
        setNeedle(data)
    }

    const handleSearchInput = () => {
        dispatch(emitSearchRefuelsFetch({needle}));
    }

    // Reset error alert
    const shouldResetErrorData = () => {
        dispatch(storeRefuelsRequestReset());
        dispatch(storeNextRefuelsRequestReset());
        dispatch(storeCancelRefuelRequestReset());
    };

    // Fetch next refuels data to enhance infinite scroll
    const handleNextRefuelsData = () => {
        dispatch(emitNextRefuelsFetch({page}));
    }

    // Show refuel modal form
    const handleRefuelModalShow = (item) => {
        setRefuelModal({...refuelModal, item, show: true})
    }

    // Hide refuel modal form
    const handleRefuelModalHide = () => {
        setRefuelModal({...refuelModal, show: false})
    }

    // Show anonymous refuel modal form
    const handleAnonymousRefuelModalShow = (item) => {
        setAnonymousRefuelModal({...anonymousRefuelModal, item, show: true})
    }

    // Hide anonymous refuel modal form
    const handleAnonymousRefuelModalHide = () => {
        setAnonymousRefuelModal({...anonymousRefuelModal, show: false})
    }

    // Show cancel modal form
    const handleCancelModalShow = ({id, amount, sim}) => {
        setCancelModal({...cancelModal, id, body: `Annuler le déstockage vers ${sim.number} de ${formatNumber(amount)}?`, show: true})
    }

    // Hide cancel modal form
    const handleCancelModalHide = () => {
        setCancelModal({...cancelModal, show: false})
    }

    // Trigger when clearance cancel confirmed on modal
    const handleCancel = (id) => {
        handleCancelModalHide();
        dispatch(emitCancelRefuel({id}));
    };

    // Render
    return (
        <>
            <AppLayoutContainer pathname={location.pathname}>
                <div className="content-wrapper">
                    <HeaderComponent title={OPERATIONS_CLEARANCES_PAGE} icon={'fa fa-rss-square'} />
                    <section className="content">
                        <div className='container-fluid'>
                            <div className="row">
                                <div className="col-12">
                                    <div className="card custom-card-outline">
                                        {/* Search input */}
                                        <div className="card-header">
                                            <div className="card-tools">
                                                <TableSearchWithButtonComponent needle={needle}
                                                                                handleNeedle={handleNeedleInput}
                                                                                handleSearch={handleSearchInput}
                                                />
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            {/* Error message */}
                                            {requestFailed(refuelsRequests.list) && <ErrorAlertComponent message={refuelsRequests.list.message} />}
                                            {requestFailed(refuelsRequests.next) && <ErrorAlertComponent message={refuelsRequests.next.message} />}
                                            {requestFailed(refuelsRequests.cancel) && <ErrorAlertComponent message={refuelsRequests.cancel.message} />}
                                            <button type="button"
                                                    className="btn btn-theme mb-2"
                                                    onClick={handleRefuelModalShow}
                                            >
                                                <i className="fa fa-rss-square" /> Effectuer un déstockage
                                            </button>
                                            <button type="button"
                                                    className="btn btn-theme mb-2 ml-2"
                                                    onClick={handleAnonymousRefuelModalShow}
                                            >
                                                <i className="fa fa-user-slash" /> Effectuer un déstockage anonyme
                                            </button>
                                            {/* Search result & Infinite scroll */}
                                            {requestLoading(refuelsRequests.list) ? <LoaderComponent /> : ((needle !== '' && needle !== undefined) ?
                                                    (
                                                        <OperationsClearancesCardsComponent refuels={searchEngine(refuels, needle)}
                                                                                            handleCancelModalShow={handleCancelModalShow}
                                                        />
                                                    ) :
                                                    (
                                                        <InfiniteScroll hasMore={hasMoreData}
                                                                        dataLength={refuels.length}
                                                                        loader={<LoaderComponent />}
                                                                        next={handleNextRefuelsData}
                                                                        style={{ overflow: 'hidden' }}
                                                        >
                                                            <OperationsClearancesCardsComponent refuels={refuels}
                                                                                                handleCancelModalShow={handleCancelModalShow}
                                                            />
                                                        </InfiniteScroll>
                                                    )
                                            )}
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
            <FormModalComponent modal={refuelModal} handleClose={handleRefuelModalHide}>
                <OperationsClearancesAddRefuelContainer handleClose={handleRefuelModalHide} />
            </FormModalComponent>
            <FormModalComponent modal={anonymousRefuelModal} handleClose={handleAnonymousRefuelModalHide}>
                <OperationsFleetsAddAnonymousRefuelContainer handleClose={handleAnonymousRefuelModalHide} />
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
                needleSearch(item.sim.number, _needle) ||
                needleSearch(item.agent.name, _needle) ||
                needleSearch(item.operator.name, _needle) ||
                needleSearch(dateToString(item.creation), _needle)
            )
        });
    }
    // Return data
    return data;
}

// Prop types to ensure destroyed props data type
OperationsClearancesPage.propTypes = {
    page: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
    refuels: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired,
    hasMoreData: PropTypes.bool.isRequired,
    refuelsRequests: PropTypes.object.isRequired,
};

export default React.memo(OperationsClearancesPage);
