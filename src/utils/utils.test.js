import {
  // fetchData,
  // isOnline,
  // getFromLS,
  // saveToLS,
  formatWordObj,
  numberWithCommas
  // savePastGame,
  // saveCurrentGame,
  // getCurrentGame,
  // toHoursMinutesSeconds,
  // toRelevantTimeString
} from "./utils";

describe("custom utility functions", () => {
  describe("formatWordObj()", () => {
    it("formats correctly without a definition", () => {
      const word = "hockey";
      const wordType = "";
      const def = "";
      const wordObj = formatWordObj(word);

      expect(wordObj).toEqual({
        words: [word],
        wordType,
        def
      });
    });
    it("formats correctly with a definition", () => {
      const word = "hockey";
      const wordType = "noun";
      const def = `a game played on an ice rink in which two teams of six players on skates use curved sticks to try to shoot a puck into the opponent's goal`;
      const wordObj = formatWordObj(word, wordType, def);

      expect(wordObj).toEqual({
        words: [word],
        wordType,
        def
      });
    });
  });
  describe("numberWithCommas()", () => {
    it("works with 1-3 digits", () => {
      expect(numberWithCommas(1)).toEqual("1");
      expect(numberWithCommas(12)).toEqual("12");
      expect(numberWithCommas(123)).toEqual("123");
    });

    it("works with 4-6 digits", () => {
      expect(numberWithCommas(1234)).toEqual("1,234");
      expect(numberWithCommas(12345)).toEqual("12,345");
      expect(numberWithCommas(123456)).toEqual("123,456");
    });
  });
});
