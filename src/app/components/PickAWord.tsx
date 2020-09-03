import React, { FC, useCallback, useState } from 'react';
import { Typography, Button } from '@material-ui/core';
import styled from 'styled-components';
import { useGame } from '../state/GameContext';
import { Player } from '../../types/models';
import SectionWrapper from './SectionWrapper';
import CountdownTimer from './CountdownTimer';

const StyledPickAWord = styled.main`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
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
`;

interface Props {
  words: string[];
}

const getRandomWord = (words: Array<string>): string =>
  words[Math.floor(Math.random() * words.length)];

const PickAWord: FC<Props> = ({ words }) => {
  const { connection, player } = useGame();
  const [chosenWord, setWord] = useState<string>();

  const onCountDownFinished = useCallback(() => {
    const startWord = chosenWord || getRandomWord(words);
    connection.sendBook({ startWord, owner: player, pages: [] });
  }, [chosenWord, words]);

  const onWordChosen = (word: string) => {
    setWord(word);
    connection.sendBook({ startWord: word, owner: player, pages: [] });
  };

  return (
    <StyledPickAWord>
      <SectionWrapper>
        <CountdownTimer
          minutes={0}
          seconds={30}
          onCountdownFinished={onCountDownFinished}
        />
      </SectionWrapper>
      <SectionWrapper>
        <Typography variant={'h5'}>{player.name}: Pick a word</Typography>
      </SectionWrapper>
      <SectionWrapper>
        <StyledWordList>
          {words.map((word: string) => (
            <StyledWord key={word}>
              <Button
                className={'word'}
                key={word}
                variant="contained"
                color={word === chosenWord ? 'secondary' : 'primary'}
                onClick={() => onWordChosen(word)}
              >
                {word}
              </Button>
            </StyledWord>
          ))}
        </StyledWordList>
      </SectionWrapper>
    </StyledPickAWord>
  );
};
export default PickAWord;
