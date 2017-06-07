import React from 'react';
import { Link } from 'react-router';

const Header = () => {
	return (
		<div className="row">
			<nav>
				<div className="nav-wrapper">
					<Link to={'/'} className="brand-logo">Contacts</Link>
					<Link to={"#"} className="button-collapse" data-activates="mobile-demo"><i className="material-icons">menu</i></Link>
					<ul className="right hide-on-med-and-down">
						<li><Link to={'/contact'}>Add Contact</Link></li>
					</ul>
					<ul className="side-nav" id="mobile-demo">
						<li><Link to={'/contact'}>Add Contact</Link></li>
					</ul>
				</div>
			</nav>
		</div>
	);
};

export default Header;