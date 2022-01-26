import { Box, Container } from '@mui/material';
import AppBar from '../components/app-bar/app-bar.component';

interface LayoutProps {
    children: JSX.Element[] | JSX.Element;
}

export function Layout({ children }: LayoutProps) {
    return (
        <>
            <AppBar />
            <Container maxWidth="xl">
                <Box mt={2}>
                    {children}
                </Box>
            </Container>
        </>
    );
}
