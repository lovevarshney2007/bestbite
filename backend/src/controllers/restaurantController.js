import { asyncHandler }
from "../utils/asyncHandler.js";

import { ApiResponse }
from "../utils/ApiResponse.js";

import {
    createRestaurantService,
    getRestaurantsService
}
from "../services/restaurantService.js";

const createRestaurant =
asyncHandler(async(req,res)=>{

    const restaurant =
        await createRestaurantService(
            req.body
        );

    return res.status(201).json(
        new ApiResponse(
            201,
            restaurant,
            "Restaurant created"
        )
    );
});

const getRestaurants =
asyncHandler(async(req,res)=>{

    const restaurants =
        await getRestaurantsService();

    return res.status(200).json(
        new ApiResponse(
            200,
            restaurants,
            "Restaurants fetched"
        )
    );
});

export {
    createRestaurant,
    getRestaurants
};