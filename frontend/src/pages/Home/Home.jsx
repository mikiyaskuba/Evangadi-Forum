// Home.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Auth/AuthContext';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import styles from './Home.module.css';

const Home = () => {
	const { user } = useAuth();
	const [questions, setQuestions] = useState([]);

	useEffect(() => {
		const fetchQuestions = async () => {
			try {
				const response = await axios.get('http://localhost:5500/api/questions');
				setQuestions(response.data.questions);
				console.log(questions);
			} catch (error) {
				console.error('Error fetching questions:', error);
			}
		};

		fetchQuestions();
	}, []);

	return (
		<div className={styles['home-container']}>
			<header className={styles['home-header']}>
				<button className={styles['ask-question-btn']}>
					<Link className={styles['link']} to={'/askquestion'}>
						{' '}
						Ask Question{' '}
					</Link>{' '}
				</button>
				<div className={styles['welcome-message']}>
					Welcome: {user ? user.email.split('@')[0] : 'Guest'}
				</div>
			</header>

			<section className={styles['questions-section']}>
				<h2>Questions</h2>
				<ul className={styles['questions-list']}>
					{questions.map((question) => (
						<li key={question.questionid} className={styles['question-item']}>
							<Link to={`/question/${question.questionid}`} className={styles['question-link']}>

							
								<div className={styles['question-content']}>
									<div className={styles['question-user']}>
										<div className={styles['avater']}>
											<FontAwesomeIcon
												className={styles['icon']}
												icon={faUserTie}
											/>
										</div>
										<span style={{ color: '' }}>{question.username}</span>:-
									</div>
									<div className={styles['question-text']}>
										{question.description}
									</div>
								</div>
							</Link>
							<div className={styles['question-link']}>&gt;</div>
						</li>
					))}
				</ul>
			</section>
		</div>
	);
};

export default Home;