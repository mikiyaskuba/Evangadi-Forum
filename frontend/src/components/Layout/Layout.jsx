import React from "react";
import Header from "../Header/Header";
import "./Layout.css"; // Custom CSS for additional styling if needed
import Footer from "../Footer/Footer";

const Layout = ({ children }) => {
	return (
		<div className="layout-wrapper">
			<Header />
			<div className="content">{children}</div>
			<Footer />
		</div>
	);
};

export default Layout;
