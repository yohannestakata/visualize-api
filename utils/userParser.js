import User from "./models/userModel";
import catchAsync from "./utils/catchAsync";
import { verify } from "jsonwebtoken";

export default catchAsync(async (req, res, next) => {
  if (!req.cookies.jwt) next();
  const { id } = verify(req.cookies.jwt, process.env.JWT_SECRET);
  const user = await User.findById(id);
  if (!user) next();
  req.user = user;
  next();
});