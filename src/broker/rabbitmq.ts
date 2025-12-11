import { messageBrokerConfig } from "@config/messageBroker.config";
import amqplib, { ConfirmChannel } from "amqplib";

let connection: Awaited<ReturnType<typeof amqplib.connect>> | null = null;
let channel: ConfirmChannel | null = null;

export async function getRabbitChannel(): Promise<ConfirmChannel> {
  if (channel) return channel;

  try {
    connection = await amqplib.connect(messageBrokerConfig.url);

    connection.on("error", (err) => {
      console.error("❌ RabbitMQ connection error", err);
      connection = null;
      channel = null;
    });

    connection.on("close", () => {
      console.warn("⚠️ RabbitMQ connection closed. Reconnecting...");
      connection = null;
      channel = null;
      setTimeout(getRabbitChannel, 5000);
    });

    channel = await connection.createConfirmChannel();
    channel.prefetch(1);

    console.log("📨 RabbitMQ connected");
    return channel;
  } catch (err) {
    console.error("❌ RabbitMQ initial connection failed", err);
    throw err;
  }
}
