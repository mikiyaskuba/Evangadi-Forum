const dbConnection = require("../db/config");

async function postAnswer(req, res) {
  const { id } = req.params; // Use consistent parameter name
  const { answer } = req.body;
  const { userid } = req.user;

  if (!id || !answer) {
    return res
      .status(400)
      .json({ message: "Please provide a question ID and an answer." });
  }

  try {
    await dbConnection.query(
      "INSERT INTO answers (questionid, userid, answer) VALUES (?, ?, ?)",
      [id, userid, answer]
    );
    res.status(201).json({ message: "Answer posted successfully." });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error." });
  }
}

async function getAnswersForQuestion(req, res) {
  const { id } = req.params;

  try {
    const [answers] = await dbConnection.query(
      "SELECT a.answerid, a.answer, u.username FROM answers a JOIN users u ON a.userid = u.userid WHERE a.questionid = ?",
      [id]
    );
    res.status(200).json({ answers });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error." });
  }
}
async function deleteAnswer(req, res) {
  const { answerid } = req.params;
  const { userid } = req.user;

  try {
    const [result] = await dbConnection.query(
      "DELETE FROM answers WHERE answerid = ? AND userid = ?",
      [answerid, userid]
    );

    if (result.affectedRows === 0) {
      return res
        .status(403)
        .json({ message: "You can't delete others' answers." });
    }

    res.status(200).json({ message: "Answer deleted successfully." });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error." });
  }
}
module.exports = {
  postAnswer,
  getAnswersForQuestion,
  deleteAnswer,
};
