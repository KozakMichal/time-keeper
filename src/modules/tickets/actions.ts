import * as constants from './constants';
import { TicketModel } from './ticket.model';

export const fetchTickets = (workspaceId: string) => ({
    type: constants.FETCH_TICKETS,
    payload: {
        workspaceId,
    },
});

export const fetchTicketsDone = (tickets: TicketModel[]) => ({
    type: constants.FETCH_TICKETS_DONE,
    payload: {
        tickets,
    },
});

export const createTicket = (ticket: TicketModel, workspaceId: string) => ({
    type: constants.CREATE_TICKET,
    payload: {
        ticket,
        workspaceId,
    },
});

export const createTicketDone = (ticket: TicketModel) => ({
    type: constants.CREATE_TICKET_DONE,
    payload: {
        ticket,
    },
});

export const startTicket = (ticket: TicketModel) => ({
    type: constants.START_TICKET,
    payload: ticket,
});

export const endTicket = (ticket: TicketModel) => ({
    type: constants.END_TICKET,
    payload: ticket,
});

export const ticketChanged = (ticket: TicketModel) => ({
    type: constants.TICKET_CHANGED,
    payload: ticket,
});
