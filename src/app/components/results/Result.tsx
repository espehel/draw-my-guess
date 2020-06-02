import React, { FC } from "react";
import { Book, Drawing, Guess } from "../../../types/models";
import { makeStyles, Typography } from "@material-ui/core";
import CanvasDraw from "react-canvas-draw";
import uniqid from 'uniqid';
import PageWrapper from "../PageWrapper";
import { Page } from "../../../types/type-guards";

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        paddingTop: '2em',
    },
    resultItem: {
        border: '2px grey groove',
    },
    lastWord: {
        border: '2px darkcyan groove',
        backgroundColor: 'cadetblue',
        textColor: 'white',
    }

}));

interface Props {
    book: Book;

}
const Result: FC<Props> = ({ book }) => {
    const { startWord, pages } = book;
    const classes = useStyles();

    const isDrawing = (page: Page): page is Drawing => {
        return (page as Drawing).drawnImage !== undefined;
    }

    return (
        <section className={classes.container}>
            {pages.map(page => (
                <PageWrapper key={uniqid()} className={classes.resultItem}>
                    {isDrawing(page) ?
                        (
                            <CanvasDraw

                                disabled
                                immediateLoading
                                saveData={page.drawnImage}
                            />)
                        : (
                            <Typography
                                key={uniqid()}
                                variant={'h1'}>
                                {page.guessedWord}
                            </Typography>
                        )
                    }
                </PageWrapper>
            ))}
            <PageWrapper className={classes.lastWord}>
                <Typography variant={'h1'}> {startWord}</Typography>
            </PageWrapper>



        </section>
    )
}

export default Result;