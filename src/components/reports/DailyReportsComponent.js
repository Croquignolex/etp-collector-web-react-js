import PropTypes from "prop-types";
import React, {useMemo} from 'react';

import ExcelFile from "react-data-export/dist/ExcelPlugin/components/ExcelFile";
import ExcelSheet from "react-data-export/dist/ExcelPlugin/elements/ExcelSheet";
import ExcelColumn from "react-data-export/dist/ExcelPlugin/elements/ExcelColumn";

import DatePickerComponent from "../form/DatePickerComponent";
import {formatString, shortDateToString} from "../../functions/generalFunctions";

// Component
function DailyMovementsComponent({selectedDate, reports, handleSelectedDate}) {
    // Custom export button
    const ExportButton = () => {
        const tabName = `Mon Rapport de la journée du ${shortDateToString(selectedDate, '-')}`;

        return (
            <ExcelFile element={
                <button type="button" className="btn btn-theme mb-1 mr-1">
                    <i className="fa fa-file-export" /> Exporter sous excel
                </button>
            } filename={tabName}>
                <ExcelSheet data={reports} name="Rapport">
                    <ExcelColumn label="DATE" value="creation"/>
                    <ExcelColumn label="TYPE" value="type"/>
                    <ExcelColumn label="NATURE" value="label"/>
                    <ExcelColumn label="ACTIFS" value="in"/>
                    <ExcelColumn label="PASSIFS" value="out"/>
                </ExcelSheet>
            </ExcelFile>
        )
    }

    const inReportData = useMemo(() => {
        return reports.reduce((acc, val) => acc + parseInt(val.in, 10), 0);
    }, [reports]);

    const outReportData = useMemo(() => {
        return reports.reduce((acc, val) => acc + parseInt(val.out, 10), 0);
    }, [reports]);

    // Render
    return (
        <>
            <div className="row">
                <div className="col-lg-12 col-md-12">
                    <ExportButton />
                    <DatePickerComponent
                        showStartOnly
                        start={selectedDate}
                        handleStart={handleSelectedDate}
                    />
                    <div className="card">
                        <div className="table-responsive">
                            <table className="table table-hover text-nowrap table-bordered">
                                <thead>
                                    <tr>
                                        <th>DATE</th>
                                        <th>TYPE</th>
                                        <th>NATURE</th>
                                        <th>ACTIFS</th>
                                        <th>PASSIFS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reports.map((item, key) => {
                                        return (
                                            <tr key={key}>
                                                <td>{item.creation}</td>
                                                <td>{item.type}</td>
                                                <td>{formatString(item.label, 20)}</td>
                                                <td>{item.in}</td>
                                                <td>{item.out}</td>
                                            </tr>
                                        )
                                    })}
                                    {reports.length !== 0 ? (
                                        <tr className="text-bold">
                                            <td colSpan={3}>Total</td>
                                            <td className={`${inReportData === outReportData ? 'text-success' : 'text-danger'}`}>{inReportData}</td>
                                            <td className={`${inReportData === outReportData ? 'text-success' : 'text-danger'}`}>{outReportData}</td>
                                        </tr>
                                    ) : (
                                        <tr>
                                            <td colSpan={8}>
                                                <div className='alert custom-active text-center'>
                                                    Pas de mouvements
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

// Prop types to ensure destroyed props data type
DailyMovementsComponent.propTypes = {
    reports: PropTypes.array.isRequired,
    selectedDate: PropTypes.object.isRequired,
    handleSelectedDate: PropTypes.func.isRequired,
};

export default React.memo(DailyMovementsComponent);
