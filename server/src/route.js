import { Router } from "express";
import scrapperController from "./controllers/scrapperController.js";

const api = Router()

api.post("/scrape", scrapperController.scrapeArticles)

export default api