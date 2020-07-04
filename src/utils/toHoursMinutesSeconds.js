export const toHoursMinutesSeconds = valueOf => {
  const remainderOf = inMilliseconds => {
    const result = (valueOf - (valueOf % inMilliseconds)) / inMilliseconds;
    valueOf -= result * inMilliseconds;
    return result;
  };

  const toString = (h, m, s) => {
    if (h) {
      return `${h}h ${m}m ago`;
    } else if (m) {
      return `${m}m ${s}s ago`;
    } else {
      return `${s}s ago`;
    }
  };
  const mil = {
    hours: 60 * 60 * 1000,
    minutes: 60 * 1000,
    seconds: 1000
  };
  const hours = remainderOf(mil.hours);
  const minutes = remainderOf(mil.minutes);
  const seconds = remainderOf(mil.seconds);

  return toString(hours, minutes, seconds);
};
