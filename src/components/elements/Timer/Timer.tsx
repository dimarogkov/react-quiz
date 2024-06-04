import { useEffect, useRef, useState } from 'react';
import { formatTime } from '../../../helpers/formatTime';
import { Content } from '../../ui/Content';

export const Timer = () => {
    const [time, setTime] = useState(0);
    const timer = useRef(0);

    useEffect(() => {
        timer.current = window.setInterval(() => setTime((prevState) => prevState + 1), 1000);

        return () => {
            window.clearInterval(timer.current);
        };
    }, []);

    return <Content className='w-auto'>{formatTime(time)}</Content>;
};
