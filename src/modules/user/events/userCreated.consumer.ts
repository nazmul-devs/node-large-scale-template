import { consumeQueue } from "@broker/rabbit.consumer";
import { messageBrokerConfig } from "@config/messageBroker.config";
import { sendWelcomeEmail } from "@mail/mail.service";

export function startUserCreatedConsumer() {
  consumeQueue(
    messageBrokerConfig.userExchange,
    messageBrokerConfig.userQueue,
    async (data) => {
      console.log("📥 USER_CREATED RECEIVED:", data);

      // ⭐⭐ REAL WORK HERE ⭐⭐

      // Example: Calculate score
      const score = (data.age ?? 0) * 2;

      // Example: Insert DB
      //   await db.userStats.create({
      //     userId: data.userId,
      //     score,
      //   });

      // Example: Update DB
      //   await db.users.update({
      //     where: { id: data.userId },
      //     data: { active: true },
      //   });

      // Send Email
      await sendWelcomeEmail(data.email, data.name);

      console.log("🎉 USER_CREATED processing completed");
    }
  );
}
