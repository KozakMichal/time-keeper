import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { WorkspaceModel } from '../../modules/workspaces/workspace.model';

interface ComponentProps {
    workspace: WorkspaceModel;
    onNavigate: (workspace: WorkspaceModel) => void;
}

export function WorkspaceCardComponent({ workspace, onNavigate }: ComponentProps) {
    return (
        <Card sx={{height: '100%'}}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {workspace.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {workspace.description || ''}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => onNavigate(workspace)}>Visit</Button>
            </CardActions>
        </Card>
    );
}
