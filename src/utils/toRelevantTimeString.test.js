import { toRelevantTimeString } from "./";

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
