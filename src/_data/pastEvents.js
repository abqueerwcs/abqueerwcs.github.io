const { DateTime } = require("luxon");
const events = require("./events.json");

module.exports = function () {
  const now = DateTime.now().setZone("America/Denver").startOf("day").minus({ days: 2 }).toMillis();
  return events
    .filter(e => DateTime.fromISO(e.date, { zone: "America/Denver" }).toMillis() < now)
    .sort((a, b) => b.date.localeCompare(a.date));
};
