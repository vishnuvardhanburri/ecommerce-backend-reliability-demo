if (process.env.SIMULATE_FAILURE === "true") {
  throw new Error("Simulated external API failure");
}
