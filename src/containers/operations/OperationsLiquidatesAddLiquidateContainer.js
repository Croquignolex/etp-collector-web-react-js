import {connect} from "react-redux";

import OperationsLiquidatesAddLiquidateComponent from "../../components/operations/OperationsLiquidatesAddLiquidateComponent";

// Map state function to component props
const mapStateToProps = (state) => ({
    user: state.user,
    collectors: state.collectors.list,
    request: state.liquidatesRequests.add,
    allCollectorsRequests: state.collectorsRequests.all,
});

// Map dispatch function to component props
const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action) }
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(OperationsLiquidatesAddLiquidateComponent);