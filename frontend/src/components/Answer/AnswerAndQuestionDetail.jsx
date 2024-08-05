import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Answer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie, faTrash } from "@fortawesome/free-solid-svg-icons";

const AnswerAndQuestionDetail = () => {
	const { id } = useParams();
	const [question, setQuestion] = useState({});
	const [answers, setAnswers] = useState([]);
	const [newAnswer, setNewAnswer] = useState("");
	const [error, setError] = useState({});

	useEffect(() => {
		const fetchQuestionAndAnswers = async () => {
			try {
				const questionResponse = await axios.get(
					`http://localhost:5500/api/questions/questions/${id}`
				);
				setQuestion(questionResponse.data.question);

				const answersResponse = await axios.get(
					`http://localhost:5500/api/answers/questions/${id}/answers`
				);
				setAnswers(answersResponse.data.answers);
			} catch (error) {
				console.error("Error fetching question and answers:", error);
			}
		};

		fetchQuestionAndAnswers();
	}, [id]);

	const handleAnswerSubmit = async (e) => {
		e.preventDefault();
		const token = localStorage.getItem("authToken");
		if (!token) {
			console.error("No token found in localStorage");
			return;
		}
		try {
			const response = await axios.post(
				`http://localhost:5500/api/answers/questions/${id}/answers`,
				{ answer: newAnswer },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setAnswers([...answers, response.data]);
			setNewAnswer("");
		} catch (error) {
			console.error("Error submitting answer:", error);
		}
	};

	const handleAnswerDelete = async (answerid) => {
		const token = localStorage.getItem("authToken");
		if (!token) {
			console.error("No token found in localStorage");
			return;
		}
		try {
			await axios.delete(`http://localhost:5500/api/answers/answers/${answerid}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setAnswers(answers.filter((answer) => answer.answerid !== answerid));
			setError((prev) => ({ ...prev, [answerid]: "" }));
		} catch (error) {
			if (error.response && error.response.status === 403) {
				setError((prev) => ({
					...prev,
					[answerid]: "You can't delete others' answers.",
				}));
			} else {
				console.error("Error deleting answer:", error);
			}
		}
	};

	return (
		<div className="answer-question-detail-container">
			<section className="question-section">
				<h2>Question</h2>
				<div className="question-details">
					<h3>{question.title}</h3>
					<p>{question.description}</p>
					<p>
						<strong>Asked by:</strong> {question.username}
					</p>
				</div>
			</section>

			<section className="answers-section">
				<h3>Answers From The Community</h3>
				{answers.map((answer) => (
					<div key={answer.answerid} className="answer-item">
						<FontAwesomeIcon className="answer-user-avatar" icon={faUserTie} />
						<div className="answer-content">
							<strong>{answer.username}</strong>
							<p>{answer.answer}</p>
							<button onClick={() => handleAnswerDelete(answer.answerid)}>
								<FontAwesomeIcon icon={faTrash} />
							</button>
							{error[answer.answerid] && (
								<p style={{ color: "red" }}>{error[answer.answerid]}</p>
							)}
						</div>
					</div>
				))}
			</section>

			<section className="answer-form-section">
				<h3>Answer The Top Question</h3>
				<form onSubmit={handleAnswerSubmit}>
					<textarea
						value={newAnswer}
						onChange={(e) => setNewAnswer(e.target.value)}
						placeholder="Your Answer..."
						className="answer-textarea"
					/>
					<button type="submit" className="submit-answer-btn">
						Post Your Answer
					</button>
				</form>
			</section>
		</div>
	);
};

export default AnswerAndQuestionDetail;
