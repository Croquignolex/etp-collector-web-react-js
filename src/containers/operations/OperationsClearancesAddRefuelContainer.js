import {connect} from "react-redux";

import OperationsClearancesAddRefuelComponent from "../../components/operations/OperationsClearancesAddRefuelComponent";

// Map state function to component props
const mapStateToProps = (state) => ({
    user: state.user,
    sims: state.sims.list,
    agents: state.agents.list,
    request: state.refuelsRequests.add,
    allAgentsRequests: state.agentsRequests.all,
    allSimsRequests: state.simsRequests.internal,
});

// Map dispatch function to component props
const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action) }
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(OperationsClearancesAddRefuelComponent);