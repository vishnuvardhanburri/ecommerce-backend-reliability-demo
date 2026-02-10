require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  redis: {
    host: process.env.REDIS_HOST || "redis",
    port: process.env.REDIS_PORT || 6379
  },
  simulateFailure: process.env.SIMULATE_FAILURE === "true"
};
