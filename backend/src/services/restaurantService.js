import {
    createRestaurantModel,
    getRestaurantsModel
} from "../models/restaurant.model.js";

const createRestaurantService =
async(payload)=>{

    return createRestaurantModel(
        payload
    );
};

const getRestaurantsService =
async()=>{

    return getRestaurantsModel();
};

export {
    createRestaurantService,
    getRestaurantsService
};