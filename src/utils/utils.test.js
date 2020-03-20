import {
  // fetchData,
  // isOnline,
  // getFromLS,
  // saveToLS,
  // formatWordObj,
  numberWithCommas
  // savePastGame,
  // saveCurrentGame,
  // getCurrentGame,
  // toHoursMinutesSeconds,
  // toRelevantTimeString
} from "./utils";

describe("custom utility functions", () => {
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
