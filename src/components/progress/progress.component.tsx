import { LinearProgress } from '@mui/material';
import { Duration } from 'moment';
import { useEffect, useState } from 'react';
import { TimesModel } from '../../modules/tickets/times.model';
import { sumAllStartedTillNow, sumDurationsAndGetOpen } from '../../modules/tickets/utils';

interface ComponentProps {
    times?: TimesModel[];
    buffer: number;
    speed?: number;
}

export function ProgressComponent({...props}: ComponentProps) {
    const [finishedDuration, started] = sumDurationsAndGetOpen(props.times || []);
    const duration = finishedDuration?.clone().add(
        sumAllStartedTillNow(started)
    );
    const [value, setValue] = useState<Duration|null>(duration || null);

    useEffect(() => {
        let interval: NodeJS.Timer | null = null;

        interval = setInterval(() => {
            const duration = finishedDuration?.clone().add(
                sumAllStartedTillNow(started)
            ) || null;

            setValue(duration);
        }, props.speed || 1000);

        return () => {
            if (interval !== null) {
                clearInterval(interval);
            }
        }
        // eslint-disable-next-line
    }, [finishedDuration, started]);

    if (!value) {
        return null;
    }

    return (
        <LinearProgress
            variant="buffer"
            value={(100 / props.buffer) * (value?.asHours() || 0)}
            valueBuffer={100}
        />
    );
}
