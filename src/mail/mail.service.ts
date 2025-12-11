import { mailConfig } from "@config/mail.config";
import fs from "fs";
import nodemailer from "nodemailer";
import path from "path";

const transporter = nodemailer.createTransport({
  host: mailConfig.host,
  port: mailConfig.port,
  secure: false,
  auth: {
    user: mailConfig.user,
    pass: mailConfig.pass,
  },
});

function loadTemplate(name: string): string {
  const filePath = path.join(__dirname, "templates", `${name}.html`);
  return fs.readFileSync(filePath, "utf-8");
}

export async function sendWelcomeEmail(to: string, name: string) {
  const html = loadTemplate("welcome").replace("{{name}}", name);

  await transporter.sendMail({
    from: mailConfig.from,
    to,
    subject: "Welcome to our app!",
    html,
  });

  console.log(`📧 Welcome email sent to ${to}`);
}
