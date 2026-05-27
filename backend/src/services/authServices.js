import bcrypt from "bcryptjs";

import prisma from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";

import {
    generateAccessToken,
    generateRefreshToken
} from "../utils/token.js";

import jwt from "jsonwebtoken";

const registerUserService = async (payload) => {

    const { name, email, password } = payload;

    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (existingUser) {
        throw new ApiError(
            409,
            "Email already exists"
        );
    }

    const hashedPassword = await bcrypt.hash(
        password,
        10
    );

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });

    return {
        id: user.id,
        name: user.name,
        email: user.email
    };
};

const loginUserService = async (payload) => {

    const { email, password } = payload;

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (!user) {
        throw new ApiError(
            404,
            "User not found"
        );
    }

    const isPasswordCorrect =
        await bcrypt.compare(
            password,
            user.password
        );

    if (!isPasswordCorrect) {
        throw new ApiError(
            401,
            "Invalid credentials"
        );
    }

   const accessToken =
    generateAccessToken(user);

const refreshToken =
    generateRefreshToken(user);

await prisma.user.update({
    where: {
        id: user.id
    },
    data: {
        refreshToken
    }
});

   return {
    accessToken,
    refreshToken,
    user: {
        id: user.id,
        name: user.name,
        email: user.email
    }
};
};

const refreshAccessTokenService =
async (refreshToken)=>{

    if(!refreshToken){
        throw new ApiError(
            401,
            "Refresh token missing"
        )
    }

    const decoded =
        jwt.verify(
            refreshToken,
            process.env.JWT_SECRET
        )

    const user =
        await prisma.user.findUnique({
            where:{
                id:decoded.id
            }
        })

    if(
        !user ||
        user.refreshToken !== refreshToken
    ){
        throw new ApiError(
            401,
            "Invalid refresh token"
        )
    }

    const accessToken =
        generateAccessToken(user)

    return { accessToken }
};

const logoutUserService =
async(userId)=>{

    await prisma.user.update({
        where:{
            id:userId
        },
        data:{
            refreshToken:null
        }
    })
}

export { 
    registerUserService,
    loginUserService,
    refreshAccessTokenService,
    logoutUserService
 };