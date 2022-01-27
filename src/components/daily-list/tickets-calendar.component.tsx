import { TicketModel } from '../../modules/tickets/ticket.model';
import moment from 'moment';
import { TimesModel } from '../../modules/tickets/times.model';
import { DailyListEvent } from './event.model';
import DailyList from './daily-list.component';

interface ComponentProps {
    tickets: TicketModel[];
}

const mapTimesToEvent = (ticketId: string, name: string, times: TimesModel[] = []) => times.map(
    (time, index) => ({
        id: ticketId + index,
        unitId: ticketId,
        name: name,
        start: moment(time.start),
        end: time.end ? moment(time.end) : moment.now(),
    })
);

export default function TicketsDailyList({ tickets = [] }: ComponentProps) {
    const events: DailyListEvent[] = tickets.reduce(
        (carry: DailyListEvent[], ticket: TicketModel) => {
            if (!ticket.times) {
                return carry;
            }

            return [
                ...carry,
                ...mapTimesToEvent(ticket.id, ticket.name, ticket.times),
            ] as DailyListEvent[];
        },
        []
    );

    return (
        <DailyList
            events={events}
        />
    );
}
