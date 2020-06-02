import React, { FC, useState } from 'react';
import { Typography, Button, makeStyles } from '@material-ui/core';
import { Book } from '../../../types/models';
import Result from './Result';
import SectionWrapper from '../SectionWrapper';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(4),
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

interface Props {
  books: Book[];
}

const ShowResults: FC<Props> = ({ books }) => {
  const [showResults, setShowResults] = useState<boolean>(false);
  const classes = useStyles();

  return (
    <SectionWrapper>
      {!showResults ? (
        <>
          <Typography variant={'h5'}>Completed!</Typography>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={() => setShowResults(!showResults)}
          >
            {' '}
            Show Results
          </Button>
        </>
      ) : (
        <>
          <Typography variant={'h4'}>Results</Typography>
          <div className={classes.container}>
            {books.map((book: Book) => (
              <Result key={book.owner.id} book={book} />
            ))}
          </div>
        </>
      )}
    </SectionWrapper>
  );
};

export default ShowResults;
