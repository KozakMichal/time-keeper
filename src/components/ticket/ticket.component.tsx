import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import moment from 'moment';
import { TicketModel } from '../../modules/tickets/ticket.model';
import {
    formatDuration,
    getTotalSpend,
    getTotalSpendToday,
    isRunning,
} from '../../modules/tickets/utils';
import { TimeCounterComponent } from '../time-counter/time-couter.component';

interface ComponentProps {
    ticket: TicketModel;
    start: (ticket: TicketModel) => void;
    end: (ticket: TicketModel) => void;
}

export function TicketComponent({ ticket, start, end }: ComponentProps) {
    const totalSpend = getTotalSpend(ticket);
    const spendToday = getTotalSpendToday(ticket);
    const isInProgress = isRunning(ticket);

    return (
        <Card sx={{height: '100%'}}>
            <CardContent>
                {typeof ticket.estimate !== 'undefined' && (
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {ticket.estimate} hours
                    </Typography>
                )}
                <Typography variant="h5" component="div">
                    {ticket.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {ticket.description || ''}
                </Typography>
                {ticket.due && <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {moment(ticket.due).format('LLLL')}
                </Typography>}
                <hr />
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {
                        isInProgress ? (
                            <TimeCounterComponent
                                getTotal={() => getTotalSpend(ticket)}
                                label="Total spend: "
                            />
                        ) : (
                            <>
                                Total spend: {formatDuration(totalSpend)}
                            </>
                        )
                    }
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {
                        isInProgress ? (
                            <TimeCounterComponent
                                getTotal={() => getTotalSpendToday(ticket)}
                                label="Total today: "
                            />
                        ) : (
                            <>
                                Total today: {formatDuration(spendToday)}
                            </>
                        )
                    }
                </Typography>
            </CardContent>
            <CardActions>
                {!isInProgress ? (
                    <Button
                        size="small"
                        color="success"
                        variant="contained"
                        onClick={() => start(ticket)}
                    >
                        Start
                    </Button>
                ) : (
                    <Button
                        size="small"
                        color="error"
                        variant="contained"
                        onClick={() => end(ticket)}
                    >
                        Stop
                    </Button>
                )}
            </CardActions>
        </Card>
    );
}
