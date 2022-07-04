import { notification } from 'antd';
import { Action, Thunk, thunk, action } from 'easy-peasy';
import { fetchDistrictList, fetchThanaList, fetchpartnerProfile, fetchclassList, fetchdepartmentList, fetchfeeHeadList, fetchsessionYearList, fetchdesignationList, fetchsessionList, fetchsessionYearListByClassId, fetchdepartmentListByClassId, fetchsessionYearListByClassDeptConfigId, fetchstudentBasicDetailsInfosBySesssionAndClassDepartSemesterYear, fetchstudentBasicDetails, fetchclassRoutineList, fetchclassRoutineView, classRoutineSave, classRoutineDelete, fetchexamRoutineList, fetchexamRoutineView, examRoutineSave, examRoutineDelete, selectDepartmentListUrl, selectDesignationListUrl, selectEmployeeTypeListUrl, selectShiftListUrl, fetchallCompanyView } from '../../../http/common/common';

export interface Common {
	districtList: any,
	thanaList: any,
	setdistrictList: Action<Common, any>;
	setthanaList: Action<Common, any>;
	districtListFetch: Thunk<Common>;
	thanaListFetch: Thunk<Common>;

	partnerProfile: any;
	setpartnerProfile: Action<Common, any>;
	fetchpartnerProfile: Thunk<Common>

	classList: any;
	setclassList: Action<Common, any>;
	fetchclassList: Thunk<Common>

	designationList: any;
	setdesignationList: Action<Common, any>;
	fetchdesignationList: Thunk<Common>

	departmentList: any;
	setdepartmentList: Action<Common, any>;
	fetchdepartmentList: Thunk<Common>

	feeHeadList: any;
	setfeeHeadList: Action<Common, any>;
	fetchfeeHeadList: Thunk<Common>

	sessionYearList: any;
	setsessionYearList: Action<Common, any>;
	fetchsessionYearList: Thunk<Common>

	sessionList: any;
	setsessionList: Action<Common, any>;
	fetchsessionList: Thunk<Common>

	sessionYearListByClassId: any;
	setsessionYearListByClassId: Action<Common, any>;
	fetchsessionYearListByClassId: Thunk<Common, any>

	departmentListByClassId: any;
	setdepartmentListByClassId: Action<Common, any>;
	fetchdepartmentListByClassId: Thunk<Common, any>

	sessionYearListByClassDeptConfigId: any;
	setsessionYearListByClassDeptConfigId: Action<Common, any>;
	fetchsessionYearListByClassDeptConfigId: Thunk<Common, any>

	studentBasicDetailsInfosBySesssionAndClassDepartSemesterYear: any;
	setstudentBasicDetailsInfosBySesssionAndClassDepartSemesterYear: Action<Common, any>;
	fetchstudentBasicDetailsInfosBySesssionAndClassDepartSemesterYear: Thunk<Common, any>

	studentBasicDetails: any;
	setstudentBasicDetails: Action<Common, any>;
	setstudentBasicDetailsTab: Action<Common>;
	fetchstudentBasicDetails: Thunk<Common, any>

	classRoutineList: any;
	setclassRoutineList: Action<Common, any>;
	fetchclassRoutineList: Thunk<Common>;

	classRoutineView: any;
	setclassRoutineView: Action<Common, any>;
	fetchclassRoutineView: Thunk<Common, any>;

	classRoutineSave: Thunk<Common, any>;
	classRoutineDelete: Thunk<Common, any>;

	examRoutineList: any;
	fetchexamRoutineList: Thunk<Common>;
	setexamRoutineList: Action<Common, any>;

	examRoutineView: any;
	setexamRoutine: Action<Common, any>;
	fetchexamRoutine: Thunk<Common, any>;

	examRoutineSave: Thunk<Common, any>;
	examRoutineDelete: Thunk<Common, any>;

	companyDepartmentList: any;
	setCompanyDepartmentList: Action<Common, any>;
	fetchCompanyDepartmentList: Thunk<Common>;

	companyDesignationList: any;
	setCompanyDesignationList: Action<Common, any>;
	fetchCompanyDesignationList: Thunk<Common>;

	companyEmployeeList: any;
	setCompanyEmployeeList: Action<Common, any>;
	fetchCompanyEmployeeList: Thunk<Common>;

	companyShiftList: any;
	setCompanyShiftList: Action<Common, any>;
	fetchCompanyShiftList: Thunk<Common>;	
	
	allCompanyView: any;
	setallCompanyView: Action<Common, any>;
	fetchallCompanyView: Thunk<Common>;


}

