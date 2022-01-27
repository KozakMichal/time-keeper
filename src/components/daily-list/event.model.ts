import { Moment } from 'moment';

export interface DailyListEvent {
    id: string|number;
    unitId: string|number;
    start: Moment;
    end?: Moment;
    name: string;
}
