import {connect} from "react-redux";

import CheckoutOutlaysAddOutlayComponent from "../../components/checkout/CheckoutOutlaysAddOutlayComponent";

// Map state function to component props
const mapStateToProps = (state) => ({
    user: state.user.id,
    managers: state.managers.list,
    collectors: state.collectors.list,
    request: state.outlaysRequests.add,
    supervisors: state.supervisors.list,
    allManagersRequests: state.managersRequests.all,
    allCollectorsRequests: state.collectorsRequests.all,
    allSupervisorsRequests: state.supervisorsRequests.all,
});

// Map dispatch function to component props
const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action) }
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutOutlaysAddOutlayComponent);