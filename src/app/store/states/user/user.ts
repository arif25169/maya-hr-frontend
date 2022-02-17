import { notification } from 'antd';
import { Action, Thunk, thunk, action } from 'easy-peasy';
import {  createUser, deleteUser, fetchuserList, updateUser } from '../../../http/user/user';

export interface User {
	check: any;
	actionCheck: Action<User, any>;

	createUser: Thunk<User, any>;
	updateUser: Thunk<User, any>;
	deleteUser: Thunk<User, any>;

	userList: any;
	setuserList: Action<User, any>;
	fetchuserList: Thunk<User>
}

export const userStore: User = {
    check: 'test',
    actionCheck: action((state, payload) => {
        state.check = payload;
    }),  

	deleteUser: thunk(async (actions, payload,) => {
        const response = await deleteUser(payload);
        if (response.status === 201 || response.status === 200) {
            const body: any = await response.json();
            actions.actionCheck(Math.random())
            notification.success({ message: body.message })
        } else {
            notification.error({ message: "Something went wrong" })

        }
    }),
	updateUser: thunk(async (actions, payload,) => {
        const response = await updateUser(payload);
        if (response.status === 201) {
            const body: any = await response.json();
            if (body.messageType == 1) {
                actions.actionCheck(Math.random())
                notification.success({ message: body.message })
            } else {
                notification.warn({ message: body.message })
            }

        } else {
            notification.error({ message: "Something went wrong" })

        }
    }), 	
	createUser: thunk(async (actions, payload,) => {
        const response = await createUser(payload);
        if (response.status === 201) {
            const body: any = await response.json();
            if (body.messageType == 1) {
                actions.actionCheck(Math.random())
                notification.success({ message: body.message })
            } else {
                notification.warn({ message: body.message })
            }

        } else {
            notification.error({ message: "Something went wrong" })

        }
    }), 

	userList: [],
	fetchuserList: thunk(async (actions) => {
		const response = await fetchuserList();
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			//console.log(body)
			actions.setuserList(body?.item);
		} else {
			//const body = await response.json();
			//actions.loginFailed("Invalid Username/Password");
		}
	}),
	setuserList: action((state, payload) => {
		state.userList = payload;
	}),

}
