/**
 * Worker Service
 * ---------------
 * This file runs ALL RabbitMQ consumers.
 *
 * Run using:
 *    ts-node src/worker.ts
 * or build and run:
 *    node dist/worker.js
 *
 * This worker should run as a separate process
 * from your main API server.
 */

import { startUserCreatedConsumer } from "@modules/user/events/userCreated.consumer";
import "module-alias/register";

// Import your consumers

// Optional: Import more consumers here (products, orders, etc.)
// import { startOrderPlacedConsumer } from "./events/order/orderPlaced.consumer";

async function startWorker() {
  console.log("🚀 Worker service starting...");

  try {
    // Register Consumers Here
    startUserCreatedConsumer();

    // Add more consumers as needed
    // startOrderPlacedConsumer();
    // startInventoryUpdatedConsumer();

    console.log("🔥 All consumers registered. Worker is now listening.");
  } catch (err) {
    console.error("❌ Worker failed to start:", err);
    process.exit(1);
  }
}

// Start the worker
startWorker();

// Graceful shutdown
process.on("SIGTERM", () => {
  console.warn("⚠️ Worker received SIGTERM. Shutting down...");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.warn("⚠️ Worker received SIGINT. Shutting down...");
  process.exit(0);
});
