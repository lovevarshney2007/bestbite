import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { registerUserService } from "../services/authServices.js";
import { loginUserService } from "../services/authServices.js";

import {
  refreshAccessTokenService,
  logoutUserService,
} from "../services/authServices.js";


// Register a new user

const registerUser = asyncHandler(async (req, res) => {
  const user = await registerUserService(req.body);

  return res
    .status(201)
    .json(new ApiResponse(201, user, "User registered successfully"));
});

// Login user and set tokens in cookies

const loginUser = asyncHandler(async (req, res) => {
  const result = await loginUserService(req.body);

  const options = {
    httpOnly: true,
    secure: false,
  };

  return res
    .status(200)
    .cookie("accessToken", result.accessToken, options)
    .cookie("refreshToken", result.refreshToken, options)
    .json(new ApiResponse(200, result, "Login successful"));
});

// Refresh access token using refresh token

const refreshAccessToken =
asyncHandler(async(req,res)=>{

    const refreshToken =
        req.cookies.refreshToken

    const result =
        await refreshAccessTokenService(
            refreshToken
        )

    return res
        .status(200)
        .cookie(
            "accessToken",
            result.accessToken,
            {
                httpOnly:true
            }
        )
        .json(
            new ApiResponse(
                200,
                result,
                "Token refreshed"
            )
        )
})

// Logout user and clear tokens

const logoutUser =
asyncHandler(async(req,res)=>{

    await logoutUserService(
        req.user.id
    )

    return res
        .clearCookie("accessToken")
        .clearCookie("refreshToken")
        .json(
            new ApiResponse(
                200,
                {},
                "Logout successful"
            )
        )
})



export { registerUser, loginUser, refreshAccessToken, logoutUser };
