import {connect} from "react-redux";

import {setPageTitle} from "../../functions/generalFunctions";
import {OPERATIONS_LIQUIDATES_PAGE} from "../../constants/pageNameConstants";
import OperationsLiquidatesPage from "../../pages/operations/OperationsLiquidatesPage";

setPageTitle(OPERATIONS_LIQUIDATES_PAGE);

// Map state function to component props
const mapStateToProps = (state) => ({
    user: state.user,
    page: state.liquidates.page,
    liquidates: state.liquidates.list,
    hasMoreData: state.liquidates.hasMoreData,
    liquidatesRequests: state.liquidatesRequests,
});

// Map dispatch function to component props
const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action) }
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(OperationsLiquidatesPage);