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
import revenues from './revenues/reducer';
import expenses from './expenses/reducer';
import payments from './payments/reducer';
import settings from './settings/reducer';
import managers from './managers/reducer';
import supplies from './supplies/reducer';
import operators from './operators/reducer';
import transfers from './transfers/reducer';
import recoveries from './recoveries/reducer';
import clearances from './clearances/reducer';
import collectors from './collectors/reducer';
import supervisors from './supervisors/reducer';
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
import expensesRequests from './requests/expenses/reducer';
import revenuesRequests from './requests/revenues/reducer';
import settingsRequests from './requests/settings/reducer';
import managersRequests from './requests/managers/reducer';
import paymentsRequests from './requests/payments/reducer';
import suppliesRequests from './requests/supplies/reducer';
import operatorsRequests from './requests/operators/reducer';
import transfersRequests from './requests/transfers/reducer';
import collectorsRequests from './requests/collectors/reducer';
import clearancesRequests from './requests/clearances/reducer';
import recoveriesRequests from './requests/recoveries/reducer';
import supervisorsRequests from './requests/supervisors/reducer';
import notificationsRequests from './requests/notifications/reducer';

// Combine all reducers
export default {
    user,
    sims,
    zones,
    agents,
    fleets,
    returns,
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
    transfers,
    recoveries,
    clearances,
    collectors,
    supervisors,
    simsRequests,
    userRequests,
    zonesRequests,
    notifications,
    fleetsRequests,
    agentsRequests,
    vendorsRequests,
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
    operatorsRequests,
    recoveriesRequests,
    clearancesRequests,
    collectorsRequests,
    supervisorsRequests,
    notificationsRequests,
};
