import { createStore } from 'easy-peasy';
import { Auth, authStore } from './states/auth/auth';
import { Common, commonStore } from './states/common/common';
import { Payroll, payrollStore } from './states/payroll/payroll';
import { User, userStore } from './states/user/user';

export interface StoreModel {
	auth: Auth;
	common: Common;
	payroll: Payroll;
	user: User;

}

const storeModel: StoreModel = {
	auth: authStore,
	common: commonStore,
	payroll: payrollStore,
	user: userStore,

}

export const store = createStore(storeModel);
