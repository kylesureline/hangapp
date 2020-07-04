import React from "react";
import { testRender, configureTestStore } from "../../../tests/testUtils";
import { PastGamesItem } from "./PastGamesItem";
import pastGames from "../../../tests/fixtures/pastGames";

describe("<PastGamesItem />", () => {
  let store;
  beforeEach(() => {
    store = configureTestStore();
  });
  it("renders a won game", () => {
    // find a won game
    const game = pastGames.find(({ won }) => won);
    const { queryByTitle, queryByText } = testRender(
      <PastGamesItem game={game} />,
      { store }
    );

    expect(queryByTitle(/won/)).toBeTruthy();
    expect(queryByText(game.answer.words.join(" "))).toBeTruthy();
  });

  it("renders a lost game", () => {
    // find a lost game
    const game = pastGames.find(({ won }) => !won);
    const { queryByTitle, queryByText } = testRender(
      <PastGamesItem game={game} />,
      { store }
    );

    expect(queryByTitle(/lost/)).toBeTruthy();
    expect(queryByText(game.answer.words.join(" "))).toBeTruthy();
  });
});
