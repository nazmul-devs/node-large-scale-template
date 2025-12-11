import { consumeUserQueue } from "@broker/rabbitmq";

export async function initRabbitMQ() {
  await consumeUserQueue();
}
