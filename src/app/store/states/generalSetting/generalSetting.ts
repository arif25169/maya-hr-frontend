import { notification } from 'antd';
import { Action, Thunk, thunk, action } from 'easy-peasy';
import { fetchDistrictList, fetchThanaList, fetchpartnerProfile, fetchclassList, fetchdepartmentList, fetchfeeHeadList, fetchsessionYearList, fetchdesignationList, fetchsessionList, fetchsessionYearListByClassId, fetchdepartmentListByClassId, fetchsessionYearListByClassDeptConfigId, fetchstudentBasicDetailsInfosBySesssionAndClassDepartSemesterYear, fetchstudentBasicDetails, fetchclassRoutineList, fetchclassRoutineView, classRoutineSave, classRoutineDelete, fetchexamRoutineList, fetchexamRoutineView, examRoutineSave, examRoutineDelete } from '../../../http/common/common';
import { approveAbsentAttendance, approveLateAttendance, approveLeaveApplication, createHoliday, createLeaveAssignSaveUrl, createLeaveCategory, createLeaveConfig, deleteAttendanceFineUrl, deleteAttendanceTimeConfiguration, deleteDepartmentUrl, deleteDesignationUrl, deletedutyStation, deleteEmployeeTypeUrl, deleteHoliday, deleteLeaveApplication, deleteLeaveCategory, deleteLeaveConfig, deleteShiftUrl, employeeAttendanceConfigListUrl, employeeAttendanceConfigSaveUrl, employeeListByDepartmentIdUrl, employeeListForAttendanceConfigUrl, fetcAttendanceFineUrl, fetchapplicantApplyList, fetchattendanceTimeConfigurationListByDepartmentWise, fetchCompanyInfoUrl, fetchDepartmentUrl, fetchDesignationUrl, fetchdutyStationList, fetchemployeeAtttendanceListForUpdate, fetchEmployeeTypeUrl, fetchenabledEmployeeListTakeAttendance, fetchholidayList, fetchleaveApplicationPendingList, fetchleaveAssignListByDepartment, fetchleaveCategoryList, fetchleaveConfigList, fetchRemarksList, fetchShiftUrl, goToCompany, leaveApply, leaveConfigListByDepartmentIdUrl, rejectLeaveApplication, saveAttendanceFineUrl, saveCompanyUrl, saveDepartmentUrl, saveDesignationUrl, savedutyStation, saveEmployeeTypeUrl, saveShiftUrl, updateAttendanceFineUrl, updateAttendanceTimeConfiguration, updateCompanyInfoUrl, updateDepartmentUrl, updateDesignationUrl, updatedutyStation, updateEmployeeTypeUrl, updateHoliday, updateLeaveCategory, updateLeaveConfig, updateShiftUrl } from '../../../http/generalSetting/generalSetting';

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

	savedutyStation: Thunk<GeneralSetting, any>;
	dutyStationList: any;
	fetchdutyStationList: Thunk<GeneralSetting>;
	setdutyStationList: Action<GeneralSetting, any>;
	updatedutyStation: Thunk<GeneralSetting, any>;
	deletedutyStation: Thunk<GeneralSetting, any>;

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

	deleteAttendanceTimeConfiguration: Thunk<GeneralSetting, any>;

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
	leaveApply: Thunk<GeneralSetting, any>;

	companyInfo: any;
	fetchCompanyInfo: Thunk<GeneralSetting>;
	setCompanyInfo: Action<GeneralSetting, any>;
	updateCompanyInfo: Thunk<GeneralSetting, any>;

	employeeListForattendanceTimeConfig: any;
	fetchEmployeeListForattendanceTimeConfig: Thunk<GeneralSetting>;
	setEmployeeListForattendanceTimeConfig: Action<GeneralSetting, any>;
	saveEmployeeAttendanceTimeConfig: Thunk<GeneralSetting, any>;
	updateAttendanceTimeConfiguration: Thunk<GeneralSetting, any>;

	enabledEmployeeListTakeAttendance: any;
	setenabledEmployeeListTakeAttendance: Action<GeneralSetting, any>;
	fetchenabledEmployeeListTakeAttendance: Thunk<GeneralSetting>;

	employeeAttendanceTimeConfig: any;
	fetchEmployeeAttendanceTimeConfig: Thunk<GeneralSetting>;
	setEmployeeAttendanceTimeConfig: Action<GeneralSetting, any>;

	attendanceTimeConfigurationListByDepartmentWise: any;
	fetchattendanceTimeConfigurationListByDepartmentWise: Thunk<GeneralSetting, any>;
	setattendanceTimeConfigurationListByDepartmentWise: Action<GeneralSetting, any>;

	employeeAtttendanceListForUpdate: any;
	setemployeeAtttendanceListForUpdate: Action<GeneralSetting, any>;
	fetchemployeeAtttendanceListForUpdate: Thunk<GeneralSetting, any>

	leaveAssignListByDepartment: any;
	setleaveAssignListByDepartment: Action<GeneralSetting, any>;
	fetchleaveAssignListByDepartment: Thunk<GeneralSetting, any>;

	loading: boolean;
	setLoading: Action<GeneralSetting, boolean>;

	applicantApplyList: any;
	setapplicantApplyList: Action<GeneralSetting, any>;
	fetchapplicantApplyList: Thunk<GeneralSetting, any>;
	deleteLeaveApplication: Thunk<GeneralSetting, any>;

	leaveApplicationPendingList: any;
	setleaveApplicationPendingList: Action<GeneralSetting, any>;
	fetchleaveApplicationPendingList: Thunk<GeneralSetting>;
	approveLeaveApplication: Thunk<GeneralSetting, any>;
	rejectLeaveApplication: Thunk<GeneralSetting, any>;
	approveLateAttendance: Thunk<GeneralSetting, any>;
	approveAbsentAttendance: Thunk<GeneralSetting, any>;

	remarksLits: any;
	setRemarksList: Action<GeneralSetting, any>;
	fetchRemarksList: Thunk<GeneralSetting>;
	goToCompany: Thunk<GeneralSetting, any>;

	attendanceFineList: any;
	fetchAttendanceFineList: Thunk<GeneralSetting>;
	setAttendanceFineList: Action<GeneralSetting, any>;
	saveAttendanceFine: Thunk<GeneralSetting, any>;
	updateAttendanceFine: Thunk<GeneralSetting, any>;
	deleteAttendanceFine: Thunk<GeneralSetting, any>;

}

