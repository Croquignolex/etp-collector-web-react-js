import {connect} from "react-redux";

import {setPageTitle} from "../../functions/generalFunctions";
import NetworkAnonymousPage from "../../pages/network/NetworkAnonymousPage";
import {MY_NETWORK_ANONYMOUS_FLEETS_PAGE} from "../../constants/pageNameConstants";

setPageTitle(MY_NETWORK_ANONYMOUS_FLEETS_PAGE);

// Map state function to component props
const mapStateToProps = (state) => ({
    page: state.anonymous.page,
    anonymous: state.anonymous.list,
    hasMoreData: state.anonymous.hasMoreData,
    anonymousRequests: state.anonymousRequests,
});

// Map dispatch function to component props
const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action) }
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(NetworkAnonymousPage);