import { toHoursMinutesSeconds } from "./";

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
