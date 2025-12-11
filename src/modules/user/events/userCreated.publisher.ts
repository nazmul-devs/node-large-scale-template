import { messageBrokerConfig } from "@config/messageBroker.config";
import { UserCreatedEvent } from "./userCreated.event";
import { publishEvent } from "@broker/rabbit.publisher";

export async function publishUserCreatedEvent(data: UserCreatedEvent) {
  await publishEvent(messageBrokerConfig.userExchange, data);
}
