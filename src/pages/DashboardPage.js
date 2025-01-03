import PropTypes from 'prop-types';
import React, {useEffect, useMemo} from 'react';

import {DONE} from "../constants/typeConstants";
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
import DashboardWithOperatorCardComponent from "../components/dashboard/DashboardWithOperatorCardComponent";
import {SIMS_PAGE_PATH} from "../constants/pagePathConstants";

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
    const yupFleetSimsFleetsData = useMemo(() => {
        const data = sims.filter(sim => (sim.operator.id === '3'));
        const number = data.length
        const value = data.reduce((acc, val) => acc + parseInt(val.balance, 10), 0)
        return {number, value}
    }, [sims]);
    const yoomeeFleetSimsFleetsData = useMemo(() => {
        const data = sims.filter(sim => (sim.operator.id === '4'));
        const number = data.length
        const value = data.reduce((acc, val) => acc + parseInt(val.balance, 10), 0)
        return {number, value}
    }, [sims]);
    const mtnFleetsData = useMemo(() => {
        const data = fleets.filter(fleet => (fleet.status !== DONE) && fleet.operator.id === '1');
        const number = data.length
        const value = data.reduce((acc, val) => acc + parseInt(val.amount), 0)
        return {number, value}
    }, [fleets]);
    const orangeFleetsData = useMemo(() => {
        const data = fleets.filter(fleet => (fleet.status !== DONE) && fleet.operator.id === '2');
        const number = data.length
        const value = data.reduce((acc, val) => acc + parseInt(val.amount), 0)
        return {number, value}
    }, [fleets]);
    const yupFleetsData = useMemo(() => {
        const data = fleets.filter(fleet => (fleet.status !== DONE) && fleet.operator.id === '3');
        const number = data.length
        const value = data.reduce((acc, val) => acc + parseInt(val.amount), 0)
        return {number, value}
    }, [fleets]);
    const yoomeeFleetsData = useMemo(() => {
        const data = fleets.filter(fleet => (fleet.status !== DONE) && fleet.operator.id === '4');
        const number = data.length
        const value = data.reduce((acc, val) => acc + parseInt(val.amount), 0)
        return {number, value}
    }, [fleets]);
    const mtnClearancesData = useMemo(() => {
        const data = clearances.filter(clearance => (clearance.status !== DONE) && clearance.operator.id === '1');
        const number = data.length
        const value = data.reduce((acc, val) => acc + parseInt(val.amount), 0)
        return {number, value}
    }, [clearances]);
    const orangeClearancesData = useMemo(() => {
        const data = clearances.filter(clearance => (clearance.status !== DONE) && clearance.operator.id === '2');
        const number = data.length
        const value = data.reduce((acc, val) => acc + parseInt(val.amount), 0)
        return {number, value}
    }, [clearances]);
    const yupClearancesData = useMemo(() => {
        const data = clearances.filter(clearance => (clearance.status !== DONE) && clearance.operator.id === '3');
        const number = data.length
        const value = data.reduce((acc, val) => acc + parseInt(val.amount), 0)
        return {number, value}
    }, [clearances]);
    const yoomeeClearancesData = useMemo(() => {
        const data = clearances.filter(clearance => (clearance.status !== DONE) && clearance.operator.id === '4');
        const number = data.length
        const value = data.reduce((acc, val) => acc + parseInt(val.amount), 0)
        return {number, value}
    }, [clearances]);

    // Render
    return (
        <AppLayoutContainer pathname={location.pathname}>
            <div className="content-wrapper">
                <HeaderComponent title={DASHBOARD_PAGE} icon={'fa fa-tachometer-alt'} />
                <section className="content">
                    <div className='container-fluid'>
                        {/* Money */}
                        <div className="row">
                            {cardsData.includes(setting.CARD_ACCOUNTS_DEBT) &&
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <DashboardCardComponent color='bg-dark'
                                                            icon='fa fa-hands'
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
                        </div>

                        {/* Fleets */}
                        <div className="row">
                            {cardsData.includes(setting.CARD_FLEET_SIMS_FLEETS_MTN) &&
                            <div className="col-lg-3 col-md-4 col-sm-6">
                                <DashboardWithOperatorCardComponent color='bg-secondary'
                                                                    operator={{id: '1'}}
                                                                    request={allSimsRequests}
                                                                    url={path.SIMS_PAGE_PATH}
                                                                    data={formatNumber(mtnFleetSimsFleetsData.value)}
                                                                    label={`${setting.LABEL_FLEET_SIMS_FLEETS_MTN} (${mtnFleetSimsFleetsData.number})`}
                                />
                            </div>
                            }
                            {cardsData.includes(setting.CARD_FLEET_SIMS_FLEETS_ORANGE) &&
                            <div className="col-lg-3 col-md-4 col-sm-6">
                                <DashboardWithOperatorCardComponent color='bg-secondary'
                                                                    operator={{id: '2'}}
                                                                    request={allSimsRequests}
                                                                    url={path.SIMS_PAGE_PATH}
                                                                    data={formatNumber(orangeFleetSimsFleetsData.value)}
                                                                    label={`${setting.LABEL_FLEET_SIMS_FLEETS_ORANGE} (${orangeFleetSimsFleetsData.number})`}
                                />
                            </div>
                            }
                            {cardsData.includes(setting.CARD_FLEET_SIMS_FLEETS_YUP) &&
                            <div className="col-lg-3 col-md-4 col-sm-6">
                                <DashboardWithOperatorCardComponent color='bg-secondary'
                                                                    operator={{id: '3'}}
                                                                    request={allSimsRequests}
                                                                    url={path.SIMS_PAGE_PATH}
                                                                    data={formatNumber(yupFleetSimsFleetsData.value)}
                                                                    label={`${setting.LABEL_FLEET_SIMS_FLEETS_YUP} (${yupFleetSimsFleetsData.number})`}
                                />
                            </div>
                            }
                            {cardsData.includes(setting.CARD_FLEET_SIMS_FLEETS_YOOMEE) &&
                            <div className="col-lg-3 col-md-4 col-sm-6">
                                <DashboardWithOperatorCardComponent color='bg-secondary'
                                                                    operator={{id: '4'}}
                                                                    request={allSimsRequests}
                                                                    url={path.SIMS_PAGE_PATH}
                                                                    data={formatNumber(yoomeeFleetSimsFleetsData.value)}
                                                                    label={`${setting.LABEL_FLEET_SIMS_FLEETS_YOOMEE} (${yoomeeFleetSimsFleetsData.number})`}
                                />
                            </div>
                            }
                        </div>

                        {/* Fleets requests */}
                        <div className="row">
                            {cardsData.includes(setting.CARD_FLEETS_REQUESTS_MTN) &&
                            <div className="col-lg-3 col-md-4 col-sm-6">
                                <DashboardWithOperatorCardComponent color='bg-success'
                                                                    operator={{id: '1'}}
                                                                    request={allFleetsRequests}
                                                                    url={path.REQUESTS_FLEETS_PAGE_PATH}
                                                                    data={formatNumber(mtnFleetsData.value)}
                                                                    label={`${setting.LABEL_FLEETS_REQUESTS_MTN} (${mtnFleetsData.number})`}
                                />
                            </div>
                            }
                            {cardsData.includes(setting.CARD_FLEETS_REQUESTS_ORANGE) &&
                            <div className="col-lg-3 col-md-4 col-sm-6">
                                <DashboardWithOperatorCardComponent color='bg-success'
                                                                    operator={{id: '2'}}
                                                                    request={allFleetsRequests}
                                                                    url={path.REQUESTS_FLEETS_PAGE_PATH}
                                                                    data={formatNumber(orangeFleetsData.value)}
                                                                    label={`${setting.LABEL_FLEETS_REQUESTS_ORANGE} (${orangeFleetsData.number})`}
                                />
                            </div>
                            }
                            {cardsData.includes(setting.CARD_FLEETS_REQUESTS_YUP) &&
                            <div className="col-lg-3 col-md-4 col-sm-6">
                                <DashboardWithOperatorCardComponent color='bg-success'
                                                                    operator={{id: '3'}}
                                                                    request={allFleetsRequests}
                                                                    url={path.REQUESTS_FLEETS_PAGE_PATH}
                                                                    data={formatNumber(yupFleetsData.value)}
                                                                    label={`${setting.LABEL_FLEETS_REQUESTS_YUP} (${yupFleetsData.number})`}
                                />
                            </div>
                            }
                            {cardsData.includes(setting.CARD_FLEETS_REQUESTS_YOOMEE) &&
                            <div className="col-lg-3 col-md-4 col-sm-6">
                                <DashboardWithOperatorCardComponent color='bg-success'
                                                                    operator={{id: '4'}}
                                                                    request={allFleetsRequests}
                                                                    url={path.REQUESTS_FLEETS_PAGE_PATH}
                                                                    data={formatNumber(yoomeeFleetsData.value)}
                                                                    label={`${setting.LABEL_FLEETS_REQUESTS_YOOMEE} (${yoomeeFleetsData.number})`}
                                />
                            </div>
                            }
                        </div>

                        {/* Clearances requests */}
                        <div className="row">
                            {cardsData.includes(setting.CARD_CLEARANCES_REQUEST_MTN) &&
                            <div className="col-lg-3 col-md-4 col-sm-6">
                                <DashboardWithOperatorCardComponent color='bg-primary'
                                                                    operator={{id: '1'}}
                                                                    request={allClearancesRequests}
                                                                    url={path.REQUESTS_CLEARANCES_PAGE_PATH}
                                                                    data={formatNumber(mtnClearancesData.value)}
                                                                    label={`${setting.LABEL_CLEARANCES_REQUEST_MTN} (${mtnClearancesData.number})`}
                                />
                            </div>
                            }
                            {cardsData.includes(setting.CARD_CLEARANCES_REQUEST_ORANGE) &&
                            <div className="col-lg-3 col-md-4 col-sm-6">
                                <DashboardWithOperatorCardComponent color='bg-primary'
                                                                    operator={{id: '2'}}
                                                                    request={allClearancesRequests}
                                                                    url={path.REQUESTS_CLEARANCES_PAGE_PATH}
                                                                    data={formatNumber(orangeClearancesData.value)}
                                                                    label={`${setting.LABEL_CLEARANCES_REQUEST_ORANGE} (${orangeClearancesData.number})`}
                                />
                            </div>
                            }
                            {cardsData.includes(setting.CARD_CLEARANCES_REQUEST_YUP) &&
                            <div className="col-lg-3 col-md-4 col-sm-6">
                                <DashboardWithOperatorCardComponent color='bg-primary'
                                                                    operator={{id: '3'}}
                                                                    request={allClearancesRequests}
                                                                    url={path.REQUESTS_CLEARANCES_PAGE_PATH}
                                                                    data={formatNumber(yupClearancesData.value)}
                                                                    label={`${setting.LABEL_CLEARANCES_REQUEST_YUP} (${yupClearancesData.number})`}
                                />
                            </div>
                            }
                            {cardsData.includes(setting.CARD_CLEARANCES_REQUEST_YOOMEE) &&
                            <div className="col-lg-3 col-md-4 col-sm-6">
                                <DashboardWithOperatorCardComponent color='bg-primary'
                                                                    operator={{id: '4'}}
                                                                    request={allClearancesRequests}
                                                                    url={path.REQUESTS_CLEARANCES_PAGE_PATH}
                                                                    data={formatNumber(yoomeeClearancesData.value)}
                                                                    label={`${setting.LABEL_CLEARANCES_REQUEST_YOOMEE} (${yoomeeClearancesData.number})`}
                                />
                            </div>
                            }
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
