import PropTypes from 'prop-types';
import React, {useEffect, useMemo} from 'react';

import * as path from "../constants/pagePathConstants";
import * as setting from "../constants/settingsConstants";
import {formatNumber} from "../functions/generalFunctions";
import {emitAllFleetsFetch} from "../redux/fleets/actions";
import {emitFetchUserBalance} from "../redux/user/actions";
import HeaderComponent from "../components/HeaderComponent";
import {DASHBOARD_PAGE} from "../constants/pageNameConstants";
import {emitAllCollectorSimsFetch} from "../redux/sims/actions";
import AppLayoutContainer from "../containers/AppLayoutContainer";
import {emitAllClearancesFetch} from "../redux/clearances/actions";
import {storeAllAgentsRequestReset} from "../redux/requests/agents/actions";
import {storeAllFleetsRequestReset} from "../redux/requests/fleets/actions";
import {storeAllCollectorSimsRequestReset} from "../redux/requests/sims/actions";
import {storeUserBalanceFetchRequestReset} from "../redux/requests/user/actions";
import DashboardCardComponent from "../components/dashboard/DashboardCardComponent";
import {storeAllClearancesRequestReset} from "../redux/requests/clearances/actions";
// Component
function DashboardPage({user, fleets, sims, clearances, settings, dispatch, location,
                           balanceUserRequests, allClearancesRequests, allFleetsRequests, allSimsRequests}) {
    // Local effects
    useEffect(() => {
        dispatch(emitAllFleetsFetch());
        dispatch(emitFetchUserBalance());
        dispatch(emitAllClearancesFetch());
        dispatch(emitAllCollectorSimsFetch());
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    // Reset error alert
    const shouldResetErrorData = () => {
        dispatch(storeAllFleetsRequestReset());
        dispatch(storeAllAgentsRequestReset());
        dispatch(storeAllClearancesRequestReset());
        dispatch(storeAllCollectorSimsRequestReset());
        dispatch(storeUserBalanceFetchRequestReset());
    };

    // Data
    const cardsData = settings.cards;
    const fleetSimsFleetsData = useMemo(() => {
        return sims.filter(sim => user.id === sim.collector.id).reduce((acc, val) => acc + parseInt(val.balance), 0)
        // eslint-disable-next-line
    }, [sims]);
    const mtnFleetSimsFleetsData = useMemo(() => {
        const data = sims.filter(sim => (sim.operator.id === '1'));
        const number = data.length
        const value = data.reduce((acc, val) => acc + parseInt(val.balance, 10), 0)
        return {number, value}
    }, [sims]);
    const orangeFleetSimsFleetsData = useMemo(() => {
        const data = sims.filter(sim => (sim.operator.id === '2'));
        const number = data.length
        const value = data.reduce((acc, val) => acc + parseInt(val.balance, 10), 0)
        return {number, value}
    }, [sims]);

    // Render
    return (
        <AppLayoutContainer pathname={location.pathname}>
            <div className="content-wrapper">
                <HeaderComponent title={DASHBOARD_PAGE} icon={'fa fa-tachometer-alt'} />
                <section className="content">
                    <div className='container-fluid'>
                        <div className="row">
                            {cardsData.includes(setting.CARD_ACCOUNTS_DEBT) &&
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <DashboardCardComponent color='bg-dark'
                                                            icon='fa fa-hands-usd'
                                                            url={path.PROFILE_PAGE_PATH}
                                                            request={balanceUserRequests}
                                                            data={formatNumber(user.debt)}
                                                            label={setting.LABEL_ACCOUNTS_DEBT}
                                    />
                                </div>
                            }
                            {cardsData.includes(setting.CARD_BALANCE) &&
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <DashboardCardComponent color='bg-dark'
                                                            icon='fa fa-coins'
                                                            url={path.PROFILE_PAGE_PATH}
                                                            request={balanceUserRequests}
                                                            label={setting.LABEL_BALANCE}
                                                            data={formatNumber(user.balance)}
                                    />
                                </div>
                            }
                            {cardsData.includes(setting.CARD_FLEET_SIMS_FLEETS) &&
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <DashboardCardComponent icon='fa fa-phone'
                                                            color='bg-secondary'
                                                            url={path.SIMS_PAGE_PATH}
                                                            request={allSimsRequests}
                                                            label={setting.LABEL_FLEET_SIMS_FLEETS}
                                                            data={formatNumber(fleetSimsFleetsData)}
                                    />
                                </div>
                            }
                            {/*{cardsData.includes(setting.CARD_FLEETS_REQUESTS) &&
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <DashboardCardComponent icon='fa fa-rss'
                                                            color='bg-danger'
                                                            data={fleets.length}
                                                            request={allFleetsRequests}
                                                            url={path.REQUESTS_FLEETS_PAGE_PATH}
                                                            label={setting.LABEL_FLEETS_REQUESTS}
                                    />
                                </div>
                            }
                            {cardsData.includes(setting.CARD_CLEARANCES_REQUEST) &&
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <DashboardCardComponent color='bg-warning'
                                                            icon='fa fa-rss-square'
                                                            data={clearances.length}
                                                            request={allClearancesRequests}
                                                            url={path.REQUESTS_CLEARANCES_PAGE_PATH}
                                                            label={setting.LABEL_CLEARANCES_REQUEST}
                                    />
                                </div>
                            }*/}
                        </div>
                    </div>
                </section>
            </div>
        </AppLayoutContainer>
    )
}

// Prop types to ensure destroyed props data type
DashboardPage.propTypes = {
    sims: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    fleets: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    clearances: PropTypes.array.isRequired,
    allSimsRequests: PropTypes.object.isRequired,
    allFleetsRequests: PropTypes.object.isRequired,
    balanceUserRequests: PropTypes.object.isRequired,
    allClearancesRequests: PropTypes.object.isRequired,
};

export default React.memo(DashboardPage);