import React from 'react';
import './App.css';
import './Custom.css';
// import './assets/bootstrap.min.css';
import './assets/styles.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Container from './app/Container';
import { Login } from './app/components/auth/Login';
import { Authenticated } from './app/components/auth/Authenticated';
import { useStoreActions, useStoreState } from './app/store/hooks/easyPeasy';

import Success from './app/container/pages/signup/Success.page';
import ForgotPassword from './app/container/pages/signup/ForgotPassword.page';
function App() {
	const checkAuth = useStoreActions(state => state.auth.checkAuth);
	checkAuth(1);

	return (
		<Router>
			<Switch>
				<Route exact path="/login">
					<Login />
				</Route>				
				<Route exact path="/success">
					<Success />
				</Route>				
				<Route exact path="/forgot-password">
					<ForgotPassword />
				</Route>
				<Authenticated path="/" component={Container} />
			</Switch>
		</Router>
	);
}

export default App;
