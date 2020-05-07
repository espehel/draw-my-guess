import React, { FC, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';

interface Props {
  messages: Array<string>;
  onSendMessage: (message: string) => void;
}

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  messages: {
    height: '200px',
    overflow: 'scroll',
    padding: '1em',
  },
}));

const ChatPanel: FC<Props> = ({ messages, onSendMessage }) => {
  const [text, setText] = useState('');
  const classes = useStyles();
  return (
    <Paper variant="outlined">
      <section className={classes.messages}>
        {messages.map((message, i) => (
          <p key={i}>{message}</p>
        ))}
      </section>
      <section>
        <TextField
          variant="filled"
          value={text}
          size="small"
          fullWidth={true}
          onChange={(event) => setText(event.target.value)}
          InputProps={{
            endAdornment: (
              <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                endIcon={<Icon fontSize="small">send</Icon>}
                onClick={() => {
                  setText('');
                  onSendMessage(text);
                }}
              >
                Send
              </Button>
            ),
          }}
        />
      </section>
    </Paper>
  );
};

export default ChatPanel;
