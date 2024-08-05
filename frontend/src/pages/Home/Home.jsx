import "./Home.css";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../Auth/AuthContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Home = () => {
	const { user } = useAuth();
	const [questions, setQuestions] = useState([]);

	useEffect(() => {
		const fetchQuestions = async () => {
			try {
				const response = await axios.get(
					"http://localhost:5500/api/questions/questions"
				);
				setQuestions(response.data.questions);

				console.log(questions);
			} catch (error) {
				console.error("Error fetching questions:", error);
			}
		};

		fetchQuestions();
	}, []);

	return (
		<div className="home-container">
			<header className="home-header">
				<button className="ask-question-btn">
					<Link className="link" to={"/askquestion"}>
						Ask Question
					</Link>
				</button>
				<div className="welcome-message">
					Welcome: {user ? user.email.split("@")[0] : "Guest"}
				</div>
			</header>

			<section className="questions-section">
				<h2>Questions</h2>
				<ul className="questions-list">
					{questions.map((question) => (
						<li key={question.questionid} className="question-item">
							<Link
								to={`/question/${question.questionid}`}
								className="question-link"
							>
								<div className="question-content">
									<div className="question-user">
										<div className="avater">
											<FontAwesomeIcon className="icon" icon={faUserTie} />
										</div>
										<span style={{ color: "" }}>{question.username} :- </span>
									</div>
									<div className="question-text">{question.description}</div>
								</div>
							</Link>
							<div className="question-link">&gt;</div>
						</li>
					))}
				</ul>
			</section>
		</div>
	);
};

export default Home;
