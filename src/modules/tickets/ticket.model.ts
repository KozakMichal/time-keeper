import { TimesModel } from './times.model';

export interface TicketModel {
    id: string;
    name: string;
    description: string;
    due?: Date,
    workspaceId: string;
    estimate: number;

    times?: TimesModel[];
}
