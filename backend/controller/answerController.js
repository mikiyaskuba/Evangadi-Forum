const dbConnection = require("../db/config");

async function postAnswer(req, res) {
	const { id } = req.params; // This should correctly extract the question ID from the route
	const { answer_text } = req.body; // Adjusted to match your request body structure
	const { userid } = req.user;

	if (!id || !answer_text) {
		return res
			.status(400)
			.json({ message: "Please provide a question ID and an answer." });
	}

	try {
		await dbConnection.execute(
			"INSERT INTO answers (questionid, userid, answer) VALUES (?, ?, ?)",
			[id, userid, answer_text]
		);
		res.status(201).json({ message: "Answer posted successfully." });
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message: "Internal server error." });
	}
}

async function getAnswersForQuestion(req, res) {
	const { id } = req.params;

	try {
		const [answers] = await dbConnection.execute(
			"SELECT a.answerid, a.answer, u.username FROM answers a JOIN users u ON a.userid = u.userid WHERE a.questionid = ?",
			[id]
		);
		res.status(200).json({ answers });
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message: "Internal server error." });
	}
}

async function deleteAnswer(req, res) {
	const { answerid } = req.params;
	const { userid } = req.user;

	try {
		const [result] = await dbConnection.execute(
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
		console.error(error.message);
		res.status(500).json({ message: "Internal server error." });
	}
}

module.exports = {
	postAnswer,
	getAnswersForQuestion,
	deleteAnswer,
};
