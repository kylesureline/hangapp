import React from "react";
import { testRender, configureTestStore } from "../../../tests/testUtils";
import { Stats } from "./Stats";
import pastGames from "../../../tests/fixtures/pastGames";

describe("<Stats />", () => {
  let store;
  beforeEach(() => {
    store = configureTestStore();
  });
  it("renders correctly with no past games", () => {
    const { queryByText } = testRender(<Stats />, { store });

    expect(queryByText("no past games to display...")).toBeTruthy();
  });
  it("renders correctly with past games", () => {
    localStorage.setItem("past-games", JSON.stringify(pastGames));
    const { queryByText } = testRender(<Stats />, { store });

    expect(queryByText("no past games to display...")).not.toBeTruthy();
    expect(queryByText("standard schnauzer")).toBeTruthy();
  });
});
