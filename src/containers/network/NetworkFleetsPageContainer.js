import {connect} from "react-redux";

import {setPageTitle} from "../../functions/generalFunctions";
import {MY_NETWORK_FLEET} from "../../constants/pageNameConstants";
import NetworkFleetsPage from "../../pages/network/NetworkFleetsPage";

setPageTitle(MY_NETWORK_FLEET);

// Map state function to component props
const mapStateToProps = (state) => ({
    page: state.networkSupplies.page,
    networkSupplies: state.networkSupplies.list,
    hasMoreData: state.networkSupplies.hasMoreData,
    networkSuppliesRequests: state.networkSuppliesRequests,
});

// Map dispatch function to component props
const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action) }
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(NetworkFleetsPage);