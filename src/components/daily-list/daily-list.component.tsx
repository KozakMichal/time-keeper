import { Card, CardContent, Typography } from '@mui/material';
import { DailyListEvent } from './event.model';

interface ComponentProps {
    events: DailyListEvent[];
}

export default function DailyList({ events }: ComponentProps) {
    const prepared = events
        .sort(
            (eventA, eventB) => eventA.start.valueOf() - eventB.start.valueOf()
        )
        .reduce(
            (carry: Record<string, DailyListEvent[]>, event) => {
                const formated = event.start.format('MMMM Do YYYY');
                if (!carry[formated]) {
                    carry[formated] = [];
                }

                if (!carry[formated].filter(r => r.unitId === event.unitId).length) {
                    carry[formated].push(event);
                }

                return carry;
            },
            {}
        );

    return (
        <>
            {Object.keys(prepared).map(
                (key) => (
                    <Card sx={{ minWidth: 275, marginBottom: 4, marginTop: 1 }} key={key}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {key}
                            </Typography>
                            {prepared[key].map(
                                (event) => (
                                    <Typography key={event.id} sx={{ mb: 1.5 }} color="text.secondary">
                                        {event.name}
                                    </Typography>
                                )
                            )}
                        </CardContent>
                    </Card>
                )
            )}
        </>
    );
}
