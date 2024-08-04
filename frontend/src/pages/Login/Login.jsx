import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../Auth/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import styles from './Login.module.css';
import logo from '../../assets/logo/evangadi-logo-black.png';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const { login } = useAuth();
	const navigate = useNavigate();
	const [error, setError] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				'http://localhost:5500/api/users/login',
				{ email, password }
			);
			const { token } = response.data;
			login({ email, token });
			localStorage.setItem('authToken', token); // Store token in localStorage
			navigate('/home');
		} catch (error) {
			console.error('Error during login:', error);
			setError('Invalid email or password. Please try again.');
		}
	};

	const handleTogglePassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className={styles.container}>
			<div className={styles.loginSection}>
				<h2>Login to your account</h2>
				<p>
					Don’t have an account? <Link to="/signup">Create a new account</Link>
				</p>
				{error && <p className={styles.errorMessage}>{error}</p>}
				<form onSubmit={handleSubmit}>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email"
						required
					/>
					<div className={styles.passwordContainer}>
						<input
							type={showPassword ? 'text' : 'password'}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Password"
							required
						/>
						<button
							type="button"
							className={styles.passwordToggleBtn}
							onClick={handleTogglePassword}
						>
							<FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
						</button>
					</div>
					<Link to="#" className={styles.forgotPassword}>
						Forgot password?
					</Link>
					<button className={styles.buttonLog} type="submit">
						Login
					</button>
				</form>
			</div>
			<div className={styles.infoSection}>
				<h2>About</h2>
				{/* <img src={logo} alt="Evangadi Logo" className={styles.logo} /> */}
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
				<Link to="/signup" className={styles.createAccountButton}>
					Create a new account
				</Link>
			</div>
		</div>
	);
};

export default Login;
