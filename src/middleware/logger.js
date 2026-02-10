const pino = require("pino");

const logger = pino({
  level: "info",
  base: null
});

module.exports = logger;
