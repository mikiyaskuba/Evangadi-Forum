import React, { useState } from "react";
import axios from "axios";
import "./AskQuestion.css";
import { Link } from "react-router-dom";

const AskQuestion = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const token = localStorage.getItem("authToken");
			const response = await axios.post(
				"http://localhost:5500/api/questions/questions",
				{
					title,
					description,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			console.log("Question Submitted", response.data);
			setTitle("");
			setDescription("");
		} catch (error) {
			console.error("Error submitting question:", error);
			alert("An error occurred. Please try again.");
		}
	};

	return (
		<div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
			<h2>Steps to write a good question</h2>
			<ul className="question-li">
				<li>Summarize your problem in a one-line title.</li>
				<li>Describe your problem in more detail.</li>
				<li>Describe what you tried and what you expected to happen.</li>
				<li>Review your question and post it to the site.</li>
			</ul>
			<h3>Ask a public question</h3>
			<form onSubmit={handleSubmit}>
				<div style={{ marginBottom: "10px" }}>
					<label htmlFor="title">Title</label>
					<input
						type="text"
						id="title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						style={{
							width: "100%",
							padding: "10px",
							margin: "5px 0",
							boxSizing: "border-box",
						}}
					/>
				</div>
				<div style={{ marginBottom: "10px" }}>
					<label htmlFor="description">Question Description</label>
					<textarea
						id="description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						style={{
							width: "100%",
							padding: "10px",
							margin: "5px 0",
							boxSizing: "border-box",
							height: "150px",
						}}
					/>
				</div>
				<button
					type="submit"
					style={{
						backgroundColor: "#4CAF50",
						color: "white",
						padding: "15px 20px",
						border: "none",
						cursor: "pointer",
					}}
				>
					Post Your Question
				</button>
			</form>
			<Link to={"/home"}>back to home</Link>
		</div>
	);
};

export default AskQuestion;