export const generalSettingStore: GeneralSetting = {

	departmentList: [],
	designationList: [],
	employeeTypeList: [],
	dutyStationList: [],
	shiftList: [],
	employeeListByDepartmentId: [],
	leavelListByDepartmentId: [],
	companyInfo: [],
	employeeListForattendanceTimeConfig: [],
	employeeAttendanceTimeConfig: [],
	attendanceTimeConfigurationListByDepartmentWise: [],
	attendanceFineList: [],
	loading: false,
	setLoading: action((state, payload) => {
		state.loading = payload;
	}),
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

	savedutyStation: thunk(async (actions, payload) => {
		const response = await savedutyStation(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
				actions.fetchdutyStationList();
			} else {
				notification.error({ message: body.message })
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	fetchdutyStationList: thunk(async (actions) => {
		const response = await fetchdutyStationList();
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				actions.setdutyStationList(body.item)
			} else {
				actions.setdutyStationList([])
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	setdutyStationList: action((state, payload) => {
		state.dutyStationList = payload;
	}),

	updatedutyStation: thunk(async (actions, payload) => {
		const response = await updatedutyStation(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
				actions.fetchdutyStationList();
			} else {
				notification.error({ message: body.message })
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	deletedutyStation: thunk(async (actions, payload) => {
		const response = await deletedutyStation(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
				actions.fetchdutyStationList();
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

	deleteAttendanceTimeConfiguration: thunk(async (actions, payload) => {
		const response = await deleteAttendanceTimeConfiguration(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })

			} else {
				notification.error({ message: body.message })
			}
		} else {
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

	leaveApply: thunk(async (actions, payload) => {
		const response = await leaveApply(payload);
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
				actions.setCompanyInfo(body.item);
				localStorage.setItem("companyInfo", JSON.stringify(body.item));
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

	enabledEmployeeListTakeAttendance: [],

	setenabledEmployeeListTakeAttendance: action((state, payload) => {
		state.enabledEmployeeListTakeAttendance = payload;
	}),

	fetchenabledEmployeeListTakeAttendance: thunk(async (actions) => {
		const response = await fetchenabledEmployeeListTakeAttendance();
		actions.setLoading(true)
		if (response.status === 201 || response.status === 200) {
			actions.setLoading(false)
			const body = await response.json();
			if (body?.item?.length > 0) {
				body.item.forEach((element, index) => {
					element.index = index;
					element.attendanceStatus = "1";
				});
				//console.log(body.item)
				actions.setenabledEmployeeListTakeAttendance(body.item);
			} else {
				notification['warning']({
					message: 'No data found',
				});
				actions.setenabledEmployeeListTakeAttendance(body.item);
			}
		} else {
			actions.setLoading(false)
			const body = await response.json();
			notification['error']({
				message: 'Something went wrong',
			});
		}
	}),

	employeeAtttendanceListForUpdate: [],
	fetchemployeeAtttendanceListForUpdate: thunk(async (actions, payload) => {
		actions.setLoading(true);
		const response = await fetchemployeeAtttendanceListForUpdate(payload);
		if (response.status === 201 || response.status === 200) {
			actions.setLoading(false);
			const body = await response.json();
			if (body.item?.length > 0) {
				body.item.forEach((element, index) => {
					element.index = index;
				});
				actions.setemployeeAtttendanceListForUpdate(body?.item);
			} else {
				notification.error({ message: "Please take attendance first on the specified date" })
				actions.setemployeeAtttendanceListForUpdate([]);
			}
		} else {
			notification.error({ message: "Something went wrong" })
			actions.setLoading(false);
		}
	}),

	setemployeeAtttendanceListForUpdate: action((state, payload) => {
		state.employeeAtttendanceListForUpdate = payload;
	}),

	fetchEmployeeListForattendanceTimeConfig: thunk(async (actions, payload) => {
		const response = await employeeListForAttendanceConfigUrl();
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				actions.setEmployeeListForattendanceTimeConfig(body.item)
			} else {
				actions.setEmployeeListForattendanceTimeConfig([])
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	setEmployeeListForattendanceTimeConfig: action((state, payload) => {
		state.employeeListForattendanceTimeConfig = payload;
	}),

	saveEmployeeAttendanceTimeConfig: thunk(async (actions, payload) => {
		const response = await employeeAttendanceConfigSaveUrl(payload);
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
	updateAttendanceTimeConfiguration: thunk(async (actions, payload) => {
		const response = await updateAttendanceTimeConfiguration(payload);
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

	fetchEmployeeAttendanceTimeConfig: thunk(async (actions, payload) => {
		const response = await employeeAttendanceConfigListUrl();
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				actions.setEmployeeAttendanceTimeConfig(body.item)
			} else {
				actions.setEmployeeAttendanceTimeConfig([])
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	setEmployeeAttendanceTimeConfig: action((state, payload) => {
		state.employeeAttendanceTimeConfig = payload;
	}),

	fetchattendanceTimeConfigurationListByDepartmentWise: thunk(async (actions, payload) => {
		const response = await fetchattendanceTimeConfigurationListByDepartmentWise(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				if (body.item.length > 0) {
					actions.setattendanceTimeConfigurationListByDepartmentWise(body.item)
				} else {
					actions.setattendanceTimeConfigurationListByDepartmentWise([]);
					notification.warning({ message: 'No data found' })
				}
			} else {
				actions.setattendanceTimeConfigurationListByDepartmentWise([])
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	setattendanceTimeConfigurationListByDepartmentWise: action((state, payload) => {
		state.attendanceTimeConfigurationListByDepartmentWise = payload;
	}),

	leaveAssignListByDepartment: [],

	setleaveAssignListByDepartment: action((state, payload) => {
		state.leaveAssignListByDepartment = payload;
	}),

	fetchleaveAssignListByDepartment: thunk(async (actions, payload) => {
		const response = await fetchleaveAssignListByDepartment(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body?.item?.length > 0) {
				actions.setleaveAssignListByDepartment(body.item);
			} else {
				notification['warning']({
					message: 'No data found',
				});
				actions.setleaveAssignListByDepartment(body.item);
			}
		} else {
			const body = await response.json();
			notification['error']({
				message: 'Something went wrong',
			});
		}
	}),

	applicantApplyList: [],

	setapplicantApplyList: action((state, payload) => {
		state.applicantApplyList = payload;
	}),

	fetchapplicantApplyList: thunk(async (actions, payload) => {
		const response = await fetchapplicantApplyList(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body?.item?.length > 0) {
				actions.setapplicantApplyList(body.item);
			} else {
				notification['warning']({
					message: 'No data found',
				});
				actions.setapplicantApplyList(body.item);
			}
		} else {
			const body = await response.json();
			notification['error']({
				message: 'Something went wrong',
			});
		}
	}),
	deleteLeaveApplication: thunk(async (actions, payload) => {
		const response = await deleteLeaveApplication(payload.delid);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
				actions.fetchapplicantApplyList(payload.year)
			} else {
				notification.error({ message: body.message })
			}
		} else {
			const body = await response.json();
			notification['error']({
				message: 'Something went wrong',
			});
		}
	}),

	leaveApplicationPendingList: [],

	setleaveApplicationPendingList: action((state, payload) => {
		state.leaveApplicationPendingList = payload;
	}),

	fetchleaveApplicationPendingList: thunk(async (actions, payload) => {
		const response = await fetchleaveApplicationPendingList();
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body?.item?.length > 0) {
				actions.setleaveApplicationPendingList(body.item);
			} else {
				notification['warning']({
					message: 'No data found',
				});
				actions.setleaveApplicationPendingList(body.item);
			}
		} else {
			const body = await response.json();
			notification['error']({
				message: 'Something went wrong',
			});
		}
	}),
	approveLeaveApplication: thunk(async (actions, payload) => {
		const response = await approveLeaveApplication(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
				actions.fetchleaveApplicationPendingList(payload)
			} else {
				notification.error({ message: body.message })
			}
		} else {
			const body = await response.json();
			notification['error']({
				message: 'Something went wrong',
			});
		}
	}),
	rejectLeaveApplication: thunk(async (actions, payload) => {
		const response = await rejectLeaveApplication(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
				actions.fetchleaveApplicationPendingList(payload)
			} else {
				notification.error({ message: body.message })
			}
		} else {
			const body = await response.json();
			notification['error']({
				message: 'Something went wrong',
			});
		}
	}),

	remarksLits: [],

	setRemarksList: action((state, payload) => {
		state.remarksLits = payload;
	}),

	fetchRemarksList: thunk(async (actions, payload) => {
		const response = await fetchRemarksList();
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body?.item?.length > 0) {
				actions.setRemarksList(body.item);
			} else {
				notification['warning']({
					message: 'No data found',
				});
				actions.setRemarksList(body.item);
			}
		} else {
			const body = await response.json();
			notification['error']({
				message: 'Something went wrong',
			});
		}
	}),

	approveLateAttendance: thunk(async (actions, payload) => {
		const response = await approveLateAttendance(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
				actions.fetchRemarksList()
			} else {
				notification.error({ message: body.message })
			}
		} else {
			const body = await response.json();
			notification['error']({
				message: 'Something went wrong',
			});
		}
	}),
	approveAbsentAttendance: thunk(async (actions, payload) => {
		const response = await approveAbsentAttendance(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
				actions.fetchRemarksList()
			} else {
				notification.error({ message: body.message })
			}
		} else {
			const body = await response.json();
			notification['error']({
				message: 'Something went wrong',
			});
		}
	}),

	goToCompany: thunk(async (actions, payload) => {
		// console.log(payload)
		const response = await goToCompany(payload);
		if (response.status === 200) {
			const body = await response.json();
			if (body?.messageType === 1) {
				const response2 = await fetchCompanyInfoUrl();
				if (response2.status === 201 || response2.status === 200) {
					const body2 = await response2.json();
					actions.setCompanyInfo(body2.item);
					localStorage.setItem("companyInfo", JSON.stringify(body.item));
					localStorage.setItem('sideBarValuesKey', ('1'));
					window.location.href = '/';
				}
			} else {

				notification['error']({
					message: 'Info',
					description: body?.message,
				});
			}


		} else {

		}
	}),

	saveAttendanceFine: thunk(async (actions, payload) => {
		const response = await saveAttendanceFineUrl(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
				actions.fetchAttendanceFineList();
			} else {
				notification.error({ message: body.message })
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	fetchAttendanceFineList: thunk(async (actions, payload) => {
		const response = await fetcAttendanceFineUrl(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				actions.setAttendanceFineList(body.item)
			} else {
				actions.setAttendanceFineList([])
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	setAttendanceFineList: action((state, payload) => {
		state.attendanceFineList = payload;
	}),

	updateAttendanceFine: thunk(async (actions, payload) => {
		const response = await updateAttendanceFineUrl(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
				actions.fetchAttendanceFineList();
			} else {
				notification.error({ message: body.message })
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	deleteAttendanceFine: thunk(async (actions, payload) => {
		const response = await deleteAttendanceFineUrl(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
				actions.fetchAttendanceFineList();
			} else {
				notification.error({ message: body.message })
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

}
