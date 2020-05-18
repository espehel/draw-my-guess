import React, { FC, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { Connection } from '../api/Connection';
import { createSpace } from '../api/space';
import { useConnectToSpace, useSpace } from '../state/SpaceContext';

const useStyles = makeStyles({
  main: {
    textAlign: 'center',
  },
  header: {
    padding: '0.3em',
  },
  create: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '3em',
    alignItems: 'center',
  },
  textField: {
    width: '100%',
    maxWidth: '30em',
    padding: '1em',
  },
});
const CreateSpace: FC = () => {
  const [connection, setConnection] = useState<Connection>();
  const [nickname, setNickname] = useState('');
  const connectToSpace = useConnectToSpace();
  const { setPlayer } = useSpace();
  const classes = useStyles();

  useEffect(() => {
    setConnection(Connection.setupConnection('/'));
  }, []);

  if (!connection) {
    return <p>spinner...</p>;
  }

  return (
    <article className={classes.main}>
      <Typography className={classes.header} variant="h1">
        Draw my Guess
      </Typography>
      <Typography variant="subtitle1">
        A game where drawings and guesses are passed around for hysterical
        results.
      </Typography>
      <section className={classes.create}>
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
          onClick={async () => {
            const space = await createSpace({
              hostName: nickname,
              hostId: connection.socket.id,
            });
            setPlayer({ id: space.host.id, name: nickname });
            connectToSpace(`/${space.id}`);
          }}
        >
          Create game
        </Button>
      </section>
    </article>
  );
};

export default CreateSpace;
