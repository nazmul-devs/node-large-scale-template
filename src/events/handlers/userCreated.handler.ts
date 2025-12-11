import { onEvent } from "@events/eventBus";
import { EventTypes } from "@events/eventTypes";
import { sendWelcomeEmail } from "@mail/mail.service";
import { publishUserCreated } from "@broker/rabbitmq";

onEvent(EventTypes.USER_CREATED, async (user: any) => {
  console.log("📌 EventBus: USER_CREATED", user);
  if (user.email && user.name) {
    await sendWelcomeEmail(user.email, user.name);
  }
  await publishUserCreated(user);
});
