// routes/authRoutes.js
import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateProfilePic, // ✅ include this
} from "../controllers/userController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// ✅ This route must match the frontend POST call
router.post(
  "/profile-pic",                      // 👈 EXACT match
  protect,
  upload.single("profilePic"),         // 👈 should match FormData key
  updateProfilePic
);

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.post("/profile-pic", protect, upload.single("profilePic"), updateProfilePic);


export default router;
