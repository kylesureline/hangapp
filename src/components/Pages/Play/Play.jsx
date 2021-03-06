import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Hangman } from "./Hangman";
import { Answer } from "./Answer/Answer";
import { Letters } from "./Letters/Letters";
import { SAVE_GAME } from "../../../reducers/actions";
import DocumentTitle from "react-document-title";

export const Play = () => {
  const game = useSelector(state => state.game);
  const { mode, categories } = useSelector(state => state.settings);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!game.isOver) {
      const answer = game.answer.words.join(" ");
      const guess = game.progress.join(" ");
      if (game.guessesRemaining === 0 && answer !== guess) {
        // lose
        dispatch(SAVE_GAME(false, mode, categories));
      } else if (game.guessesRemaining > 0 && answer === guess) {
        // win
        dispatch(SAVE_GAME(true, mode, categories));
      }
    }
  }, [game, categories, dispatch, mode]);

  return (
    <DocumentTitle title={`${process.env.REACT_APP_NAME} | Play`}>
      <main className="page page--play">
        <Hangman />
        <Answer />
        <Letters />
      </main>
    </DocumentTitle>
  );
};
