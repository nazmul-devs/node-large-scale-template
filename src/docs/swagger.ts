import { Express } from "express";
import swaggerUi from "swagger-ui-express";

const swaggerDoc = {
  openapi: "3.0.0",
  info: {
    title: process.env.SWAGGER_TITLE || "My API",
    version: process.env.SWAGGER_VERSION || "1.0.0",
  },
  paths: {
    "/api/users": {
      post: {
        summary: "Create user",
        tags: ["User"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  email: { type: "string", format: "email" },
                },
                required: ["name", "email"],
              },
            },
          },
        },
        responses: {
          "201": {
            description: "User created",
          },
        },
      },
      get: {
        summary: "Get user by id",
        tags: ["User"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          "200": { description: "User found" },
          "404": { description: "User not found" }
        }
      }
    }
  },
};

export function loadSwagger(app: Express) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc as any));
  console.log("📚 Swagger docs available at /docs");
}
