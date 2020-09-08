import { Book, Drawing, Game, Guess, Page, Player } from '../../types/models';
import { isDrawing, isGuess } from '../../types/type-guards';

const getActingPlayer = (
  ownerPos: number,
  players: Array<Player>,
  round: number
): Player => {
  const i = round === -1 ? ownerPos : ownerPos + round;

  return i === players.length ? players[0] : players[i];
};

const isCompleted = (page: Page) => {
  if (isDrawing(page)) {
    return Boolean(page.drawnImage);
  }
  if (isGuess(page)) {
    return Boolean(page.guessedWord);
  }
  return false;
};

export const hasAllBooks = (
  books: Array<Book>,
  players: Array<Player>,
  round: number
): boolean =>
  players.every((player) =>
    books.some((book) =>
      round === -1
        ? book.owner.id === player.id
        : book.pages[round].actor.id === player.id &&
          isCompleted(book.pages[round])
    )
  );

const createPage = (
  book: Book,
  actor: Player,
  round: number
): Drawing | Guess | null => {
  if (round === -1) {
    return {
      bookOwnerId: book.owner.id,
      startWord: book.startWord,
      actor,
    };
  }
  const currentPage = book.pages[round];
  if (isDrawing(currentPage) && currentPage.drawnImage) {
    return {
      bookOwnerId: book.owner.id,
      startImage: currentPage.drawnImage,
      actor,
    };
  }
  if (isGuess(currentPage) && currentPage.guessedWord) {
    return {
      bookOwnerId: book.owner.id,
      startWord: currentPage.guessedWord,
      actor,
    };
  }
  return null;
};

export const assignPlayers = (
  books: Array<Book>,
  players: Array<Player>,
  round: number
): Array<Book> => {
  return books.map((book) => {
    const ownerPos = players.findIndex((p) => p.id === book.owner.id);
    const nextPage = createPage(
      book,
      getActingPlayer(ownerPos, players, round),
      round
    );
    if (nextPage) {
      return {
        ...book,
        pages: [...book.pages, nextPage],
      };
    }
    return book;
  });
};

export const insertDrawing = (drawing: Drawing) => (game: Game) => {
  const book = game.books.find((book) => book.owner.id === drawing.bookOwnerId);
  if (book) {
    book.pages[game.round] = drawing;
    return { ...game, book };
  } else {
    throw Error('couldnt find book.');
  }
};
