import { Worker }
from "bullmq";

import redis
from "../queue/redis.js";
import testScraper
from "../scrapers/testScraper.js";
import swiggyTest
from "../scrapers/swiggyTest.js";

const menuWorker =
new Worker(
    "menu-fetch-queue",

    async(job)=>{

    try{

        console.log(
            "[WORKER] Job received:",
            job.data
        );

        const title =
            // await testScraper();
            await swiggyTest()

        console.log(
            "[SCRAPER RESULT]",
            title
        );

    }catch(error){

        console.log(
            "[WORKER ERROR]",
            error.message
        );
    }
},

    {
        connection: redis
    }
);

export default menuWorker;