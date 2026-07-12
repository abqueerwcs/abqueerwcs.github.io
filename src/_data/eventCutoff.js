const { DateTime } = require("luxon");
const events = require("./events.json");

const GRACE_PERIOD_DAYS = 2;

function getCutoff() {
  return DateTime.now().setZone("America/Denver").startOf("day").minus({ days: GRACE_PERIOD_DAYS }).toMillis();
}

function toMs(isoDate) {
  return DateTime.fromISO(isoDate, { zone: "America/Denver" }).toMillis();
}

module.exports = getCutoff;
module.exports.filterUpcoming = () => {
  const cutoff = getCutoff();
  return events.filter(e => toMs(e.date) >= cutoff).sort((a, b) => a.date.localeCompare(b.date));
};
module.exports.filterPast = () => {
  const cutoff = getCutoff();
  return events.filter(e => toMs(e.date) < cutoff).sort((a, b) => b.date.localeCompare(a.date));
};
