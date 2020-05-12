# Draw my Guess

## Setup

### Install

Install all dependencies:

```sh
npm install
```

### Heroku
Download and install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli).

Log into heroku
```sh
heroku login
```

Add heroku repository as a remote
```sh
heroku git:remote -a draw-my-guess
```

### Autoformat

This project uses [Prettier](https://prettier.io/). It is recomended to set up auto format for your editor of choice. You can find a guide [here](https://prettier.io/docs/en/editors.html).

## Run locally

Run on local development server:

```sh
npm run local
```

Open https://localhost:5555 in you browser.

## Deploy

Deploy to heroku

```sh
npm run deploy
```

Go to https://draw-my-guess.herokuapp.com/

## Verify

You can quickly verify the code this way:

```sh
npm run verify
```
