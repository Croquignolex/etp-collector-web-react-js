import {connect} from "react-redux";

import RequestsClearancesAddClearanceComponent from "../../components/requests/RequestsClearancesAddClearanceComponent";

// Map state function to component props
const mapStateToProps = (state) => ({
    sims: state.sims.list,
    agents: state.agents.list,
    request: state.clearancesRequests.add,
    allAgentsRequests: state.agentsRequests.all,
    allSimsRequests: state.simsRequests.external,
});

// Map dispatch function to component props
const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action) }
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(RequestsClearancesAddClearanceComponent);