const dbConnection = require("../db/config");

async function getAllQuestions(req, res) {
  try {
    const [questions] = await dbConnection.query(
      `SELECT q.questionid, q.title, q.description ,u.username
			FROM questions q 
			JOIN users u ON q.userid = u.userid`
    );
    res.status(200).json({ questions });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error." });
  }
}

async function getQuestionById(req, res) {
  const { id } = req.params;

  try {
    const [questions] = await dbConnection.query(
      "SELECT q.questionid, q.title, q.description, u.username FROM questions q JOIN users u ON q.userid = u.userid WHERE q.questionid = ?",
      [id]
    );
    if (questions.length === 0) {
      return res.status(404).json({ message: "Question not found." });
    }
    res.status(200).json({ question: questions[0] });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error." });
  }
}

async function postQuestion(req, res) {
  const { title, description } = req.body;
  const { userid } = req.user;

  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Title and description are required." });
  }

  try {
    await dbConnection.query(
      "INSERT INTO questions (userid, title, description) VALUES (?, ?, ?)",
      [userid, title, description]
    );
    res.status(201).json({ message: "Question created successfully." });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error." });
  }
}

module.exports = {
  getAllQuestions,
  getQuestionById,
  postQuestion,
};
