import { asyncHandler }
from "../utils/asyncHandler.js";

import { ApiResponse }
from "../utils/ApiResponse.js";

import {
    createPlatformService,
    getPlatformsService
}
from "../services/platformService.js";

const createPlatform =
asyncHandler(async(req,res)=>{

    const platform =
        await createPlatformService(
            req.body
        );

    return res.status(201).json(
        new ApiResponse(
            201,
            platform,
            "Platform created"
        )
    );
});

const getPlatforms =
asyncHandler(async(req,res)=>{

    const platforms =
        await getPlatformsService();

    return res.status(200).json(
        new ApiResponse(
            200,
            platforms,
            "Platforms fetched"
        )
    );
});

export {
    createPlatform,
    getPlatforms
};