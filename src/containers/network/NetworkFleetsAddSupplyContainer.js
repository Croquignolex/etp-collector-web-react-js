import {connect} from "react-redux";

import NetworkFleetsAddSupplyComponent from "../../components/network/NetworkFleetsAddSupplyComponent";

// Map state function to component props
const mapStateToProps = (state) => ({
    user: state.user,
    sims: state.sims.list,
    agents: state.agents.list,
    allSimsRequests: state.simsRequests.all,
    request: state.networkSuppliesRequests.add,
    allAgentsRequests: state.agentsRequests.all,
});

// Map dispatch function to component props
const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action) }
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(NetworkFleetsAddSupplyComponent);