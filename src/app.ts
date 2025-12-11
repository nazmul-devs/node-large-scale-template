import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRoutes from "@modules/user/presentation/user.route";
import { errorHandler } from "@common/middlewares/error.middleware";
import { loadSwagger } from "@loaders/swagger.loader";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/users", userRoutes);

loadSwagger(app);

app.use(errorHandler);

export default app;
