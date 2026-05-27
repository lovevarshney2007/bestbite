import {
    createMenuModel,
    getMenusModel
} from "../models/menu.model.js";

const createMenuService =
async(payload)=>{

    return createMenuModel(
        payload
    );
};

const getMenusService =
async()=>{

    return getMenusModel();
};

export {
    createMenuService,
    getMenusService
};