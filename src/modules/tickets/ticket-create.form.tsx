import { Box, Button, Grid } from '@mui/material';
import { Form } from 'react-final-form';
import { TextField, DateTimePicker } from 'mui-rff';
import { TicketModel } from './ticket.model';

interface FormProps {
    onSubmit: (workspace: TicketModel) => void;
    formValues?: TicketModel;
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    maxWidth: '80%',
    boxShadow: 24,
    p: 4,
};

const validateTicketCreate = (values: TicketModel) => {
    const errors: { [fieldKey: string]: string } = {};

    if (!values.name || !values.name.trim().length) {
        errors.name = 'You need to fill ticket name!';
    }

    return errors;
};

export const CreateTicketForm = ({
    onSubmit,
    formValues,
}: FormProps) => (
    <Box sx={style}>
        <Form
            onSubmit={onSubmit}
            initialValues={formValues || {}}
            validate={validateTicketCreate}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <Grid container direction={"column"} spacing={5}>
                        <Grid item>
                            <TextField
                                label="Ticket name"
                                name="name"
                                required={true}
                                autoFocus
                            />
                        </Grid>

                        <Grid item>
                            <TextField
                                label="Description"
                                name="description"
                                required={false}
                                multiline
                            />
                        </Grid>

                        <Grid item>
                            <TextField
                                label="Estimate"
                                name="estimate"
                                required={false}
                                type="number"
                            />
                        </Grid>

                        <Grid item>
                            <DateTimePicker
                                label="Due date"
                                name="due"
                                required={false}
                            />
                        </Grid>

                        <Grid item alignSelf="flex-end">
                            <Button
                                variant="outlined"
                                size="large"
                                type="submit"
                            >
                                Create
                            </Button>
                        </Grid>

                    </Grid>
                </form>
            )}
        />
    </Box>
);
