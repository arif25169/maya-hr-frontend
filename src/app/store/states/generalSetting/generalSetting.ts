import { notification } from 'antd';
import { Action, Thunk, thunk, action } from 'easy-peasy';
import { fetchDistrictList, fetchThanaList, fetchpartnerProfile, fetchclassList, fetchdepartmentList, fetchfeeHeadList, fetchsessionYearList, fetchdesignationList, fetchsessionList, fetchsessionYearListByClassId, fetchdepartmentListByClassId, fetchsessionYearListByClassDeptConfigId, fetchstudentBasicDetailsInfosBySesssionAndClassDepartSemesterYear, fetchstudentBasicDetails, fetchclassRoutineList, fetchclassRoutineView, classRoutineSave, classRoutineDelete, fetchexamRoutineList, fetchexamRoutineView, examRoutineSave, examRoutineDelete } from '../../../http/common/common';
import { createHoliday, createLeaveAssignSaveUrl, createLeaveCategory, createLeaveConfig, deleteDepartmentUrl, deleteDesignationUrl, deleteEmployeeTypeUrl, deleteHoliday, deleteLeaveCategory, deleteLeaveConfig, deleteShiftUrl, employeeListByDepartmentIdUrl, fetchCompanyInfoUrl, fetchDepartmentUrl, fetchDesignationUrl, fetchEmployeeTypeUrl, fetchholidayList, fetchleaveCategoryList, fetchleaveConfigList, fetchShiftUrl, leaveConfigListByDepartmentIdUrl, saveCompanyUrl, saveDepartmentUrl, saveDesignationUrl, saveEmployeeTypeUrl, saveShiftUrl, updateCompanyInfoUrl, updateDepartmentUrl, updateDesignationUrl, updateEmployeeTypeUrl, updateHoliday, updateLeaveCategory, updateLeaveConfig, updateShiftUrl } from '../../../http/generalSetting/generalSetting';

export interface GeneralSetting {
	setSaveCompany: Thunk<GeneralSetting, any>,

	saveDepartment: Thunk<GeneralSetting, any>;
	departmentList: any;
	fetchDepatmentList: Thunk<GeneralSetting>;
	setDepartmentList: Action<GeneralSetting, any>;
	updateDepartment: Thunk<GeneralSetting, any>;
	deleteDepartment: Thunk<GeneralSetting, any>;

	saveDesignation: Thunk<GeneralSetting, any>;
	designationList: any;
	fetchDesignationList: Thunk<GeneralSetting>;
	setDesignationList: Action<GeneralSetting, any>;
	updateDesignation: Thunk<GeneralSetting, any>;
	deleteDesignation: Thunk<GeneralSetting, any>;

	saveEmployeeType: Thunk<GeneralSetting, any>;
	employeeTypeList: any;
	fetchEmployeeTypeList: Thunk<GeneralSetting>;
	setEmployeeTypeList: Action<GeneralSetting, any>;
	updateEmployeeType: Thunk<GeneralSetting, any>;
	deleteEmployeeType: Thunk<GeneralSetting, any>;

	saveShift: Thunk<GeneralSetting, any>;
	shiftList: any;
	fetchShiftList: Thunk<GeneralSetting>;
	setShiftList: Action<GeneralSetting, any>;
	updateShift: Thunk<GeneralSetting, any>;
	deleteShift: Thunk<GeneralSetting, any>;


	leaveCategoryList: any;
	setleaveCategoryList: Action<GeneralSetting, any>;
	fetchleaveCategoryList: Thunk<GeneralSetting>;
	createLeaveCategory: Thunk<GeneralSetting, any>;
	updateLeaveCategory: Thunk<GeneralSetting, any>;
	deleteLeaveCategory: Thunk<GeneralSetting, any>;

	holidayList: any;
	setholidayList: Action<GeneralSetting, any>;
	fetchholidayList: Thunk<GeneralSetting>;
	createHoliday: Thunk<GeneralSetting, any>;
	updateHoliday: Thunk<GeneralSetting, any>;
	deleteHoliday: Thunk<GeneralSetting, any>;	
	
