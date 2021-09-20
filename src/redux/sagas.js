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
import reports from './reports/saga';
import expenses from './expenses/saga';
import revenues from './revenues/saga';
import settings from './settings/saga';
import managers from './managers/saga';
import payments from './payments/saga';
import supplies from './supplies/saga';
import operators from './operators/saga';
import transfers from './transfers/saga';
import movements from './movements/saga';
import clearances from './clearances/saga';
import collectors from './collectors/saga';
import recoveries from './recoveries/saga';
import supervisors from './supervisors/saga';
import transactions from './transactions/saga';
import notifications from './notifications/saga';

// Combine all saga middleware
export default function* sagas() {
    yield all([
        user(),
        sims(),
        zones(),
        agents(),
        fleets(),
        returns(),
        reports(),
        refuels(),
        outlays(),
        vendors(),
        affords(),
        payments(),
        revenues(),
        supplies(),
        managers(),
        settings(),
        expenses(),
        transfers(),
        operators(),
        movements(),
        clearances(),
        recoveries(),
        collectors(),
        supervisors(),
        transactions(),
        notifications(),
    ]);
}
