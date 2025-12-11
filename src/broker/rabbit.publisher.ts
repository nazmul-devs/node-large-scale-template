import { getRabbitChannel } from "./rabbitmq";

export async function publishEvent(
  exchange: string,
  message: unknown,
  routingKey = ""
) {
  const ch = await getRabbitChannel();

  await ch.assertExchange(exchange, "fanout", { durable: true });

  ch.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)), {
    persistent: true,
  });

  console.log(`📤 Published to ${exchange}:`, message);
}



/**
 * Publish a JSON message to an exchange
    import { publishEvent } from "./rabbit.publisher";
    import { messageBrokerConfig } from "@config/messageBroker.config";

    await publishEvent(messageBrokerConfig.userExchange, {
    id: "123",
    name: "Nazmul",
    event: "USER_CREATED",
    });

 */
