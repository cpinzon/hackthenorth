import BabelPolyfill from 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory, Redirect, IndexRedirect} from 'react-router';

import UserActions from './actions/UserActions';
import TranslationActions from './actions/TranslationActions';

import App from './components/App';
import Home from './components/Home';
import NotFound from './components/NotFound';
import FAQ from './components/faq/FAQ';
import PrivacyPolicy from './components/privacy-policy/PrivacyPolicy';
import TermsConditions from './components/terms-conditions/TermsConditions';

import AccountRoute from './routes/AccountRoute';
import TransferRoute from './routes/TransferRoute';
import RefillRoute from './routes/RefillRoute';
import CreateAccountRoute from './routes/CreateAccountRoute';
import LoginRoute from './routes/LoginRoute';

const getUser = (nextState, replace, callback) => {
	UserActions.getProfile(callback);
};

const handleLogout = (nextState, replace, callback) => {
	UserActions.logout();
};

const createRoutes = () => {
  const subRoutes = (
    <Route onEnter={getUser}>
		<IndexRoute component={Home} />
		{RefillRoute}
		{AccountRoute}
		{TransferRoute}
		{CreateAccountRoute}
		{LoginRoute}
		<Route path="logout" onEnter={handleLogout} />
		<Route path="faq" component={FAQ}>
			<IndexRedirect to="prescriptions" />
			<Route path=":item" />
		</Route>
		<Route path="privacy-policy" component={PrivacyPolicy} />
		<Route path="terms-and-conditions" component={TermsConditions} />
		<Route path="*" component={NotFound}/>
    </Route>
  );

  return (
  	<Router history={browserHistory}>
  		<Route component={App}>
  			<Redirect from="/" to="/en" />
			<Route path="/en" onEnter={() => TranslationActions.get("en")}>
				{subRoutes}
			</Route>
			<Route path="/fr" onEnter={() => TranslationActions.get("fr")}>
				{subRoutes}
			</Route>
			<Route path="*" component={NotFound} onEnter={() => TranslationActions.get("en")}/>
		</Route>
	</Router>
  );
}

render(createRoutes(), document.querySelector('#main'));
