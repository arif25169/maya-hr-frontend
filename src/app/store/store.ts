import { createStore } from 'easy-peasy';
import { Auth, authStore } from './states/auth/auth';
import { Common, commonStore } from './states/common/common';
import { GeneralSetting, generalSettingStore } from './states/generalSetting/generalSetting';
import { User, userStore } from './states/user/user';

export interface StoreModel {
	auth: Auth;
	common: Common;
	user: User;
	generalSetting: GeneralSetting;
}

const storeModel: StoreModel = {
	auth: authStore,
	common: commonStore,
	user: userStore,
	generalSetting: generalSettingStore,
}

export const store = createStore(storeModel);
