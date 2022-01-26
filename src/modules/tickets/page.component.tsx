import { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import AddIcon from '@mui/icons-material/Add';

import { connect, DefaultRootState } from 'react-redux';
import { Dispatch } from 'redux';
import { createTicket, endTicket, fetchTickets, startTicket } from './actions';
import { Alert, Fab, Grid, Modal } from '@mui/material';
import { TicketModel } from './ticket.model';
import { CreateTicketForm } from './ticket-create.form';
import { TicketComponent } from '../../components/ticket/ticket.component';
import { getTotal, getTotalPerDay } from './utils';
import { TimeCounterComponent } from '../../components/time-counter/time-couter.component';

interface StateProps {
    search: string;
    tickets: TicketModel[];
}

interface TicketsPageProps {}

interface TicketsPageDispatchProps {
    fetchTickets: (workspaceId: string) => ReturnType<typeof fetchTickets>,
    createTicket: (ticket: TicketModel, workspaceId: string) => ReturnType<typeof createTicket>,
    startTicket: (ticket: TicketModel) => ReturnType<typeof startTicket>,
    endTicket: (ticket: TicketModel) => ReturnType<typeof endTicket>,
}

const TicketsPage = (
    {fetchTickets, match, ...props}: StateProps & TicketsPageDispatchProps & TicketsPageProps & RouteComponentProps<{
        workspaceId: string,
    }>,
) => {
    useEffect(() => {
        fetchTickets(match.params.workspaceId)
    }, [fetchTickets, match]);
    const [addOpen, setAddOpen] = useState<boolean>(false);

    const tickets = props.tickets.filter(
        (ticket) => ticket.name.toLowerCase().match(props.search)
    );

    return (
        <>
            {!tickets.length && (
                <Alert severity="info">
                    There are no tickets!
                </Alert>
            )}

            {Boolean(tickets.length) && (
                <Grid container spacing={4}>
                    <Grid item xs={8}>
                        <Grid container spacing={2} alignItems="stretch">
                            {tickets.map(
                                (ticket) => (
                                    <Grid item xs={12} key={ticket.id}>
                                        <TicketComponent
                                            ticket={ticket}
                                            start={props.startTicket}
                                            end={props.endTicket}
                                        />
                                    </Grid>
                                )
                            )}
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <Grid container spacing={1} alignItems="stretch">
                            <TimeCounterComponent
                                getTotal={() => getTotal(tickets)}
                                label="Total: "
                            /><br />
                            <TimeCounterComponent
                                getTotal={() => getTotalPerDay(tickets)}
                                label="Total today: "
                            />
                        </Grid>
                    </Grid>
                </Grid>
            )}

            <Modal
                open={addOpen}
                onClose={() => setAddOpen(false)}
                aria-labelledby="add-ticket"
                aria-describedby="add-ticket"
            >
                <>
                    <CreateTicketForm
                        onSubmit={(ticket) => {
                            props.createTicket(ticket, match.params.workspaceId);
                            setAddOpen(false);
                        }}
                    />
                </>
            </Modal>

            <Fab
                color="primary"
                aria-label="add"
                sx={{
                    position: "fixed",
                    bottom: (theme) => theme.spacing(2),
                    right: (theme) => theme.spacing(2)
                }}
                onClick={() => setAddOpen(true)}
            >
                <AddIcon />
            </Fab>
        </>
    );
};

const mapStateToProps = (
    state: DefaultRootState
): StateProps => ({
    search: state.search?.search || '',
    tickets: state.tickets?.tickets || [],
});

const mapDispatchToProps = (dispatch: Dispatch): TicketsPageDispatchProps => ({
    fetchTickets: (workspaceId: string) => dispatch(fetchTickets(workspaceId)),
    createTicket: (ticket: TicketModel, workspaceId: string) => dispatch(createTicket(ticket, workspaceId)),
    startTicket: (ticket: TicketModel) => dispatch(startTicket(ticket)),
    endTicket: (ticket: TicketModel) => dispatch(endTicket(ticket)),
});

export default connect<StateProps, TicketsPageDispatchProps>(
    mapStateToProps, mapDispatchToProps
)(
    withRouter(TicketsPage)
);
