import { saveToLS } from "./saveToLS";

export const saveCurrentGame = state => saveToLS("current-game", state);
