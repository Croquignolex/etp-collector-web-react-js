import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import * as path from "./constants/pagePathConstants";
import asyncComponent from './components/asyncComponent';
import {NotificationContainer} from "react-notifications";
import PublicRouteContainer from "./containers/PublicRouteContainer";
import RestrictedRouteContainer from "./containers/RestrictedRouteContainer";

// Component
function AppRoutes({history}) {
    return (
        <Router history={history}>
            <NotificationContainer />
            <Switch>
                {/* Available pages on guest mode */}
                <PublicRouteContainer exact path="/" component={asyncComponent(() => import('./containers/CheckUserContainer'))} />
                {/* Available pages on auth mode */}
                {/* Common pages */}
                <RestrictedRouteContainer exact path={path.PROFILE_PAGE_PATH} component={asyncComponent(() => import('./pages/ProfilePage'))} />
                <RestrictedRouteContainer exact path={path.SETTINGS_PAGE_PATH} component={asyncComponent(() => import('./containers/SettingsPageContainer'))} />
                <RestrictedRouteContainer exact path={path.DASHBOARD_PAGE_PATH} component={asyncComponent(() => import('./containers/DashboardPageContainer'))} />
                <RestrictedRouteContainer exact path={path.NOTIFICATIONS_PAGE_PATH} component={asyncComponent(() => import('./containers/notifications/NotificationsPageContainer'))} />
                {/* Requests pages */}
                <RestrictedRouteContainer exact path={path.REQUESTS_FLEETS_PAGE_PATH} component={asyncComponent(() => import('./containers/requests/RequestsFleetsPageContainer'))} />
                <RestrictedRouteContainer exact path={path.REQUESTS_CLEARANCES_PAGE_PATH} component={asyncComponent(() => import('./containers/requests/RequestsClearancesPageContainer'))} />
               {/* Recoveries */}
                <RestrictedRouteContainer exact path={path.RECOVERIES_CASH_PAGE_PATH} component={asyncComponent(() => import('./containers/recoveries/RecoveriesCashPageContainer'))} />
                <RestrictedRouteContainer exact path={path.RECOVERIES_FLEETS_PAGE_PATH} component={asyncComponent(() => import('./containers/recoveries/RecoveriesFleetsPageContainer'))} />
                {/* Operations */}
                <RestrictedRouteContainer exact path={path.OPERATIONS_FLEETS_PAGE_PATH} component={asyncComponent(() => import('./containers/operations/OperationsFleetsPageContainer'))} />
                <RestrictedRouteContainer exact path={path.OPERATION_AFFORDS_PAGE_PATH} component={asyncComponent(() => import('./containers/operations/OperationsAffordsPageContainer'))} />
                <RestrictedRouteContainer exact path={path.OPERATIONS_TRANSFERS_PAGE_PATH} component={asyncComponent(() => import('./containers/operations/OperationsTransfersPageContainer'))} />
                <RestrictedRouteContainer exact path={path.OPERATIONS_CLEARANCES_PAGE_PATH} component={asyncComponent(() => import('./containers/operations/OperationsClearancesPageContainer'))} />
                {/* Checkouts */}
                <RestrictedRouteContainer exact path={path.CHECKOUT_INTERNAL_OUTLAYS_PAGE_PATH} component={asyncComponent(() => import('./containers/checkout/CheckoutOutlaysPageContainer'))} />
                <RestrictedRouteContainer exact path={path.CHECKOUT_EXTERNAL_OUTLAYS_PAGE_PATH} component={asyncComponent(() => import('./containers/checkout/CheckoutExpensesPageContainer'))} />
                <RestrictedRouteContainer exact path={path.CHECKOUT_EXTERNAL_PAYMENTS_PAGE_PATH} component={asyncComponent(() => import('./containers/checkout/CheckoutRevenuesPageContainer'))} />
                <RestrictedRouteContainer exact path={path.CHECKOUT_INTERNAL_PAYMENTS_PAGE_PATH} component={asyncComponent(() => import('./containers/checkout/CheckoutPaymentsPageContainer'))} />
                {/* Other pages */}
                <RestrictedRouteContainer exact path={path.SIMS_PAGE_PATH} component={asyncComponent(() => import('./containers/sims/SimsPageContainer'))} />
                <RestrictedRouteContainer exact path={path.AGENTS_PAGE_PATH} component={asyncComponent(() => import('./containers/agents/AgentsPageContainer'))} />
                {/* Network */}
                <RestrictedRouteContainer exact path={path.REPORTS_PAGE_PATH} component={asyncComponent(() => import('./containers/reports/DailyReportsPageContainer'))} />
                <RestrictedRouteContainer exact path={path.MOVEMENTS_PAGE_PATH} component={asyncComponent(() => import('./containers/reports/MovementsReportsPageContainer'))} />
                <RestrictedRouteContainer exact path={path.TRANSACTIONS_PAGE_PATH} component={asyncComponent(() => import('./containers/reports/TransactionsReportsPageContainer'))} />
                {/* 404 page */}
                <Route component={asyncComponent(() => import('./pages/NotFoundPage'))} />
            </Switch>
        </Router>
    );
}

export default React.memo(AppRoutes);