	leaveConfigList: any;
	setleaveConfigList: Action<GeneralSetting, any>;
	fetchleaveConfigList: Thunk<GeneralSetting>;
	createLeaveConfig: Thunk<GeneralSetting, any>;
	updateLeaveConfig: Thunk<GeneralSetting, any>;
	deleteLeaveConfig: Thunk<GeneralSetting, any>;

	employeeListByDepartmentId: any;
	setEmployeeListByDepartmentId: Action<GeneralSetting, any>;
	fetchEmployeeListByDepartmentId: Thunk<GeneralSetting>;

	leavelListByDepartmentId: any;
	setLeavelListByDepartmentId: Action<GeneralSetting, any>;
	fetchLeavelListByDepartmentId: Thunk<GeneralSetting>;
	saveLeaveAssign: Thunk<GeneralSetting, any>;

	companyInfo: any;
	fetchCompanyInfo: Thunk<GeneralSetting>;
	setCompanyInfo: Action<GeneralSetting, any>;
	updateCompanyInfo: Thunk<GeneralSetting, any>;

}

export const generalSettingStore: GeneralSetting = {

	departmentList: [],
	designationList: [],
	employeeTypeList: [],
	shiftList: [],
	employeeListByDepartmentId:[],
	leavelListByDepartmentId:[],
    companyInfo: [],
	setSaveCompany: thunk(async (actions, payload) => {
		const response = await saveCompanyUrl(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
			} else {
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
			} else {
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
			} else {
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
			} else {
				notification.error({ message: body.message })
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	deleteDepartment: thunk(async (actions, payload) => {
		const response = await deleteDepartmentUrl(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
				actions.fetchDepatmentList();
			} else {
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
			} else {
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
			} else {
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
			} else {
				notification.error({ message: body.message })
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	deleteDesignation: thunk(async (actions, payload) => {
		const response = await deleteDesignationUrl(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
				actions.fetchDesignationList();
			} else {
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
			} else {
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
			} else {
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
			} else {
				notification.error({ message: body.message })
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	deleteEmployeeType: thunk(async (actions, payload) => {
		const response = await deleteEmployeeTypeUrl(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
				actions.fetchEmployeeTypeList();
			} else {
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
			} else {
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
			} else {
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
			} else {
				notification.error({ message: body.message })
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	deleteShift: thunk(async (actions, payload) => {
		const response = await deleteShiftUrl(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
				actions.fetchShiftList();
			} else {
				notification.error({ message: body.message })
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	leaveCategoryList: [],

	setleaveCategoryList: action((state, payload) => {
		state.leaveCategoryList = payload;
	}),

	fetchleaveCategoryList: thunk(async (actions) => {
		const response = await fetchleaveCategoryList();
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body?.item?.length > 0) {
				actions.setleaveCategoryList(body.item);
			} else {
				notification['warning']({
					message: 'No data found',
				});
				actions.setleaveCategoryList(body.item);
			}
		} else {
			const body = await response.json();
			notification['error']({
				message: 'Something went wrong',
			});
		}
	}),

	createLeaveCategory: thunk(async (actions, payload) => {
		const response = await createLeaveCategory(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
				actions.fetchleaveCategoryList();
			} else {
				notification.error({ message: body.message })
			}
		} else {
			const body = await response.json();
			notification.error({ message: body.message })
		}
	}),

	updateLeaveCategory: thunk(async (actions, payload) => {
		const response = await updateLeaveCategory(payload);
		if (response.status === 201) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
				actions.fetchleaveCategoryList();
			} else {
				notification.error({ message: body.message })
			}

		} else {
			const body = await response.json();
			notification.error({ message: 'Something went wrong' })
		}
	}),

	deleteLeaveCategory: thunk(async (actions, payload) => {
		const response = await deleteLeaveCategory(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
				actions.fetchleaveCategoryList();
			} else {
				notification.error({ message: body.message })
			}
		} else {
			const body = await response.json();
			notification.error({ message: 'Something went wrong' })
		}
	}),

	holidayList: [],

	setholidayList: action((state, payload) => {
		state.holidayList = payload;
	}),

	fetchholidayList: thunk(async (actions) => {
		const response = await fetchholidayList();
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body?.item?.length > 0) {
				actions.setholidayList(body.item);
			} else {
				notification['warning']({
					message: 'No data found',
				});
				actions.setholidayList(body.item);
			}
		} else {
			const body = await response.json();
			notification['error']({
				message: 'Something went wrong',
			});
		}
	}),

	createHoliday: thunk(async (actions, payload) => {
		const response = await createHoliday(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
				actions.fetchholidayList();
			} else {
				notification.error({ message: body.message })
			}
		} else {
			const body = await response.json();
			notification.error({ message: body.message })
		}
	}),

	updateHoliday: thunk(async (actions, payload) => {
		const response = await updateHoliday(payload);
		if (response.status === 201) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
				actions.fetchholidayList();
			} else {
				notification.error({ message: body.message })
			}

		} else {
			const body = await response.json();
			notification.error({ message: 'Something went wrong' })
		}
	}),

	deleteHoliday: thunk(async (actions, payload) => {
		const response = await deleteHoliday(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
				actions.fetchholidayList();
			} else {
				notification.error({ message: body.message })
			}
		} else {
			const body = await response.json();
			notification.error({ message: 'Something went wrong' })
		}
	}),

	leaveConfigList: [],

	setleaveConfigList: action((state, payload) => {
		state.leaveConfigList = payload;
	}),

	fetchleaveConfigList: thunk(async (actions) => {
		const response = await fetchleaveConfigList();
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body?.item?.length > 0) {
				actions.setleaveConfigList(body.item);
			} else {
				notification['warning']({
					message: 'No data found',
				});
				actions.setleaveConfigList(body.item);
			}
		} else {
			const body = await response.json();
			notification['error']({
				message: 'Something went wrong',
			});
		}
	}),

	createLeaveConfig: thunk(async (actions, payload) => {
		const response = await createLeaveConfig(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
				actions.fetchleaveConfigList();
			} else {
				notification.error({ message: body.message })
			}
		} else {
			const body = await response.json();
			notification.error({ message: body.message })
		}
	}),

	updateLeaveConfig: thunk(async (actions, payload) => {
		const response = await updateLeaveConfig(payload);
		if (response.status === 201) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
				actions.fetchleaveConfigList();
			} else {
				notification.error({ message: body.message })
			}

		} else {
			const body = await response.json();
			notification.error({ message: 'Something went wrong' })
		}
	}),

	deleteLeaveConfig: thunk(async (actions, payload) => {
		const response = await deleteLeaveConfig(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
				actions.fetchleaveConfigList();
			} else {
				notification.error({ message: body.message })
			}
		} else {
			const body = await response.json();
			notification.error({ message: 'Something went wrong' })
		}
	}),

	fetchEmployeeListByDepartmentId: thunk(async (actions, payload) => {
		const response = await employeeListByDepartmentIdUrl(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				actions.setEmployeeListByDepartmentId(body.item)
			} else {
				actions.setEmployeeListByDepartmentId([])
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	setEmployeeListByDepartmentId: action((state, payload) => {
		state.employeeListByDepartmentId = payload;
	}),

	fetchLeavelListByDepartmentId: thunk(async (actions, payload) => {
		const response = await leaveConfigListByDepartmentIdUrl(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				actions.setLeavelListByDepartmentId(body.item)
			} else {
				actions.setLeavelListByDepartmentId([])
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	setLeavelListByDepartmentId: action((state, payload) => {
		state.leavelListByDepartmentId = payload;
	}),

	saveLeaveAssign: thunk(async (actions, payload) => {
		const response = await createLeaveAssignSaveUrl(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
			} else {
				notification.error({ message: body.message })
			}
		} else {
			const body = await response.json();
			notification.error({ message: body.message })
		}
	}),

	fetchCompanyInfo: thunk(async (actions, payload) => {
		const response = await fetchCompanyInfoUrl();
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				actions.setCompanyInfo(body.item)
			} else {
				actions.setCompanyInfo([])
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	setCompanyInfo: action((state, payload) => {
		state.companyInfo = payload;
	}),

	updateCompanyInfo: thunk(async (actions, payload) => {
		const response = await updateCompanyInfoUrl(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
			} else {
				notification.error({ message: body.message })
			}
		} else {
			const body = await response.json();
			notification.error({ message: body.message })
		}
	}),
}
