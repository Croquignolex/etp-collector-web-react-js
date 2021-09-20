import {connect} from "react-redux";

import {setPageTitle} from "../../functions/generalFunctions";
import {DAILY_REPORTS} from "../../constants/pageNameConstants";
import DailyReportsPage from "../../pages/reports/DailyReportsPage";

setPageTitle(DAILY_REPORTS);

// Map state function to component props
const mapStateToProps = (state) => ({
    reports: state.reports.list,
    reportsRequests: state.reportsRequests
});

// Map dispatch function to component props
const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action) }
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(DailyReportsPage);