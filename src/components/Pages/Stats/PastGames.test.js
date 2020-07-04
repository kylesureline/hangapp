import React from "react";
import { testRender, configureTestStore } from "../../../tests/testUtils";
import { PastGames } from "./PastGames";
import pastGames from "../../../tests/fixtures/pastGames";

describe("<PastGames />", () => {
  let store;
  beforeEach(() => {
    store = configureTestStore();
  });
  it("renders games", () => {
    const { queryAllByTitle, queryByText } = testRender(
      <PastGames data={pastGames} />,
      { store }
    );

    const { wonCount, lostCount } = pastGames.reduce(
      (acc, { won }) => {
        if (won) {
          return { ...acc, wonCount: acc.wonCount + 1 };
        } else {
          return { ...acc, lostCount: acc.lostCount + 1 };
        }
      },
      { wonCount: 0, lostCount: 0 }
    );

    // right number of won/lost icons
    expect(queryAllByTitle(/won/)).toHaveLength(wonCount);
    expect(queryAllByTitle(/lost/)).toHaveLength(lostCount);

    // every word is displayed
    pastGames.forEach(({ answer }) => {
      expect(queryByText(answer.words.join(" "))).toBeTruthy();
    });
  });
});
