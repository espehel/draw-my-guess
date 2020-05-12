import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';


const StyledCountdownTimer = styled.div`
    padding: 0.75rem 1rem 0.75rem 1rem;
    background: darkseagreen;
    border-radius: 5px;
    color: white;
`;

interface Props {
    minutes: number;
    seconds: number;
}

const CountdownTimer: FC<Props> = ({ minutes, seconds }) => {
    const [secCounter, setSecCounter] = useState(seconds);
    const [minCounter, setMinCounter] = useState(minutes);

    useEffect(() => {
        if (secCounter > 0) {
            setTimeout(() => setSecCounter(secCounter - 1), 1000);
        }
        if (secCounter === 0) {
            if (minCounter === 0) {
                console.log('Start game! Next peeji')
            } else {
                setMinCounter(minCounter - 1)
                setSecCounter(59)
            }
        }
    }, [secCounter, minCounter])

    const timerSeconds = secCounter < 10 ? `0${secCounter}` : secCounter
    const timerMinutes = minCounter < 10 ? `0${minCounter}` : minCounter

    return (
        <StyledCountdownTimer>
            <Typography variant={'subtitle1'}>
                {`Time left ${timerMinutes}:${timerSeconds}`}
            </Typography>
        </StyledCountdownTimer>
    )
}

export default CountdownTimer;