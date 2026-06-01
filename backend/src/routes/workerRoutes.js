import { Router }
from "express";

import menuQueue
from "../queue/menu.queue.js";

const router = Router();

router.get(
    "/test",
    async(req,res)=>{

        await menuQueue.add(
            "fetch-menu",
           {
    platform:"swiggy",
    city:"Delhi",
    search:"Burger King"
}
        );

        res.json({
            success:true,
            message:
            "Job added"
        });
    }
);

export default router;