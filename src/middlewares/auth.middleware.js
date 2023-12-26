import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async(req, _, next) => {
    try {
        // console.log("***********verifyJWT************, req:-", req);
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")  // or is for mobiles to check header // check in postman // jwt.io
    
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
        // console.log("auth middleware, access token :-", token);
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        // console.log("auth middleware, decoded token :-", decodedToken);
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!user) {
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user = user;   // adding a new object "user" {can be any name}in req and we will use it in logoutUser in user.controllers.js
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
    
})