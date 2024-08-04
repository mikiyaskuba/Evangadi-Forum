const express = require("express");
const router = express.Router();
const {
  getAllQuestions,
  getQuestionById,
  postQuestion,
} = require("../controller/questionController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/questions", getAllQuestions);
router.get("/questions/:id", getQuestionById); // Update to match the frontend URL parameter
router.post("/questions", authMiddleware, postQuestion);

module.exports = router;
