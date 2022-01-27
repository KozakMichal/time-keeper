import { Duration } from 'moment';
import { useEffect, useState } from 'react';
import { formatDuration } from '../../modules/tickets/utils';

interface ComponentProps {
    getTotal: () => Duration|null;
    label: string;
}

export function TimeCounterComponent({getTotal, ...props}: ComponentProps) {
    const [value, setValue] = useState<Duration|null>(
        getTotal()
    );

    useEffect(() => {
        let interval: NodeJS.Timer | null = null;

        interval = setInterval(() => {
            setValue(getTotal());
        }, 1000);

        return () => {
            if (interval !== null) {
                clearInterval(interval);
            }
        }
        // eslint-disable-next-line
    }, []);

    if (!value) {
        return null;
    }

    return (
        <>
            {props.label} {formatDuration(value)}
        </>
    );
}
