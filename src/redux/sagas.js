import { all } from 'redux-saga/effects';

import user from './user/saga';
import sims from './sims/saga';
import zones from './zones/saga';
import agents from './agents/saga';
import fleets from './fleets/saga';
import vendors from './vendors/saga';
import returns from './returns/saga';
import refuels from './refuels/saga';
import affords from './affords/saga';
import outlays from './outlays/saga';
import expenses from './expenses/saga';
import revenues from './revenues/saga';
import settings from './settings/saga';
import managers from './managers/saga';
import payments from './payments/saga';
import supplies from './supplies/saga';
import operators from './operators/saga';
import anonymous from './anonymous/saga';
import transfers from './transfers/saga';
import liquidates from './liquidates/saga';
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
        outlays(),
        vendors(),
        affords(),
        revenues(),
        expenses(),
        payments(),
        supplies(),
        managers(),
        settings(),
        transfers(),
        anonymous(),
        operators(),
        liquidates(),
        clearances(),
        recoveries(),
        collectors(),
        notifications(),
        networkSupplies(),
    ]);
}
