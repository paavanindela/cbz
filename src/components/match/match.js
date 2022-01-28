import React from 'react';
import PropTypes from 'prop-types';
import styles from './match.scss';
import logo from './../../logo.svg';

function Match() {
	return (
	  <div className="App">
		<header className="App-header">
		  {/* <img src={logo} className="App-logo" alt="logo" /> */}
		  <p> MATCH </p>
		</header>
	  </div>
	);
  }

// todo: Unless you need to use lifecycle methods or local state,
// write your component in functional form as above and delete
// this section. 
// class match extends React.Component {
//   render() {
//     return <div>This is a component called match.</div>;
//   }
// }

const matchPropTypes = {
	// always use prop types!
};

Match.propTypes = matchPropTypes;

export default Match;
