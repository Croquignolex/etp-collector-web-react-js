import { all } from 'redux-saga/effects';

import user from './user/saga';
import sims from './sims/saga';
import zones from './zones/saga';
import agents from './agents/saga';
import fleets from './fleets/saga';
import returns from './returns/saga';
import refuels from './refuels/saga';
import affords from './affords/saga';
import settings from './settings/saga';
import managers from './managers/saga';
import supplies from './supplies/saga';
import operators from './operators/saga';
import transfers from './transfers/saga';
import clearances from './clearances/saga';
import collectors from './collectors/saga';
import recoveries from './recoveries/saga';
import notifications from './notifications/saga';
import networkSupplies from './networkSupplies/saga';

// Combine all saga middleware
export default function* sagas() {
    yield all([
        user(),
        sims(),
        zones(),
        agents(),
        fleets(),
        returns(),
        refuels(),
        affords(),
        supplies(),
        managers(),
        settings(),
        transfers(),
        operators(),
        clearances(),
        recoveries(),
        collectors(),
        notifications(),
        networkSupplies(),
    ]);
}
