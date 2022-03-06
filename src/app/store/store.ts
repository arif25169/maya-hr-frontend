import { createStore } from 'easy-peasy';
import { Auth, authStore } from './states/auth/auth';
import { Common, commonStore } from './states/common/common';
import { GeneralSetting, generalSettingStore } from './states/generalSetting/generalSetting';
import { Hr, hrStore } from './states/hr/hr';
import { Payroll, payrollStore } from './states/payroll/payroll';
import { User, userStore } from './states/user/user';

export interface StoreModel {
	auth: Auth;
	common: Common;
	payroll: Payroll;
	user: User;
	generalSetting: GeneralSetting;
	hr: Hr;
}

const storeModel: StoreModel = {
	auth: authStore,
	common: commonStore,
	payroll: payrollStore,
	user: userStore,
	generalSetting: generalSettingStore,
	hr: hrStore
}

export const store = createStore(storeModel);
