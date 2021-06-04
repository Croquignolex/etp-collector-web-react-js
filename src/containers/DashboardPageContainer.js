import {connect} from "react-redux";

import DashboardPage from "../pages/DashboardPage";
import {setPageTitle} from "../functions/generalFunctions";
import {DASHBOARD_PAGE} from "../constants/pageNameConstants";

setPageTitle(DASHBOARD_PAGE);

// Map state function to component props
const mapStateToProps = (state) => ({
    user: state.user,
    sims: state.sims.list,
    settings: state.settings,
    fleets: state.fleets.list,
    clearances: state.clearances.list,
    allFleetsRequests: state.fleetsRequests.all,
    allSimsRequests: state.simsRequests.collector,
    balanceUserRequests: state.userRequests.balance,
    allClearancesRequests: state.clearancesRequests.all,
});

// Map dispatch function to component props
const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action) }
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);