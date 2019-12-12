const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const RATING_BAD = 3;
const RATING_NORMAL = 5;
const RATING_GOOD = 8;
const RATING_VERY_GOOD = 10;

export const timeToString = (seconds) => {
  seconds = Math.round(seconds);
  let hours = 0;
  let minutes = 0;

  hours = Math.floor(seconds / (SECONDS_IN_MINUTE * MINUTES_IN_HOUR));
  seconds = seconds % (SECONDS_IN_MINUTE * MINUTES_IN_HOUR);
  minutes = Math.floor(seconds / SECONDS_IN_MINUTE);
  seconds = seconds % SECONDS_IN_MINUTE;

  const time = `${String(hours).padStart(2, `0`)}:${String(minutes).padStart(2, `0`)}:${String(seconds).padStart(2, `0`)}`;
  return time;
};

export const levelCount = (rating) => {
  if (rating < RATING_BAD) {
    return `bad`;
  } else if (rating < RATING_NORMAL) {
    return `normal`;
  } else if (rating < RATING_GOOD) {
    return `good`;
  } else if (rating < RATING_VERY_GOOD) {
    return `very good`;
  }
  return `awesome`;
};
