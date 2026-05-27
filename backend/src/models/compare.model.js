import prisma from "../db/index.js";

const findMenusByItemName =
async(itemName)=>{

    return prisma.menu.findMany({
        where:{
            itemName:{
                contains:itemName,
                mode:"insensitive"
            }
        },
        include:{
            restaurant:{
                include:{
                    platform:true
                }
            }
        }
    });
};

export {
    findMenusByItemName
};