import { createTicketDone, fetchTicketsDone } from './actions';
import * as constants from './constants';
import { TicketModel } from './ticket.model';

export interface TicketsReducerState {
    tickets: TicketModel[],
};

const getInitialState = () => ({
    tickets: [],
});

const TicketsReducer = (
    state = getInitialState(),
    action: any
): TicketsReducerState => {
    switch (action.type) {
        case constants.FETCH_TICKETS_DONE:
            return {
                ...state,
                tickets: (action as ReturnType<typeof fetchTicketsDone>).payload.tickets || [],
            };
        case constants.CREATE_TICKET_DONE:
            return {
                ...state,
                tickets: [
                    ...state.tickets,
                    (action as ReturnType<typeof createTicketDone>).payload.ticket,
                ],
            };
        case constants.TICKET_CHANGED:
            return {
                ...state,
                tickets: state.tickets.map(
                    (ticket: TicketModel) => {
                        if (ticket.id !== action.payload.id) {
                            return ticket;
                        }
                        return action.payload;
                    }
                ),
            };
        default:
            return state;
    }
};

export default TicketsReducer;
