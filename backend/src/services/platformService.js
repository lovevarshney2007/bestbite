import {
    createPlatformModel,
    getPlatformsModel
} from "../models/platform.model.js";

const createPlatformService =
async(payload)=>{

    return createPlatformModel(
        payload
    );
};

const getPlatformsService =
async()=>{

    return getPlatformsModel();
};

export {
    createPlatformService,
    getPlatformsService
};