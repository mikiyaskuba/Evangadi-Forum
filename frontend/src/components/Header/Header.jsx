import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Auth/AuthContext'; // Adjust the import path as necessary
import './Header.css';
import logo from '../../assets/logo/evangadi-logo-black.png';

const Header = () => {
	const { user, logout } = useAuth();
	const handleLogout = () => {
		logout();
		localStorage.removeItem('authToken'); // Remove token from localStorage
	};
	return (
		<div className="head-wrapper">
			<div className="head-inner-wrapper">
				<div className="logo-container">
					<Link to="/">
						<img src={logo} alt="Evangadi Logo" className="head-logo" />
					</Link>
				</div>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					{user ? (
						<button className="btn2" onClick={handleLogout}>
							Logout
						</button>
					) : (
						<Link className="btn2" to="/login">
							Signin
						</Link>
					)}
				</ul>
			</div>
		</div>
	);
};

export default Header;
