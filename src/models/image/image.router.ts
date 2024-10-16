import { Router } from "express";
import { ImageController, upload } from "./image.controller";

const imageRouter = Router();

imageRouter.post("/", upload.single("avatar"), ImageController.createImage);

export default imageRouter;
