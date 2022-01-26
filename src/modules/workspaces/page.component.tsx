import { Alert, Fab, Grid, Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';

import { connect, DefaultRootState } from 'react-redux';
import { Dispatch } from 'redux';
import { createWorkspace, fetchWorkspaces } from './actions';
import { WorkspaceModel } from './workspace.model';
import { CreateWorkspaceForm } from './workspace-create.form';
import { WorkspaceCardComponent } from '../../components/workspace/workspace-card.component';
import { navigate } from '../../store';

interface StateProps {
    workspaces: WorkspaceModel[];
    search: string;
}

interface WorkspacesPageProps {}

interface WorkspacePageDispatchProps {
    fetchWorkspaces: () => ReturnType<typeof fetchWorkspaces>,
    createWorkspace: (workspace: WorkspaceModel) => ReturnType<typeof createWorkspace>,
}

const WorkspacesPage = (
    {fetchWorkspaces, ...props}: StateProps & WorkspacePageDispatchProps & WorkspacesPageProps
) => {
    useEffect(() => {
        fetchWorkspaces();
    }, [fetchWorkspaces]);

    const [addOpen, setAddOpen] = useState<boolean>(false);

    const workspaces = (props.workspaces || []).filter(
        (workspace) => workspace.name.toLowerCase().match(props.search)
    );

    return (
        <>
            {!workspaces.length && (
                <Alert severity="info">
                    There are no workspaces!
                </Alert>
            )}

            {Boolean(workspaces.length) && (
                <Grid container spacing={2} alignItems="stretch">
                    {workspaces.map(
                        (workspace) => (
                            <Grid item xs={4} key={workspace.id}>
                                <WorkspaceCardComponent
                                    workspace={workspace}
                                    onNavigate={(workspace) => navigate(`/workspace/${workspace.id}`)}
                                />
                            </Grid>
                        )
                    )}
                </Grid>
            )}

            <Modal
                open={addOpen}
                onClose={() => setAddOpen(false)}
                aria-labelledby="add-workspace"
                aria-describedby="add-workspace"
            >
                <>
                    <CreateWorkspaceForm
                        onSubmit={(workspace) => {
                            props.createWorkspace(workspace);
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
    workspaces: state.workspaces?.workspaces || [],
    search: state.search?.search || '',
});

const mapDispatchToProps = (dispatch: Dispatch): WorkspacePageDispatchProps => ({
    fetchWorkspaces: () => dispatch(fetchWorkspaces()),
    createWorkspace: (workspace: WorkspaceModel) => dispatch(createWorkspace(workspace)),
});

export default connect<StateProps, WorkspacePageDispatchProps>(
    mapStateToProps, mapDispatchToProps
)(
    WorkspacesPage
);
