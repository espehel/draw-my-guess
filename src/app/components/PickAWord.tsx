import React, { FC } from 'react';
import { Typography, Button } from '@material-ui/core';
import styled from 'styled-components';
import { useGame } from '../state/GameContext';
import { Player } from '../../types/models';
import SectionWrapper from './SectionWrapper';
import Countdown from 'react-countdown';

const StyledPickAWord = styled.main`
    display:flex;
    align-items: center;
    flex-direction: column;
`
const StyledWordList = styled.div`
    max-width: 500px;
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
`;
const StyledWord = styled.div`
    padding-left: 1rem;
    padding-top: 1rem;
    &:first-child {
        padding-left: 0;
`
const StyledCountdownTimer = styled.div`
    padding: 0.75rem 1rem 0.75rem 1rem;
    background: darkseagreen;
    border-radius: 5px;
    color: white;
`;
interface Props {
    player: Player;
    words: string[];
}

const PickAWord: FC<Props> = ({ player, words }) => {

    const { setWord } = useGame();

    return (
        <StyledPickAWord>
            <SectionWrapper>
                <StyledCountdownTimer>
                    <Typography variant={'h4'} >
                        <Countdown zeroPadTime={2} autoStart={true} date={Date.now() + 30000} minutes={0} />
                    </Typography>
                </StyledCountdownTimer>
            </SectionWrapper>
            <SectionWrapper>
                <Typography variant={'h5'} >
                    {player.name}: Pick a word
                </Typography>
            </SectionWrapper>
            <SectionWrapper>
                <StyledWordList>
                    {words.map((word: string) => (
                        <StyledWord key={word}>
                            <Button
                                className={'word'}
                                key={word}
                                variant="contained"
                                color="primary"
                                onClick={() => setWord(word)}
                            >
                                {word}
                            </Button>
                        </StyledWord>
                    ))}
                </StyledWordList>
            </SectionWrapper>

        </StyledPickAWord>
    )
}
export default PickAWord;