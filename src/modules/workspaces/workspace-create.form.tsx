import { Box, Button, Grid } from '@mui/material';
import { Form } from 'react-final-form';
import { WorkspaceModel } from './workspace.model';
import { TextField } from 'mui-rff';

interface FormProps {
    onSubmit: (workspace: WorkspaceModel) => void;
    formValues?: WorkspaceModel;
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

const validateWorkspaceCreate = (values: WorkspaceModel) => {
    const errors: { [fieldKey: string]: string } = {};

    if (!values.name || !values.name.trim().length) {
        errors.name = 'You need to fill workspace name!';
    }

    return errors;
};

export const CreateWorkspaceForm = ({
    onSubmit,
    formValues,
}: FormProps) => (
    <Box sx={style}>
        <Form
            onSubmit={onSubmit}
            initialValues={formValues || {}}
            validate={validateWorkspaceCreate}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <Grid container direction={"column"} spacing={5}>
                        <Grid item>
                            <TextField
                                label="Workspace name"
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
