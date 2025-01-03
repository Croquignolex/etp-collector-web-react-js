import {connect} from "react-redux";

import OperationsFleetsAddSupplyComponent from "../../components/operations/OperationsFleetsAddSupplyComponent";

// Map state function to component props
const mapStateToProps = (state) => ({
    user: state.user.id,
    sims: state.sims.list,
    agents: state.agents.list,
    agencies: state.agencies.list,
    request: state.suppliesRequests.add,
    allSimsRequests: state.simsRequests.all,
    allAgentsRequests: state.agentsRequests.all,
    allAgenciesRequests: state.agenciesRequests.all,
});

// Map dispatch function to component props
const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action) }
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(OperationsFleetsAddSupplyComponent);
