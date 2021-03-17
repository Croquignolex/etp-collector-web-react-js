import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

import HeaderComponent from "../../components/HeaderComponent";
import LoaderComponent from "../../components/LoaderComponent";
import AppLayoutContainer from "../../containers/AppLayoutContainer";
import {emitAllCollectorsFetch} from "../../redux/collectors/actions";
import ErrorAlertComponent from "../../components/ErrorAlertComponent";
import TableSearchComponent from "../../components/TableSearchComponent";
import {OPERATIONS_TRANSFERS_PAGE} from "../../constants/pageNameConstants";
import FormModalComponent from "../../components/modals/FormModalComponent";
import ConfirmModalComponent from "../../components/modals/ConfirmModalComponent";
import {storeAllCollectorsRequestReset} from "../../redux/requests/collectors/actions";
import {emitNextLiquidatesFetch, emitLiquidatesFetch} from "../../redux/liquidates/actions";
import OperationsLiquidatesCardsComponent from "../../components/operations/OperationsLiquidatesCardsComponent";
import {storeNextLiquidatesRequestReset, storeLiquidatesRequestReset} from "../../redux/requests/liquidates/actions";
import {dateToString, formatNumber, needleSearch, requestFailed, requestLoading} from "../../functions/generalFunctions";
import OperationsLiquidatesAddLiquidateContainer from "../../containers/operations/OperationsLiquidatesAddLiquidateContainer";

// Component
function OperationsLiquidatesPage({liquidates, liquidatesRequests, hasMoreData, page, dispatch, location}) {
    // Local states
    const [needle, setNeedle] = useState('');
    const [confirmModal, setConfirmModal] = useState({show: false, body: '', id: 0});
    const [liquidateModal, setLiquidateModal] = useState({show: false, header: 'EFFECTUER UN TRANSFERT DE LIQUIDITES'});

    // Local effects
    useEffect(() => {
        dispatch(emitLiquidatesFetch());
        dispatch(emitAllCollectorsFetch());
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
        dispatch(storeLiquidatesRequestReset());
        dispatch(storeAllCollectorsRequestReset());
        dispatch(storeNextLiquidatesRequestReset());
        dispatch(storeConfirmLiquidateRequestReset());
    };

    // Fetch next liquidates data to enhance infinite scroll
    const handleNextLiquidatesData = () => {
        dispatch(emitNextLiquidatesFetch({page}));
    }

    // Show liquidate modal form
    const handleLiquidateModalShow = (item) => {
        setLiquidateModal({...liquidateModal, item, show: true})
    }

    // Hide liquidate modal form
    const handleLiquidateModalHide = () => {
        setLiquidateModal({...liquidateModal, show: false})
    }

    // Show confirm modal form
    const handleConfirmModalShow = ({id, amount}) => {
        setConfirmModal({...confirmModal, id, body: `Confirmer le transfert de liquidité de ${formatNumber(amount)}?`, show: true})
    }

    // Hide confirm modal form
    const handleConfirmModalHide = () => {
        setConfirmModal({...confirmModal, show: false})
    }

    // Trigger when afford confirm confirmed on modal
    const handleConfirm = (id) => {
        handleConfirmModalHide();
        dispatch(emitConfirmLiquidate({id}));
    };

    // Render
    return (
        <>
            <AppLayoutContainer pathname={location.pathname}>
                <div className="content-wrapper">
                    <HeaderComponent title={OPERATIONS_TRANSFERS_PAGE} icon={'fa fa-exchange'} />
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
                                            {requestFailed(liquidatesRequests.list) && <ErrorAlertComponent message={liquidatesRequests.list.message} />}
                                            {requestFailed(liquidatesRequests.next) && <ErrorAlertComponent message={liquidatesRequests.next.message} />}
                                            {requestFailed(liquidatesRequests.apply) && <ErrorAlertComponent message={liquidatesRequests.apply.message} />}
                                            <button type="button"
                                                    className="btn btn-theme mb-2"
                                                    onClick={handleLiquidateModalShow}
                                            >
                                                <i className="fa fa-plus" /> Effectuer un transfert de liquidités
                                            </button>
                                            {/* Search result & Infinite scroll */}
                                            {(needle !== '' && needle !== undefined)
                                                ? <OperationsLiquidatesCardsComponent liquidates={searchEngine(liquidates, needle)}
                                                                                      handleConfirmModalShow={handleConfirmModalShow}
                                                />
                                                : (requestLoading(liquidatesRequests.list) ? <LoaderComponent /> :
                                                        <InfiniteScroll hasMore={hasMoreData}
                                                                        loader={<LoaderComponent />}
                                                                        dataLength={liquidates.length}
                                                                        next={handleNextLiquidatesData}
                                                                        style={{ overflow: 'hidden' }}
                                                        >
                                                            <OperationsLiquidatesCardsComponent liquidates={liquidates}
                                                                                                handleConfirmModalShow={handleConfirmModalShow}
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
            <FormModalComponent modal={liquidateModal} handleClose={handleLiquidateModalHide}>
                <OperationsLiquidatesAddLiquidateContainer handleClose={handleLiquidateModalHide} />
            </FormModalComponent>
            <ConfirmModalComponent modal={confirmModal}
                                   handleModal={handleConfirm}
                                   handleClose={handleConfirmModalHide}
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
                needleSearch(item.user.name, _needle) ||
                needleSearch(item.sim_incoming.number, _needle) ||
                needleSearch(item.sim_outgoing.number, _needle) ||
                needleSearch(dateToString(item.creation), _needle)
            )
        });
    }
    // Return data
    return data;
}

// Prop types to ensure destroyed props data type
OperationsLiquidatesPage.propTypes = {
    page: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    liquidates: PropTypes.array.isRequired,
    hasMoreData: PropTypes.bool.isRequired,
    liquidatesRequests: PropTypes.object.isRequired,
};

export default React.memo(OperationsLiquidatesPage);