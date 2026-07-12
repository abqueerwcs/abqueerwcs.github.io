const { DateTime } = require("luxon");
const events = require("./events.json");
const getCutoff = require("./eventCutoff.js");

module.exports = function () {
  const cutoff = getCutoff();
  return events
    .filter(e => DateTime.fromISO(e.date, { zone: "America/Denver" }).toMillis() >= cutoff)
    .sort((a, b) => a.date.localeCompare(b.date));
};
