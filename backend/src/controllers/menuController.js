import { asyncHandler }
from "../utils/asyncHandler.js";

import { ApiResponse }
from "../utils/ApiResponse.js";

import {
    createMenuService,
    getMenusService
}
from "../services/menuService.js";

const createMenu =
asyncHandler(async(req,res)=>{

    const menu =
        await createMenuService(
            req.body
        );

    return res.status(201).json(
        new ApiResponse(
            201,
            menu,
            "Menu created"
        )
    );
});

const getMenus =
asyncHandler(async(req,res)=>{

    const menus =
        await getMenusService();

    return res.status(200).json(
        new ApiResponse(
            200,
            menus,
            "Menus fetched"
        )
    );
});

export {
    createMenu,
    getMenus
};