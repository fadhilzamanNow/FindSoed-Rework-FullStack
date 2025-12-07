import { Response } from "express";

export const success = (res: Response, message: string, data?: any, status = 200) => {
  res.status(status).json({ message, ...(data && { data }) });
};

export const error = (res: Response, message: string, errors?: Record<string, string>, status = 400) => {
  res.status(status).json({ message, ...(errors && { errors }) });
};
