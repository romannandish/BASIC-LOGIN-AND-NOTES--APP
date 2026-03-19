import express from "express";
import {
  getNotes,
  createNote,
  deleteNote,
} from "../controllers/noteController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// protect all routes
router.get("/", authMiddleware, getNotes);
router.post("/", authMiddleware, createNote);
router.delete("/:id", authMiddleware, deleteNote);

export default router;