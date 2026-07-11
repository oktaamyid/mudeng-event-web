import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

export const { GET, POST } = createRouteHandler({
    router: ourFileRouter,
    config: {
        callbackUrl: process.env.NODE_ENV === "production" 
            ? "https://mudeng.nurulfikri.ac.id/event/api/uploadthing" 
            : "http://localhost:3000/event/api/uploadthing",
    },
});
