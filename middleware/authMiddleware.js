import { findUserById } from "../Model/userModel.js";
import { buildErrorResponse } from "../utility/responseHelper.js";

export const userAuth = async (req, res, next) => {
  try {
    // get the user from request| authorization has user id
    const { authorization } = req.headers;

    const user = await findUserById(authorization);

    // check if user is valid user

    if (user?._id) {
      req.userId = user._id;
      next();
      return;
    }
    buildErrorResponse(res, "Unauthorized user !!");
  } catch (error) {
    buildErrorResponse(res, "Unauthorized user !!");
  }
};
