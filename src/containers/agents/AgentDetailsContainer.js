import {connect} from "react-redux";

import AgentDetailsComponent from "../../components/agents/AgentDetailsComponent";

// Map state function to component props
const mapStateToProps = (state) => ({
    agent: state.agents.current,
    request: state.agentsRequests.show,
});

// Map dispatch function to component props
const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action) }
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(AgentDetailsComponent);