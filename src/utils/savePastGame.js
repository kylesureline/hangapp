import { saveToLS, getFromLS } from "./";

export const savePastGame = game => {
  const pastGames = [game, ...(getFromLS("past-games") || [])].slice(0, 1000);
  saveToLS("past-games", pastGames);
};
