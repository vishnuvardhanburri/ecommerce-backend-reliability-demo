const axios = require("axios");
const config = require("../config");
const logger = require("../middleware/logger");

async function createShipment(order) {
  if (config.simulateFailure) {
    throw new Error("Simulated failure");
  }

  try {
    const res = await axios.post("https://example.com/shipping", order, {
      timeout: 3000
    });
    return res.data;
  } catch (err) {
    logger.error({ err, orderId: order.orderId }, "shipping_api_failed");
    throw err;
  }
}

module.exports = { createShipment };
