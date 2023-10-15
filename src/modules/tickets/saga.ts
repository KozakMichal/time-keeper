import {
    takeLatest,
    all,
    put,
    call,
} from '@redux-saga/core/effects';
import * as constants from './constants';
import * as localforage  from 'localforage';
import { Await } from '../../utils/await.type';
import { createTicket, createTicketDone, endTicket, fetchTickets, fetchTicketsDone, startTicket, ticketChanged, removeTicket } from './actions';
import { TicketModel } from './ticket.model';
import { v4 } from 'uuid';
import moment from 'moment';
import { getTicketId } from './utils';

function* handleFetch(action: ReturnType<typeof fetchTickets>) {
    const keys: Await<string[]> = yield call(
        [localforage, 'keys']
    );

    const ticketsInWorkspace = keys.filter(
        (key) => key.match(action.payload.workspaceId)
    );

    const tickets: Await<TicketModel[]> = yield all(
        ticketsInWorkspace.map(
            (key) => call(
                [localforage, 'getItem'],
                key
            )
        )
    );

    yield put(fetchTicketsDone(tickets));
}

function* handleCreate(action: ReturnType<typeof createTicket>) {
    const { ticket, workspaceId } = action.payload;
    const newTicket = {
        ...ticket,
        id: v4(),
        workspaceId: workspaceId,
    };
    const ticketId = getTicketId(newTicket);

    yield call(
        [localforage, 'setItem'],
        ticketId,
        newTicket
    );

    yield put(createTicketDone(newTicket));
}

function* handleStart(action: ReturnType<typeof startTicket>) {
    const ticket = action.payload;
    const ticketToModify: Await<TicketModel> = yield call(
        [localforage, 'getItem'],
        constants.TICKETS_STORAGE_KEY_PREFIX + ticket.workspaceId + '-' + ticket.id
    );
    const ticketId = getTicketId(ticketToModify);

    if (!ticketToModify) {
        return console.error('No ticket found!');
    }

    if (!ticketToModify.times) {
        ticketToModify.times = [];
    }

    ticketToModify.times.push({
        start: moment.utc().valueOf(),
        workspaceId: ticket.workspaceId,
        ticketId: ticket.id,
    });

    yield call(
        [localforage, 'setItem'],
        ticketId,
        ticketToModify
    );

    yield put(ticketChanged(ticketToModify));
}

function* handleEnd(action: ReturnType<typeof endTicket>) {
    const ticket = action.payload;
    const ticketToModify: Await<TicketModel> = yield call(
        [localforage, 'getItem'],
        constants.TICKETS_STORAGE_KEY_PREFIX + ticket.workspaceId + '-' + ticket.id
    );
    const ticketId = getTicketId(ticketToModify);

    if (!ticketToModify) {
        return console.error('No ticket found!');
    }

    if (!ticketToModify.times) {
        return console.error('No times - cannot end!');
    }

    if (ticketToModify.times[ticketToModify.times.length - 1].end) {
        return console.error('Cannot end already finished time!');
    }

    ticketToModify.times[ticketToModify.times.length - 1].end = moment().utc().valueOf();

    yield call(
        [localforage, 'setItem'],
        ticketId,
        ticketToModify
    );

    yield put(ticketChanged(ticketToModify));
}

function* handleRemove(action: ReturnType<typeof removeTicket>) {
    const ticket = action.payload;
    const ticketToRemove: Await<TicketModel> = yield call(
        [localforage, 'getItem'],
        constants.TICKETS_STORAGE_KEY_PREFIX + ticket.workspaceId + '-' + ticket.id
    );
    const ticketId = getTicketId(ticketToRemove);

    if (!ticketToRemove) {
        return console.error('No ticket found!');
    }

    yield call(
        [localforage, 'removeItem'],
        ticketId
    );
}

function* actionWatcher() {
    yield takeLatest(constants.FETCH_TICKETS, handleFetch);
    yield takeLatest(constants.CREATE_TICKET, handleCreate);
    yield takeLatest(constants.START_TICKET, handleStart);
    yield takeLatest(constants.END_TICKET, handleEnd);
    yield takeLatest(constants.TICKET_REMOVED , handleRemove);
};

export default actionWatcher;