export const commonStore: Common = {
	districtList: null,
	thanaList: null,
	partnerProfile: null,
	companyDepartmentList:[],
	companyDesignationList:[],
	companyEmployeeList:[],
	companyShiftList:[],
	allCompanyView:[],
	districtListFetch: thunk(async (actions) => {
		const response = await fetchDistrictList();
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			//console.log(body)
			actions.setdistrictList(body?.item);
		} else {
			//const body = await response.json();
			//actions.loginFailed("Invalid Username/Password");
		}
	}),
	thanaListFetch: thunk(async (actions, id) => {
		const response = await fetchThanaList(id);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			//console.log('hello',body)
			actions.setthanaList(body?.item);
		} else {
			//const body = await response.json();
			//actions.loginFailed("Invalid Username/Password");
		}
	}),
	setdistrictList: action((state, payload) => {
		state.districtList = payload;
	}),
	setthanaList: action((state, payload) => {
		state.thanaList = payload;
	}),

	fetchpartnerProfile: thunk(async (actions) => {
		const response = await fetchpartnerProfile();
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			//console.log(body)
			actions.setpartnerProfile(body?.item);
		} else {
			//const body = await response.json();
			//actions.loginFailed("Invalid Username/Password");
		}
	}),
	setpartnerProfile: action((state, payload) => {
		state.partnerProfile = payload;
	}),

	classList: null,
	fetchclassList: thunk(async (actions) => {
		const response = await fetchclassList();
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			//console.log(body)
			actions.setclassList(body?.item);
		} else {

		}
	}),

	setclassList: action((state, payload) => {
		state.classList = payload;
	}),

	designationList: null,
	fetchdesignationList: thunk(async (actions) => {
		const response = await fetchdesignationList();
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			//console.log(body)
			actions.setdesignationList(body?.item);
		} else {

		}
	}),

	setdesignationList: action((state, payload) => {
		state.designationList = payload;
	}),


	departmentList: null,
	fetchdepartmentList: thunk(async (actions) => {
		const response = await fetchdepartmentList();
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			//console.log(body)
			actions.setdepartmentList(body?.item);
		} else {

		}
	}),
	setdepartmentList: action((state, payload) => {
		state.departmentList = payload;
	}),


	feeHeadList: null,
	fetchfeeHeadList: thunk(async (actions) => {
		const response = await fetchfeeHeadList();
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			//console.log(body)
			actions.setfeeHeadList(body?.item);
		} else {

		}
	}),

	setfeeHeadList: action((state, payload) => {
		state.feeHeadList = payload;
	}),

	sessionYearList: null,
	fetchsessionYearList: thunk(async (actions) => {
		const response = await fetchsessionYearList();
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			//console.log(body)
			actions.setsessionYearList(body?.item);
		} else {

		}
	}),

	setsessionYearList: action((state, payload) => {
		state.sessionYearList = payload;
	}),

	///
	sessionList: null,
	fetchsessionList: thunk(async (actions) => {
		const response = await fetchsessionList();
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			//console.log(body)
			actions.setsessionList(body?.item);
		} else {

		}
	}),
	setsessionList: action((state, payload) => {
		state.sessionList = payload;
	}),

	//
	sessionYearListByClassId: null,
	fetchsessionYearListByClassId: thunk(async (actions, payload) => {
		const response = await fetchsessionYearListByClassId(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			//console.log(body)
			actions.setsessionYearListByClassId(body?.item);
		} else {

		}
	}),
	setsessionYearListByClassId: action((state, payload) => {
		state.sessionYearListByClassId = payload;
	}),

	//
	departmentListByClassId: null,
	fetchdepartmentListByClassId: thunk(async (actions, payload) => {
		const response = await fetchdepartmentListByClassId(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			//console.log(body)
			actions.setdepartmentListByClassId(body?.item);
		} else {

		}
	}),
	setdepartmentListByClassId: action((state, payload) => {
		state.departmentListByClassId = payload;
	}),

	//
	sessionYearListByClassDeptConfigId: null,
	fetchsessionYearListByClassDeptConfigId: thunk(async (actions, payload) => {
		const response = await fetchsessionYearListByClassDeptConfigId(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			//console.log(body)
			actions.setsessionYearListByClassDeptConfigId(body?.item);
		} else {

		}
	}),
	setsessionYearListByClassDeptConfigId: action((state, payload) => {
		state.sessionYearListByClassDeptConfigId = payload;
	}),

	//
	studentBasicDetailsInfosBySesssionAndClassDepartSemesterYear: null,
	fetchstudentBasicDetailsInfosBySesssionAndClassDepartSemesterYear: thunk(async (actions, payload) => {
		const response = await fetchstudentBasicDetailsInfosBySesssionAndClassDepartSemesterYear(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			//console.log(body)
			actions.setstudentBasicDetailsInfosBySesssionAndClassDepartSemesterYear(body?.item);
		} else {

		}
	}),
	setstudentBasicDetailsInfosBySesssionAndClassDepartSemesterYear: action((state, payload) => {
		state.studentBasicDetailsInfosBySesssionAndClassDepartSemesterYear = payload;
	}),

	//
	studentBasicDetails: null,
	fetchstudentBasicDetails: thunk(async (actions, payload) => {
		const response = await fetchstudentBasicDetails(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			//console.log(body)
			actions.setstudentBasicDetails(body?.item);
		} else {
			actions.setstudentBasicDetails(null);
		}
	}),
	setstudentBasicDetails: action((state, payload) => {
		state.studentBasicDetails = payload;
	}),
	setstudentBasicDetailsTab: action((state, payload) => {
		state.studentBasicDetails = null;
	}),

	classRoutineList: null,
	fetchclassRoutineList: thunk(async (actions) => {
		const response = await fetchclassRoutineList();
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				//notification.success({ message: body.message })
				actions.setclassRoutineList(body?.item);
			} else {
				actions.setclassRoutineList(null);
			}

		} else {

		}
	}),
	setclassRoutineList: action((state, payload) => {
		state.classRoutineList = payload;
	}),

	classRoutineView: null,
	fetchclassRoutineView: thunk(async (actions, payload) => {
		const response = await fetchclassRoutineView(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				//notification.success({ message: body.message })
				actions.setclassRoutineView(body?.item);
			} else {
				actions.setclassRoutineView(null);
			}

		} else {

		}
	}),
	setclassRoutineView: action((state, payload) => {
		state.classRoutineView = payload;
	}),

	classRoutineSave: thunk(async (actions, payload) => {
		const response = await classRoutineSave(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
				actions.fetchclassRoutineList();
			} else {
				notification.error({ message: body.message })
			}

		} else {
			notification.error({ message: "Something went wrong" })
		}
	}),

	classRoutineDelete: thunk(async (actions, payload) => {
		const response = await classRoutineDelete(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
				actions.fetchclassRoutineList();
			} else {
				notification.error({ message: body.message })
			}

		} else {
			notification.error({ message: "Something went wrong" })
		}
	}),

	examRoutineList: null,
	fetchexamRoutineList: thunk(async (actions) => {
		const response = await fetchexamRoutineList();
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				//notification.success({ message: body.message })
				actions.setexamRoutineList(body?.item);
			} else {
				actions.setexamRoutineList(null);
			}

		} else {

		}
	}),
	setexamRoutineList: action((state, payload) => {
		state.examRoutineList = payload;
	}),

	examRoutineView: null,
	fetchexamRoutine: thunk(async (actions, payload) => {
		const response = await fetchexamRoutineView(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				//notification.success({ message: body.message })
				actions.setexamRoutine(body?.item);
			} else {
				actions.setexamRoutine(null);
			}

		} else {

		}
	}),
	setexamRoutine: action((state, payload) => {
		state.examRoutineView = payload;
	}),

	examRoutineSave: thunk(async (actions, payload) => {
		const response = await examRoutineSave(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
				actions.fetchexamRoutineList();
			} else {
				notification.error({ message: body.message })
			}

		} else {
			notification.error({ message: "Something went wrong" })
		}
	}),

	examRoutineDelete: thunk(async (actions, payload) => {
		const response = await examRoutineDelete(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
				actions.fetchexamRoutineList();
			} else {
				notification.error({ message: body.message })
			}

		} else {
			notification.error({ message: "Something went wrong" })
		}
	}),

	fetchCompanyDepartmentList:  thunk(async (actions) => {
		const response = await selectDepartmentListUrl();
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				//notification.success({ message: body.message })
				actions.setCompanyDepartmentList(body?.item);
			} else {
				actions.setCompanyDepartmentList(null);
			}

		} else {

		}
	}),
	setCompanyDepartmentList: action((state, payload) => {
		state.companyDepartmentList = payload;
	}),

	fetchCompanyDesignationList:  thunk(async (actions) => {
		const response = await selectDesignationListUrl();
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				//notification.success({ message: body.message })
				actions.setCompanyDesignationList(body?.item);
			} else {
				actions.setCompanyDesignationList(null);
			}

		} else {

		}
	}),
	setCompanyDesignationList: action((state, payload) => {
		state.companyDesignationList = payload;
	}),

	fetchCompanyEmployeeList:  thunk(async (actions) => {
		const response = await selectEmployeeTypeListUrl();
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				//notification.success({ message: body.message })
				actions.setCompanyEmployeeList(body?.item);
			} else {
				actions.setCompanyEmployeeList(null);
			}

		} else {

		}
	}),
	setCompanyEmployeeList: action((state, payload) => {
		state.companyEmployeeList = payload;
	}),

	fetchCompanyShiftList:  thunk(async (actions) => {
		const response = await selectShiftListUrl();
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				//notification.success({ message: body.message })
				actions.setCompanyShiftList(body?.item);
			} else {
				actions.setCompanyShiftList(null);
			}

		} else {

		}
	}),
	setCompanyShiftList: action((state, payload) => {
		state.companyShiftList = payload;
	}),

	fetchallCompanyView:  thunk(async (actions) => {
		const response = await fetchallCompanyView();
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				//notification.success({ message: body.message })
				actions.setallCompanyView(body?.item);
			} else {
				actions.setallCompanyView([]);
			}

		} else {

		}
	}),
	setallCompanyView: action((state, payload) => {
		state.allCompanyView = payload;
	}),

}
