import { Router } from "express";
import { getUrl, shortUrl } from "../controller/Url.js";

const router = Router();
router.post("/short", shortUrl);
router.get("/:urlId", getUrl);

export default router;
