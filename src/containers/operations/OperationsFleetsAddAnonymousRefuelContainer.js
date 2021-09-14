import {connect} from "react-redux";

import OperationsFleetsAddAnonymousRefuelComponent from "../../components/operations/OperationsFleetsAddAnonymousRefuelComponent";

// Map state function to component props
const mapStateToProps = (state) => ({
    user: state.user.id,
    sims: state.sims.list,
    zones: state.zones.list,
    zonesRequests: state.zonesRequests.all,
    request: state.refuelsRequests.anonymous,
    simsRequests: state.simsRequests.internal,
});

// Map dispatch function to component props
const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action) }
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(OperationsFleetsAddAnonymousRefuelComponent);