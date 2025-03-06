import express from "express";
import { addPet, editPet, purchasePet } from "../controllers/pet.controller.js";
import { authAdmin } from "../middleware/authenticate.js";
import upload from "../utils/log/image/multer.js";

const router = express.Router();

router.post("/addpet", upload.single('picture'), authAdmin, addPet);
router.put("/editPet/:id/", authAdmin, editPet); 
router.put("/buy/:id", purchasePet)

export default router;
