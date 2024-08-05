import React from "react";
import classes from "./Footer.module.css";
import logo from "../../assets/logo/evangadi-logo-black.png";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer = () => {
	return (
		<footer className={classes.footer}>
			<div className={classes.logo}>
				<img src={logo} alt="Evangadi Logo" />
				<div className={classes.socialLinks}>
					<a href="#">
						<i className="fab fa-facebook-f"></i>
					</a>
					<a href="#">
						<i className="fab fa-instagram"></i>
					</a>
					<a href="#">
						<i className="fab fa-youtube"></i>
					</a>
				</div>
			</div>
			<div className={classes.links}>
				<h3>Useful Link</h3>
				<a href="#">Terms of Service</a>
				<a href="#">Privacy policy</a>
			</div>
			<div className={classes.contact}>
				<h3>Contact Info</h3>
				<a href="mailto:support@evangadi.com">support@evangadi.com</a>
				<a href="tel:+1-202-386-2702">+1-202-386-2702</a>
			</div>
		</footer>
	);
};

export default Footer;
