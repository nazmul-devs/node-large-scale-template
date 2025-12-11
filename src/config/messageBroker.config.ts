export const messageBrokerConfig = {
  url: process.env.RABBITMQ_URL || "amqp://localhost:5672",
  userExchange: process.env.RABBITMQ_USER_EXCHANGE || "user.exchange",
  userQueue: process.env.RABBITMQ_USER_QUEUE || "user.queue",
};
