import { getRabbitChannel } from "./rabbitmq";

export async function consumeQueue(
  exchange: string,
  queue: string,
  handler: (data: any) => Promise<void>
) {
  const ch = await getRabbitChannel();

  await ch.assertExchange(exchange, "fanout", { durable: true });
  await ch.assertQueue(queue, { durable: true });
  await ch.bindQueue(queue, exchange, "");

  console.log(`👂 Listening on queue: ${queue}`);

  ch.consume(queue, async (msg) => {
    if (!msg) return;

    try {
      const data = JSON.parse(msg.content.toString());
      await handler(data);
      ch.ack(msg);
    } catch (err) {
      console.error("❌ Error processing message:", err);
      ch.nack(msg, false, false); // send to DLQ if configured
    }
  });
}

/**
 * Consume a queue
 *
    import { consumeQueue } from "./rabbit.consumer";
    import { messageBrokerConfig } from "@config/messageBroker.config";

    consumeQueue(
    messageBrokerConfig.userExchange,
    messageBrokerConfig.userQueue,
    async (data) => {
        console.log("📥 Received user event:", data);

        // Business logic
        // Save to DB, send email, etc.
    }
    );

 */
