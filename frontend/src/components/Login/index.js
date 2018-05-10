import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../actions';
import PropTypes from 'prop-types';

// TODO: Add flash messages for error/success

class LoginPage extends Component {
	static propTypes = {
		user: PropTypes.object,
		signIn: PropTypes.func
	};

	static defaultProps = {
		user: null,
		signIn: null
	};

	constructor(props) {
		super(props);
		console.log('Login props:', this.props);
		this.state = {
			email: (this.props.user && this.props.user.email) || '',
			password: '',
			error: null
		};
	}

	onChange = e => this.setState({ [e.target.id]: e.target.value });

	onSubmit = async e => {
		e.preventDefault();
		try {
			const { email, password } = this.state;
			if (!email) return this.setState({ error: 'Please enter your email' });
			if (!password) return this.setState({ error: 'Please enter your password' });
			await this.props.signIn(email, password);
			return this.props.history.push('/'); // eslint-disable-line
		} catch (err) {
			return this.setState({ error: err.error });
		}
	};

	render() {
		const { email, password, error } = this.state;
		return (
			<div className="section">
				<div className="section-container">
					{error ? (
						<p className="warning" style={{ color: 'red' }}>
							{error}
						</p>
					) : null}

					<h3>Login</h3>

					<div className="panel panel-default">
						<form className="panel-body" onSubmit={this.onSubmit}>
							<input
								type="text"
								name="email"
								id="email"
								placeholder="Email"
								value={email}
								onChange={this.onChange}
							/>
							<input
								type="password"
								name="password"
								id="password"
								placeholder="Password"
								value={password}
								onChange={this.onChange}
							/>
							<br />
							<br />
							<input type="submit" value="Sign In" />
							<br />
							<br />
							<input type="checkbox" name="remember" /> Remember Me
							<br />
							<br />
							Forgot your password?{' '}
							<a href="{{ action('AuthController@getForgot') }}">Click Here</a>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	...state.sessionState
});

export default connect(mapStateToProps, { signIn })(LoginPage);