import { Express } from "express";
import { loadSwagger as loadSwaggerImpl } from "@docs/swagger";

export function loadSwagger(app: Express) {
  loadSwaggerImpl(app);
}
