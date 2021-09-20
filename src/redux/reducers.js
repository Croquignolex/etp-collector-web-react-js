import user from './user/reducer';
import sims from './sims/reducer';
import zones from './zones/reducer';
import fleets from './fleets/reducer';
import agents from './agents/reducer';
import returns from './returns/reducer';
import refuels from './refuels/reducer';
import vendors from './vendors/reducer';
import affords from './affords/reducer';
import outlays from './outlays/reducer';
import reports from './reports/reducer';
import revenues from './revenues/reducer';
import expenses from './expenses/reducer';
import payments from './payments/reducer';
import settings from './settings/reducer';
import managers from './managers/reducer';
import supplies from './supplies/reducer';
import operators from './operators/reducer';
import transfers from './transfers/reducer';
import movements from './movements/reducer';
import recoveries from './recoveries/reducer';
import clearances from './clearances/reducer';
import collectors from './collectors/reducer';
import supervisors from './supervisors/reducer';
import transactions from './transactions/reducer';
import userRequests from './requests/user/reducer';
import simsRequests from './requests/sims/reducer';
import notifications from './notifications/reducer';
import zonesRequests from './requests/zones/reducer';
import agentsRequests from './requests/agents/reducer';
import fleetsRequests from './requests/fleets/reducer';
import vendorsRequests from './requests/vendors/reducer';
import refuelsRequests from './requests/refuels/reducer';
import returnsRequests from './requests/returns/reducer';
import affordsRequests from './requests/affords/reducer';
import outlaysRequests from './requests/outlays/reducer';
import reportsRequests from './requests/reports/reducer';
import expensesRequests from './requests/expenses/reducer';
import revenuesRequests from './requests/revenues/reducer';
import settingsRequests from './requests/settings/reducer';
import managersRequests from './requests/managers/reducer';
import paymentsRequests from './requests/payments/reducer';
import suppliesRequests from './requests/supplies/reducer';
import operatorsRequests from './requests/operators/reducer';
import transfersRequests from './requests/transfers/reducer';
import movementsRequests from './requests/movements/reducer';
import collectorsRequests from './requests/collectors/reducer';
import clearancesRequests from './requests/clearances/reducer';
import recoveriesRequests from './requests/recoveries/reducer';
import supervisorsRequests from './requests/supervisors/reducer';
import transactionsRequests from './requests/transactions/reducer';
import notificationsRequests from './requests/notifications/reducer';

// Combine all reducers
export default {
    user,
    sims,
    zones,
    agents,
    fleets,
    returns,
    reports,
    refuels,
    affords,
    outlays,
    vendors,
    revenues,
    payments,
    settings,
    managers,
    supplies,
    expenses,
    operators,
    movements,
    transfers,
    recoveries,
    clearances,
    collectors,
    supervisors,
    simsRequests,
    transactions,
    userRequests,
    zonesRequests,
    notifications,
    fleetsRequests,
    agentsRequests,
    vendorsRequests,
    reportsRequests,
    returnsRequests,
    refuelsRequests,
    outlaysRequests,
    affordsRequests,
    paymentsRequests,
    revenuesRequests,
    suppliesRequests,
    expensesRequests,
    managersRequests,
    settingsRequests,
    transfersRequests,
    movementsRequests,
    operatorsRequests,
    recoveriesRequests,
    clearancesRequests,
    collectorsRequests,
    supervisorsRequests,
    transactionsRequests,
    notificationsRequests,
};
