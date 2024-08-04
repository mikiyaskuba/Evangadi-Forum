import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Signup.module.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				'http://localhost:5500/api/users/register',
				{
					email,
					firstname,
          lastname,
          username,
					password,
				}
			);
			alert(response.data.message);
			navigate('/login');
		} catch (error) {
			console.error('Error during registration:', error);
			if (
				error.response &&
				error.response.data &&
				error.response.data.message
			) {
				alert(error.response.data.message);
			} else {
				alert('An error occurred. Please try again.');
			}
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.signupSection}>
				<h2>Join the network</h2>
				<p>
					Already have an account? <Link to="/">Sign in</Link>
				</p>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="User name"
						required
					/>
					<div className={styles.dFlex}>
						<span className={styles.col6}>
							<input
								type="text"
								value={firstname}
								onChange={(e) => setFirstname(e.target.value)}
								placeholder="First name"
								required
							/>
						</span>
						<span className={styles.col6}>
							<input
								type="text"
								value={lastname}
								onChange={(e) => setLastname(e.target.value)}
								placeholder="Last name"
								required
							/>
						</span>
					</div>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email address"
						required
					/>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
						required
					/>

					<label>
						<input type="checkbox" required /> I agree to the{' '}
						<Link to="#">privacy policy</Link> and{' '}
						<Link to="#">terms of service</Link>.
					</label>
					<button type="submit">Agree and Join</button>
					<p>
						<Link to="/login">Already have an account?</Link>
					</p>
				</form>
			</div>
			<div className={styles.infoSection}>
				<h2>About</h2>
				<h1>Evangadi Networks</h1>
				<p className={styles.p1}>
					No matter what stage of life you are in, whether you’re just starting
					elementary school or being promoted to CEO of a Fortune 500 company,
					you have much to offer to those who are trying to follow in your
					footsteps.
				</p>
				<p className={styles.p2}>
					Whether you are willing to share your knowledge or you are just
					looking to meet mentors of your own, please start by joining the
					network here.
				</p>
				<Link to="#" className={styles.createAccountButton}>
					Create a new account
				</Link>
			</div>
		</div>
	);
};

export default SignUp;
