import { TicketModel } from './ticket.model';
import { TimesModel } from './times.model';
import * as constants from './constants';
import moment, { Duration, Moment } from 'moment';

export const isRunning = (ticket: TicketModel) => {
    if (!ticket.times) {
        return false;
    }

    return Boolean(ticket.times.filter(
        (time) => !time.end
    ).length);
};

export const getTicketId = (ticket: TicketModel) => constants.TICKETS_STORAGE_KEY_PREFIX + ticket.workspaceId + '-' + ticket.id;

export const getTotalSpend = (ticket: TicketModel): Duration|null => {
    if (!ticket.times) {
        return null;
    }

    const total = ticket.times.reduce(
        (carry: number, time: TimesModel) => {
            if (!time.end) {
                carry += moment.utc().diff(moment.utc(time.start));
                return carry;
            }

            carry += moment.utc(time.end).diff(moment.utc(time.start));

            return carry;
        },
        0
    );

    return moment.duration(total);;
};

export const sumDurationsAndGetOpen = (times: TimesModel[] = []): [Duration|null, number[]] => {
    if (!times) {
        return [null, []];
    }
    let started: number[] = [];

    const total = times.reduce(
        (carry: number, time: TimesModel) => {
            if (!time.end) {
                started.push(time.start);
                return carry;
            }
            carry += moment.utc(time.end).diff(moment.utc(time.start));

            return carry;
        },
        0
    );

    return [moment.duration(total), started];
};

export const filterTimesStartedOnDate = (
    times: TimesModel[] = [],
    date: Moment = moment.utc()
): TimesModel[] => times.filter(
    (time) => moment(time.start).isSame(date, 'day')
);

export const sumAllStartedTillNow = (started: number[] = []) => started.reduce(
    (carry, timeStamp) => carry + moment.utc().diff(moment(timeStamp)),
    0
);

export const getTotalSpendToday = (ticket: TicketModel): Duration|null => {
    if (!ticket.times) {
        return null;
    }

    const total = ticket.times.filter(
        (time) => moment(time.start).isSame(moment().utc(), 'day')
    ).reduce(
        (carry: number, time: TimesModel) => {
            if (!time.end) {
                carry += moment.utc().diff(moment.utc(time.start));
                return carry;
            }

            carry += moment.utc(time.end).diff(moment.utc(time.start));

            return carry;
        },
        0
    );

    return moment.duration(total);
};

export const getLastStart = (ticket: TicketModel) => {
    if (!ticket.times) {
        return null;
    }

    return ticket.times[ticket.times.length - 1].start;
};

export const formatDuration = (duration: Duration|null) => {
    if (duration === null) {
        return '-';
    }

    return duration.asHours().toFixed(2);
};

export const getTotal = (tickets: TicketModel[] = []) => tickets.reduce(
    (carry: Duration|null, ticket: TicketModel) => {
        if (!carry) {
            return getTotalSpend(ticket);
        }

        return carry.add(getTotalSpend(ticket));
    },
    null
);

export const getTotalPerDay = (tickets: TicketModel[] = []) => tickets.reduce(
    (carry: Duration|null, ticket: TicketModel) => {
        if (!carry) {
            return getTotalSpendToday(ticket);
        }

        return carry.add(getTotalSpendToday(ticket));
    },
    null
);
