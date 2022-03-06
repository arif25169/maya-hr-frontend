import { notification } from 'antd';
import { Action, Thunk, thunk, action } from 'easy-peasy';
import { fetchDistrictList, fetchThanaList, fetchpartnerProfile, fetchclassList, fetchdepartmentList, fetchfeeHeadList, fetchsessionYearList, fetchdesignationList, fetchsessionList, fetchsessionYearListByClassId, fetchdepartmentListByClassId, fetchsessionYearListByClassDeptConfigId, fetchstudentBasicDetailsInfosBySesssionAndClassDepartSemesterYear, fetchstudentBasicDetails, fetchclassRoutineList, fetchclassRoutineView, classRoutineSave, classRoutineDelete, fetchexamRoutineList, fetchexamRoutineView, examRoutineSave, examRoutineDelete } from '../../../http/common/common';
import { deleteDepartmentUrl, deleteDesignationUrl, deleteEmployeeTypeUrl, deleteShiftUrl, fetchDepartmentUrl, fetchDesignationUrl, fetchEmployeeTypeUrl, fetchShiftUrl, saveCompanyUrl, saveDepartmentUrl, saveDesignationUrl, saveEmployeeTypeUrl, saveShiftUrl, updateDepartmentUrl, updateDesignationUrl, updateEmployeeTypeUrl, updateShiftUrl } from '../../../http/generalSetting/generalSetting';

export interface GeneralSetting {
	setSaveCompany : Thunk<GeneralSetting, any>,

	saveDepartment : Thunk<GeneralSetting, any>;
	departmentList : any;
	fetchDepatmentList : Thunk<GeneralSetting>;
	setDepartmentList:  Action<GeneralSetting, any>;
	updateDepartment : Thunk<GeneralSetting, any>;
	deleteDepartment : Thunk<GeneralSetting, any>;

	saveDesignation : Thunk<GeneralSetting, any>;
	designationList : any;
	fetchDesignationList : Thunk<GeneralSetting>;
	setDesignationList:  Action<GeneralSetting, any>;
	updateDesignation : Thunk<GeneralSetting, any>;
	deleteDesignation : Thunk<GeneralSetting, any>;

	saveEmployeeType : Thunk<GeneralSetting, any>;
	employeeTypeList : any;
	fetchEmployeeTypeList : Thunk<GeneralSetting>;
	setEmployeeTypeList:  Action<GeneralSetting, any>;
	updateEmployeeType : Thunk<GeneralSetting, any>;
	deleteEmployeeType : Thunk<GeneralSetting, any>;

	saveShift : Thunk<GeneralSetting, any>;
	shiftList : any;
	fetchShiftList : Thunk<GeneralSetting>;
	setShiftList:  Action<GeneralSetting, any>;
	updateShift : Thunk<GeneralSetting, any>;
	deleteShift : Thunk<GeneralSetting, any>;

}

export const generalSettingStore: GeneralSetting = {
	
	departmentList : [],
	designationList: [],
	employeeTypeList:[],
	shiftList: [],

	setSaveCompany: thunk(async (actions, payload) => {
		const response = await saveCompanyUrl(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
			}else{
				notification.error({ message: body.message })
			}
			
		} else {
			notification.error({ message: 'Something Wrong' })
		}
	}),

	saveDepartment: thunk(async (actions, payload) => {
		const response = await saveDepartmentUrl(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
				actions.fetchDepatmentList();
			}else{
				notification.error({ message: body.message })
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	fetchDepatmentList: thunk(async (actions) => {
		const response = await fetchDepartmentUrl();
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				actions.setDepartmentList(body.item)
			}else{
				actions.setDepartmentList([])
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	setDepartmentList: action((state, payload) => {
		state.departmentList = payload;
	}),

	updateDepartment: thunk(async (actions, payload) => {
		const response = await updateDepartmentUrl(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
				actions.fetchDepatmentList();
			}else{
				notification.error({ message: body.message })
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	deleteDepartment: thunk (async (actions, payload) => {
		const response = await deleteDepartmentUrl(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
				actions.fetchDepatmentList();
			}else{
				notification.error({ message: body.message })
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	saveDesignation: thunk(async (actions, payload) => {
		const response = await saveDesignationUrl(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
				actions.fetchDesignationList();
			}else{
				notification.error({ message: body.message })
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	fetchDesignationList: thunk(async (actions) => {
		const response = await fetchDesignationUrl();
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				actions.setDesignationList(body.item)
			}else{
				actions.setDesignationList([])
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	setDesignationList: action((state, payload) => {
		state.designationList = payload;
	}),

	updateDesignation: thunk(async (actions, payload) => {
		const response = await updateDesignationUrl(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
				actions.fetchDesignationList();
			}else{
				notification.error({ message: body.message })
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	deleteDesignation: thunk (async (actions, payload) => {
		const response = await deleteDesignationUrl(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
				actions.fetchDesignationList();
			}else{
				notification.error({ message: body.message })
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	saveEmployeeType: thunk(async (actions, payload) => {
		const response = await saveEmployeeTypeUrl(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
				actions.fetchEmployeeTypeList();
			}else{
				notification.error({ message: body.message })
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	fetchEmployeeTypeList: thunk(async (actions) => {
		const response = await fetchEmployeeTypeUrl();
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				actions.setEmployeeTypeList(body.item)
			}else{
				actions.setEmployeeTypeList([])
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	setEmployeeTypeList: action((state, payload) => {
		state.employeeTypeList = payload;
	}),

	updateEmployeeType: thunk(async (actions, payload) => {
		const response = await updateEmployeeTypeUrl(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
				actions.fetchEmployeeTypeList();
			}else{
				notification.error({ message: body.message })
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	deleteEmployeeType: thunk (async (actions, payload) => {
		const response = await deleteEmployeeTypeUrl(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
				actions.fetchEmployeeTypeList();
			}else{
				notification.error({ message: body.message })
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	saveShift: thunk(async (actions, payload) => {
		const response = await saveShiftUrl(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
				actions.fetchShiftList();
			}else{
				notification.error({ message: body.message })
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	fetchShiftList: thunk(async (actions) => {
		const response = await fetchShiftUrl();
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				actions.setShiftList(body.item)
			}else{
				actions.setShiftList([])
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	setShiftList: action((state, payload) => {
		state.shiftList = payload;
	}),

	updateShift: thunk(async (actions, payload) => {
		const response = await updateShiftUrl(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
				actions.fetchShiftList();
			}else{
				notification.error({ message: body.message })
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	deleteShift: thunk (async (actions, payload) => {
		const response = await deleteShiftUrl(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
				actions.fetchShiftList();
			}else{
				notification.error({ message: body.message })
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

}
