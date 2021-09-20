import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

import LoaderComponent from "../../components/LoaderComponent";
import HeaderComponent from "../../components/HeaderComponent";
import {emitReportsFetch} from "../../redux/reports/actions";
import AppLayoutContainer from "../../containers/AppLayoutContainer";
import ErrorAlertComponent from "../../components/ErrorAlertComponent";
import TableSearchComponent from "../../components/TableSearchComponent";
import {storeReportsRequestReset} from "../../redux/requests/reports/actions";
import DailyReportsComponent from "../../components/reports/DailyReportsComponent";
import {dateToString, needleSearch, requestFailed, requestLoading} from "../../functions/generalFunctions";

// Component
function DailyReportsPage({reports, reportsRequests, dispatch, location}) {
    // Local states
    const [needle, setNeedle] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Local effects
    useEffect(() => {
        dispatch(emitReportsFetch({
            selectedDay: new Date()
        }));
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
        dispatch(storeReportsRequestReset());
    };

    const handleSelectedDate = (selectedDay) => {
        shouldResetErrorData();
        setSelectedDate(selectedDay)
        dispatch(emitReportsFetch({
            selectedDay: selectedDay
        }));
    }

    // Render
    return (
        <>
            <AppLayoutContainer pathname={location.pathname}>
                <div className="content-wrapper">
                    <HeaderComponent title="Mes rapports journaliers" icon={'fa fa-table'} />
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
                                            {requestFailed(reportsRequests.list) && <ErrorAlertComponent message={reportsRequests.list.message} />}
                                             {/* Search result & Infinite scroll */}
                                            {(needle !== '' && needle !== undefined)
                                                ? <DailyReportsComponent selectedDate={selectedDate}
                                                                         reports={searchEngine(reports, needle)}
                                                                         handleSelectedDate={handleSelectedDate}
                                                />
                                                : (requestLoading(reportsRequests.list) ?
                                                        <LoaderComponent /> :
                                                        <DailyReportsComponent reports={reports}
                                                                               selectedDate={selectedDate}
                                                                               handleSelectedDate={handleSelectedDate}
                                                        />
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
                needleSearch(item.in, _needle) ||
                needleSearch(item.out, _needle) ||
                needleSearch(item.type, _needle) ||
                needleSearch(item.label, _needle) ||
                needleSearch(item.balance, _needle) ||
                needleSearch(dateToString(item.creation), _needle)
            )
        });
    }
    // Return data
    return data;
}

// Prop types to ensure destroyed props data type
DailyReportsPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
    reports: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired,
    reportsRequests: PropTypes.object.isRequired,
};

export default React.memo(DailyReportsPage);