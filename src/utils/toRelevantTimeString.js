import { toHoursMinutesSeconds } from "./toHoursMinutesSeconds";

export const toRelevantTimeString = timestamp => {
  const now = Date.now();
  const old = 24 * 60 * 60 * 1000; // one day

  if (now - timestamp >= old) {
    return new Date(timestamp).toLocaleString("default", {
      day: "numeric",
      month: "numeric",
      year: "numeric"
    });
  } else {
    return toHoursMinutesSeconds(now - timestamp);
  }
};
