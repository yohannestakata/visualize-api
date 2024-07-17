import User from "../models/userModel";
import { verify } from "jsonwebtoken";
import catchAsync from "./catchAsync";

export default () =>
  catchAsync(async (req, res, next) => {
    if (!req.headers.authorization) return next();
    const { id } = verify(req.headers.authorization, process.env.JWT_SECRET);
    const user = await User.findById(id);
    if (!user) return next();
    req.user = user;
    next();
  });
