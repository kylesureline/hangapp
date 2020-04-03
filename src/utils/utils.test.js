import {
  formatWordObj,
  numberWithCommas,
  toHoursMinutesSeconds,
  toRelevantTimeString
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
  describe("toHoursMinutesSeconds()", () => {
    it("returns seconds ago", () => {
      const ms = 50 * 1000;

      expect(toHoursMinutesSeconds(ms)).toEqual("50s ago");
    });
    it("returns minutes and seconds ago", () => {
      const ms = 50 * 1000 + 2 * 60 * 1000;

      expect(toHoursMinutesSeconds(ms)).toEqual("2m 50s ago");
    });
    it("returns hours and minutes ago", () => {
      const ms = 50 * 1000 + 2 * 60 * 1000 + 3 * 60 * 60 * 1000;

      expect(toHoursMinutesSeconds(ms)).toEqual("3h 2m ago");
    });
  });
  describe("toRelevantTimeString()", () => {
    it("returns 2m 50s for recent timestamp", () => {
      const ms = 50 * 1000 + 2 * 60 * 1000;

      expect(toRelevantTimeString(Date.now() - ms)).toEqual("2m 50s ago");
    });
    it("returns date for old timestamp", () => {
      const ms = 2 * 24 * 60 * 60 * 1000;

      const d = new Date();
      d.setDate(new Date().getDate() - 2);

      expect(toRelevantTimeString(Date.now() - ms)).toEqual(
        d.toLocaleString("default", {
          day: "numeric",
          month: "numeric",
          year: "numeric"
        })
      );
    });
  });
});
