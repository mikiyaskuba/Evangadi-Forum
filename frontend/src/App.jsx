import React from 'react';
import AppRoutes from './routes/AppRoutes';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthProvider from './Auth/AuthContext';
import '@fortawesome/fontawesome-free/css/all.min.css';



function App() {
	return (
		<AuthProvider>
			<AppRoutes />
		</AuthProvider>
	);
}

export default App;
