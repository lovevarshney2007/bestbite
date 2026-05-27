import prisma from "../db/index.js";

const createMenuModel = (data) => {
    return prisma.menu.create({
        data
    });
};

const getMenusModel = () => {
    return prisma.menu.findMany({
        include: {
            restaurant: {
                include: {
                    platform: true
                }
            }
        }
    });
};

export {
    createMenuModel,
    getMenusModel
};