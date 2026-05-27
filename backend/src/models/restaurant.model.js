import prisma from "../db/index.js";

const createRestaurantModel = (data) => {
    return prisma.restaurant.create({
        data
    });
};

const getRestaurantsModel = () => {
    return prisma.restaurant.findMany({
        include: {
            platform: true
        }
    });
};

export {
    createRestaurantModel,
    getRestaurantsModel
};