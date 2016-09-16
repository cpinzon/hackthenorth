import React from 'react';
import {Link, IndexLink} from 'react-router';
import autobind from 'autobind-decorator';
import config from 'config';
import {metrics} from 'react-metrics';
import classNames from 'classnames';

@autobind
class App extends React.Component {
	constructor(){
		super();

		this.state = {
			..._getState(),
		};
	}

	componentDidUpdate() {
	}

	componentDidMount() {
		TranslationStore.addChangeListener(this.handleChange);
		GlobalNotificationStore.addChangeListener(this.handleChange);
	}

	componentWillUnmount() {
		TranslationStore.removeChangeListener(this.handleChange);
		GlobalNotificationStore.removeChangeListener(this.handleChange);
	}

	handleChange() {
		this.setState(_getState());
	}

	render(){
		return (
			<span>
				<div>
					{/* pass the translations in to the component provided by the router */}
					{React.cloneElement(this.props.children, {translations: this.state.translations})}
				</div>
			</span>
		)
	}
}

export default App;