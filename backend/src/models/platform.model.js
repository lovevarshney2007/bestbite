import prisma from "../db/index.js";

const createPlatformModel = (data) => {
    return prisma.platform.create({
        data
    });
};

const getPlatformsModel = () => {
    return prisma.platform.findMany();
};

export {
    createPlatformModel,
    getPlatformsModel
};