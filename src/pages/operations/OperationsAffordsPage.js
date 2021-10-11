import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

import HeaderComponent from "../../components/HeaderComponent";
import LoaderComponent from "../../components/LoaderComponent";
import AppLayoutContainer from "../../containers/AppLayoutContainer";
import ErrorAlertComponent from "../../components/ErrorAlertComponent";
import TableSearchComponent from "../../components/TableSearchComponent";
import {OPERATIONS_AFFORDS_PAGE} from "../../constants/pageNameConstants";
import FormModalComponent from "../../components/modals/FormModalComponent";
import DeleteModelComponent from "../../components/modals/DeleteModalComponent";
import {emitAffordsFetch, emitCancelAfford, emitNextAffordsFetch} from "../../redux/affords/actions";
import OperationsAffordsCardsComponent from "../../components/operations/OperationsAffordsCardsComponent";
import OperationsAffordsAddAffordContainer from "../../containers/operations/OperationsAffordsAddAffordContainer";
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
    storeAffordsRequestReset,
    storeNextAffordsRequestReset,
    storeCancelAffordRequestReset
} from "../../redux/requests/affords/actions";

// Component
function OperationsAffordsPage({affords, affordsRequests, hasMoreData, page, dispatch, location}) {
    // Local states
    const [needle, setNeedle] = useState('');
    const [cancelModal, setCancelModal] = useState({show: false, body: '', id: 0});
    const [affordModal, setAffordModal] = useState({show: false, header: 'EFFECTUER UN APPROVISIONNEMENT'});

    // Local effects
    useEffect(() => {
        dispatch(emitAffordsFetch());
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    // Local effects
    useEffect(() => {
        // Reset inputs while toast (well done) into current scope
        if(requestSucceeded(affordsRequests.cancel)) {
            applySuccess(affordsRequests.cancel.message);
        }
        // eslint-disable-next-line
    }, [affordsRequests.cancel]);

    const handleNeedleInput = (data) => {
        setNeedle(data)
    }

    // Reset error alert
    const shouldResetErrorData = () => {
        dispatch(storeAffordsRequestReset());
        dispatch(storeNextAffordsRequestReset());
        dispatch(storeCancelAffordRequestReset());
    };

    // Fetch next affords data to enhance infinite scroll
    const handleNextAffordsData = () => {
        dispatch(emitNextAffordsFetch({page}));
    }

    // Show afford modal form
    const handleAffordModalShow = (item) => {
        setAffordModal({...affordModal, item, show: true})
    }

    // Hide afford modal form
    const handleAffordModalHide = () => {
        setAffordModal({...affordModal, show: false})
    }

    // Show cancel modal form
    const handleCancelModalShow = ({id, amount, sim}) => {
        setCancelModal({...cancelModal, id, body: `Annuler l'apporvisionnement vers ${sim.number} de ${formatNumber(amount)}?`, show: true})
    }

    // Hide cancel modal form
    const handleCancelModalHide = () => {
        setCancelModal({...cancelModal, show: false})
    }

    // Trigger when clearance cancel confirmed on modal
    const handleCancel = (id) => {
        handleCancelModalHide();
        dispatch(emitCancelAfford({id}));
    };

    // Render
    return (
        <>
            <AppLayoutContainer pathname={location.pathname}>
                <div className="content-wrapper">
                    <HeaderComponent title={OPERATIONS_AFFORDS_PAGE} icon={'fa fa-wifi'} />
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
                                            {requestFailed(affordsRequests.list) && <ErrorAlertComponent message={affordsRequests.list.message} />}
                                            {requestFailed(affordsRequests.next) && <ErrorAlertComponent message={affordsRequests.next.message} />}
                                            {requestFailed(affordsRequests.cancel) && <ErrorAlertComponent message={affordsRequests.cancel.message} />}
                                            <button type="button"
                                                    className="btn btn-theme mb-2"
                                                    onClick={handleAffordModalShow}
                                            >
                                                <i className="fa fa-wifi" /> Effectuer un approvisionnement
                                            </button>
                                            {/* Search result & Infinite scroll */}
                                            {(needle !== '' && needle !== undefined)
                                                ? <OperationsAffordsCardsComponent affords={searchEngine(affords, needle)}
                                                                                   handleCancelModalShow={handleCancelModalShow}
                                                />
                                                : (requestLoading(affordsRequests.list) ? <LoaderComponent /> :
                                                        <InfiniteScroll hasMore={hasMoreData}
                                                                        dataLength={affords.length}
                                                                        loader={<LoaderComponent />}
                                                                        next={handleNextAffordsData}
                                                                        style={{ overflow: 'hidden' }}
                                                        >
                                                            <OperationsAffordsCardsComponent affords={affords}
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
            <FormModalComponent modal={affordModal} handleClose={handleAffordModalHide}>
                <OperationsAffordsAddAffordContainer handleClose={handleAffordModalHide} />
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
                needleSearch(item.vendor, _needle) ||
                needleSearch(item.sim.number, _needle) ||
                needleSearch(item.operator.name, _needle) ||
                needleSearch(item.collector.name, _needle) ||
                needleSearch(dateToString(item.creation), _needle)
            )
        });
    }
    // Return data
    return data;
}

// Prop types to ensure destroyed props data type
OperationsAffordsPage.propTypes = {
    page: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
    affords: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired,
    hasMoreData: PropTypes.bool.isRequired,
    affordsRequests: PropTypes.object.isRequired,
};

export default React.memo(OperationsAffordsPage);
