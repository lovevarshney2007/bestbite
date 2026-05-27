import { asyncHandler }
from "../utils/asyncHandler.js";

import { ApiResponse }
from "../utils/ApiResponse.js";

import {
    compareFoodService
}
from "../services/compareService.js";

const compareFood =
asyncHandler(async(req,res)=>{

    const { itemName } =
        req.query;

    const result =
        await compareFoodService(
            itemName
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            result,
            "Comparison fetched"
        )
    );
});

export {
    compareFood
};