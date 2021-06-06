import {connect} from "react-redux";

import RequestsFleetsAddFleetComponent from "../../components/requests/RequestsFleetsAddFleetComponent";

// Map state function to component props
const mapStateToProps = (state) => ({
    sims: state.sims.list,
    agents: state.agents.list,
    request: state.fleetsRequests.add,
    allAgentsRequests: state.agentsRequests.all,
    allSimsRequests: state.simsRequests.external,
});

// Map dispatch function to component props
const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action) }
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(RequestsFleetsAddFleetComponent);