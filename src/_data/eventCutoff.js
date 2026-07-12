const { DateTime } = require("luxon");

const GRACE_PERIOD_DAYS = 2;

module.exports = function () {
  return DateTime.now().setZone("America/Denver").startOf("day").minus({ days: GRACE_PERIOD_DAYS }).toMillis();
};
