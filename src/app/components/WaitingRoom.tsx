import React, { FC, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { Space } from '../../types/models';
import { useSpace } from '../state/SpaceContext';
import { Connection } from '../api/Connection';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

interface Props {
  space: Space;
  connection: Connection;
}
const useStyles = makeStyles({
  main: {
    textAlign: 'center',
    height: '100%',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  header: {
    padding: '0.3em',
    textAlign: 'left',
  },
  link: {
    padding: '1em',
  },
  nickname: {
    padding: '1em',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textField: {
    width: '100%',
    maxWidth: '30em',
    padding: '1em',
  },
  players: {
    padding: '1em',
  },
});

const WaitingRoom: FC<Props> = ({ connection, space }) => {
  const { players, isHost, player, setPlayer } = useSpace();
  const [nickname, setNickname] = useState('');
  const classes = useStyles();

  return (
    <article className={classes.main}>
      <Typography className={classes.header} variant="h1">
        Draw my Guess
      </Typography>
      {isHost ? (
        <section className={classes.content}>
          <Typography variant="h2">{`Welcome, ${space.host.name}!`}</Typography>
          <section className={classes.link}>
            <Typography>
              Share the link with your friends so they can join the game!
            </Typography>
            <a
              href={`${window.location.origin}/${space.id}`}
            >{`${window.location.origin}/${space.id}`}</a>
          </section>
          <section className={classes.players}>
            <Typography variant="h3">Friends who are here...</Typography>
            {players.map((player) => (
              <Typography key={player.id}>{player.name}</Typography>
            ))}
          </section>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={connection.startGame}
          >
            Start game!
          </Button>
        </section>
      ) : (
        <section className={classes.content}>
          {player ? (
            <>
              <Typography variant="h2">{`Welcome, ${player.name}!`}</Typography>
              <Typography>
                Waiting for {space.host.name} to start the game
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h2">Welcome!</Typography>
              <section className={classes.nickname}>
                <Typography>Set a nickname</Typography>
                <TextField
                  className={classes.textField}
                  placeholder="Nickname"
                  onChange={(event) => setNickname(event.target.value)}
                  variant="outlined"
                ></TextField>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => {
                    connection.joinGame(nickname);
                    setPlayer({ id: connection.socket.id, name: nickname });
                  }}
                >
                  I'm ready!
                </Button>
              </section>
            </>
          )}
        </section>
      )}
    </article>
  );
};

export default WaitingRoom;
