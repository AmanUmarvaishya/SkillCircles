import { DateTime } from "luxon";

export const requestTime = (req, res, next) => {
  const now = DateTime.now()
    .setZone("asia/kolkata")
    .minus({ weeks: 1 })
    .endOf("day")
    .toISO();
  console.log(`API Hit ${req.method} ${req.url} at ${now}`);

  next();
};
