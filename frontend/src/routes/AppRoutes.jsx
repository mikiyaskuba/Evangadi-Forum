
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import Login from "../pages/Login/Login";
import SignUp from "../pages/Signup/Signup";
import Layout from "../components/Layout/Layout";
import Home from "../pages/Home/Home";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import AskQuestion from "../components/AskQuestion/AskQuestion";
import AnswerAndQuestionDetail from '../components/Answer/AnswerAndQuestionDetail';

const AppRoutes = () => {
	return (
		<Router>
			<Layout>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/signup" element={<SignUp />} />
					<Route
						path="/home"
						element={
							<ProtectedRoute>
								<Home />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/askquestion"
						element={
							<ProtectedRoute>
								<AskQuestion />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/question/:id"
						element={
							<ProtectedRoute>
								<AnswerAndQuestionDetail />
							</ProtectedRoute>
						}
					/>{" "}

					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</Layout>
		</Router>
	);
};

export default AppRoutes;
