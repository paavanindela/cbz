import React from 'react';
import PropTypes from 'prop-types';
import styles from './error.scss';
import logo from './../../logo.svg';

const Error = props => (
	<div className="App">
		<header className="App-header">
		  <img src={logo} className="App-logo" alt="logo" />
		  <p> NO ROUTE EXISTS </p>
		</header>
	  </div>
);

// todo: Unless you need to use lifecycle methods or local state,
// write your component in functional form as above and delete
// this section. 
// class error extends React.Component {
//   render() {
//     return <div>This is a component called error.</div>;
//   }
// }

const errorPropTypes = {
	// always use prop types!
};

Error.propTypes = errorPropTypes;

export default Error;
