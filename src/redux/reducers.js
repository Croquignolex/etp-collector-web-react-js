import user from './user/reducer';
import sims from './sims/reducer';
import zones from './zones/reducer';
import fleets from './fleets/reducer';
import agents from './agents/reducer';
import returns from './returns/reducer';
import refuels from './refuels/reducer';
import affords from './affords/reducer';
import settings from './settings/reducer';
import managers from './managers/reducer';
import supplies from './supplies/reducer';
import operators from './operators/reducer';
import transfers from './transfers/reducer';
import recoveries from './recoveries/reducer';
import clearances from './clearances/reducer';
import collectors from './collectors/reducer';
import userRequests from './requests/user/reducer';
import simsRequests from './requests/sims/reducer';
import notifications from './notifications/reducer';
import zonesRequests from './requests/zones/reducer';
import agentsRequests from './requests/agents/reducer';
import fleetsRequests from './requests/fleets/reducer';
import networkSupplies from './networkSupplies/reducer';
import refuelsRequests from './requests/refuels/reducer';
import returnsRequests from './requests/returns/reducer';
import affordsRequests from './requests/affords/reducer';
import settingsRequests from './requests/settings/reducer';
import managersRequests from './requests/managers/reducer';
import suppliesRequests from './requests/supplies/reducer';
import operatorsRequests from './requests/operators/reducer';
import transfersRequests from './requests/transfers/reducer';
import collectorsRequests from './requests/collectors/reducer';
import clearancesRequests from './requests/clearances/reducer';
import recoveriesRequests from './requests/recoveries/reducer';
import notificationsRequests from './requests/notifications/reducer';
import networkSuppliesRequests from './requests/networkSupplies/reducer';

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
    settings,
    managers,
    supplies,
    operators,
    transfers,
    recoveries,
    clearances,
    collectors,
    simsRequests,
    userRequests,
    zonesRequests,
    notifications,
    fleetsRequests,
    agentsRequests,
    networkSupplies,
    returnsRequests,
    refuelsRequests,
    affordsRequests,
    suppliesRequests,
    managersRequests,
    settingsRequests,
    transfersRequests,
    operatorsRequests,
    recoveriesRequests,
    clearancesRequests,
    collectorsRequests,
    notificationsRequests,
    networkSuppliesRequests,
};
