import { notification } from 'antd';
import { Action, Thunk, thunk, action } from 'easy-peasy';
import { login, logout, postpasswordChange, fetchsendPasswordRecoveryToken, fetchresetPassword, instituteInfo } from '../../../http/auth/auth';

export interface Auth {
	user: any | undefined,
	checkAuth: Thunk<Auth, any>;
	authenticated: Action<Auth, any>;
	authenticate: Thunk<Auth, any>;
	logout: Action<Auth, any>;
	loginFailed: Action<Auth, string>;
	error?: string;
	busy?: boolean;
	setBusy: Action<Auth, boolean>;
	logoutclear: Thunk<Auth, any>;
	postpasswordChange: Thunk<Auth, any>;


	sendPasswordRecoveryToken: boolean,
	setsendPasswordRecoveryToken: Action<Auth, any>;
	fetchsendPasswordRecoveryToken: Thunk<Auth, any>;

	resetPassword: boolean,
	setresetPassword: Action<Auth, any>;
	fetchresetPassword: Thunk<Auth, any>;

}

export let token: string | undefined = undefined;

export const authStore: Auth = {
	user: undefined,
	checkAuth: thunk(async (actions) => {
		const jwt: any = localStorage.getItem("jwt");
		const basicInfo: any = localStorage.getItem("basicInfo");
		if (jwt) {
			try {
				actions.authenticated(JSON.parse(jwt));
			} catch (e) {
				console.error("[Auth] Failed");
			}
		}
	}),
	authenticate: thunk(async (actions, payload) => {
		//console.log('here')
		const response = await login(payload);
		console.log(response);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			let url: any = process.env.REACT_APP_API_ROOT
			localStorage.setItem("url", url);
			localStorage.setItem("tok", body.access_token);
			if (payload.remember) {
				localStorage.setItem("jwt", JSON.stringify(body));

			} else {
				localStorage.removeItem("jwt");
				localStorage.removeItem("openKeys");
			}

			actions.authenticated(body);


			///
			// let headerx = {};
			// headerx['Authorization'] = `Bearer ${body.access_token}`;
			// let basicInfo = await fetch(`${process.env.REACT_APP_API_ROOT}/institute/view`, {
			// 	method: "GET",
			// 	mode: 'cors',
			// 	cache: 'no-cache',
			// 	headers: {
			// 		'Content-Type': 'application/json', ...headerx
			// 	},
			// });
			// if (basicInfo.status === 200) {
			// 	const bodyx = await basicInfo.json();
			// 	actions.setinstituteInfo(bodyx.item);
			// 	localStorage.setItem("basicInfo", JSON.stringify(bodyx.item));
			// } else {
			// 	throw new Error("[Auth] Failed");
			// }
		} else {
			//const body = await response.json();
			actions.loginFailed("Invalid Username/Password");
		}
	}),
	authenticated: action((state, auth) => {
		token = auth?.access_token
		state.user = auth;
	}),
	setBusy: action((state, isbusy) => {
		state.busy = isbusy;
	}),
	loginFailed: action((state, message) => {
		state.busy = false;
		state.error = message;
	}),
	logout: action((state, payload) => {
		console.log(payload)
		//const response = logout(payload);
		// localStorage.removeItem("jwt");
		// localStorage.removeItem("url");
		// localStorage.removeItem("tok");
		// localStorage.removeItem("openKeys");
		localStorage.clear();
		state.busy = false;
		state.error = "";
		window.location.reload()
	}),
	logoutclear: thunk(async (actions, payload) => {
		console.log(payload)
		const response = await logout(payload);
		if (response.status === 201 || response.status === 200) {
			console.log("Clear")
		} else console.log("Error")
	}),
	postpasswordChange: thunk(async (actions, payload) => {
		const response = await postpasswordChange(payload);
		//console.log(response)
		if (response.status === 201) {
			const body: any = await response.json();
			if (body?.messageType === 1) {
				notification['success']({
					message: 'Password',
					description: body?.message,
				})
			};
			if (body?.messageType === 0) {
				notification['error']({
					message: 'Password',
					description: body?.message,
				})
			};
		} else {

			notification['error']({
				message: 'Password',
				description: 'Something went wrong ',
			});
		}
	}),

	sendPasswordRecoveryToken: false,
	fetchsendPasswordRecoveryToken: thunk(async (actions, payload) => {
		// console.log(payload)
		const response = await fetchsendPasswordRecoveryToken(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body?.messageType === 1) {
				actions.setsendPasswordRecoveryToken(true);
			} else {
				actions.setsendPasswordRecoveryToken(false);
				notification['error']({
					message: 'Password',
					description: body?.message,
				});
			}


		} else {
			actions.setsendPasswordRecoveryToken(false);
		}
	}),
	setsendPasswordRecoveryToken: action((state, payload) => {
		state.sendPasswordRecoveryToken = payload;
	}),

	resetPassword: false,
	fetchresetPassword: thunk(async (actions, payload) => {
		// console.log(payload)
		const response = await fetchresetPassword(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body?.messageType === 1) {
				actions.setresetPassword(true);
			} else {
				actions.setresetPassword(false);
				notification['error']({
					message: 'Password',
					description: body?.message,
				});
			}


		} else {
			actions.setresetPassword(false);
		}
	}),
	setresetPassword: action((state, payload) => {
		state.resetPassword = payload;
	}),






}
