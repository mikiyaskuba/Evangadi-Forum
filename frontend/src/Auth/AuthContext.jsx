import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const login = (userData) => {
		setUser(userData);

		localStorage.setItem('authToken', userData.token); // Save token in localStorage
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem('authToken'); // Remove token from localStorage
	};

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
