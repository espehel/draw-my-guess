import { Drawing, Guess, Page } from './models';

export const isDrawing = (page?: Page): page is Drawing => {
  return page ? (page as Drawing).startWord !== undefined : false;
};

export const isGuess = (page?: Page): page is Guess => {
  return page ? (page as Guess).startImage !== undefined : false;
};
