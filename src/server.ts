import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "@loaders/db.loader";
import { initRabbitMQ } from "@loaders/messageBroker.loader";
import { initEventBus } from "@loaders/eventBus.loader";

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await connectDB();
    await initRabbitMQ();
    initEventBus();

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server", err);
    process.exit(1);
  }
}

start();
