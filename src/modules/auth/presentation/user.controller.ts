import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "@common/interfaces/apiResponse.interface";
import { CreateUserDTO } from "../application/user.dtos";

export type UserHandlers = {
  createUser: (payload: CreateUserDTO) => Promise<any>;
  getUserById: (id: string) => Promise<any>;
};

export const makeUserController = (handlers: UserHandlers) => ({
  createUser: async (
    req: Request,
    res: Response<ApiResponse<any>>,
    next: NextFunction
  ) => {
    try {
      const user = await handlers.createUser(req.body);
      res.status(201).json({ success: true, data: user });
    } catch (err) {
      next(err);
    }
  },

  getUserById: async (
    req: Request,
    res: Response<ApiResponse<any>>,
    next: NextFunction
  ) => {
    try {
      const user = await handlers.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
      res.json({ success: true, data: user });
    } catch (err) {
      next(err);
    }
  },
});
