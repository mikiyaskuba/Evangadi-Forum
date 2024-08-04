const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  postAnswer,
  getAnswersForQuestion,
  deleteAnswer,
} = require("../controller/answerController");

// Note: The routes must be correctly set up and registered in the server file (app.js or index.js).
router.post("/questions/:id/answers", authMiddleware, postAnswer);
router.get("/questions/:id/answers", getAnswersForQuestion);
router.delete("/answers/:answerid", authMiddleware, deleteAnswer);

module.exports = router;
