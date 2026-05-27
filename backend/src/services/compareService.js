import {
    findMenusByItemName
} from "../models/compare.model.js";

import { ApiError }
from "../utils/ApiError.js";

const compareFoodService =
async(itemName)=>{

    const menus =
        await findMenusByItemName(
            itemName
        );

    if(!menus.length){
        throw new ApiError(
            404,
            "Food item not found"
        );
    }

    const sorted =
        menus.sort(
            (a,b)=>a.price-b.price
        );

    const transformed =
        sorted.map((item)=>({

            menuId:item.id,

            itemName:item.itemName,

            price:item.price,

            restaurant:
                item.restaurant.name,

            platform:
                item.restaurant
                    .platform.name,

            location:
                item.restaurant.location,

            cheapest:
                item.id ===
                sorted[0].id
        }));

    return {
        cheapest: transformed[0],
        options: transformed
    };
};

export {
    compareFoodService
};