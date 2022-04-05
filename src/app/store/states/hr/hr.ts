import { notification } from 'antd';
import { Action, Thunk, thunk, action } from 'easy-peasy';
import { fetchDistrictList, fetchThanaList, fetchpartnerProfile, fetchclassList, fetchdepartmentList, fetchfeeHeadList, fetchsessionYearList, fetchdesignationList, fetchsessionList, fetchsessionYearListByClassId, fetchdepartmentListByClassId, fetchsessionYearListByClassDeptConfigId, fetchstudentBasicDetailsInfosBySesssionAndClassDepartSemesterYear, fetchstudentBasicDetails, fetchclassRoutineList, fetchclassRoutineView, classRoutineSave, classRoutineDelete, fetchexamRoutineList, fetchexamRoutineView, examRoutineSave, examRoutineDelete } from '../../../http/common/common';
import { bankInfoUpdateUrl, basicInfoUpdateUrl, deleteEmployeeInformation, deleteTrainingInfoUrl, educationInfoUpdateUrl, fetchEmployeeByDepartment, fetchEmployeeEducationListUrl, fetchTraningInfoUrl, saveEmployeeDataFromExcelUrl, saveEmployeeEducationDataUrl, saveTraningInfoUrl, searchEmployeeListUrl, traningInfoUpdateUrl } from '../../../http/hr/hr';


export interface Hr {
	
	employeeList : any;
	fetchEmployeeList : Thunk<Hr>;
	setEmployeeList:  Action<Hr, any>;

	employeeListByDepartment : any;
	fetchEmployeeByDepartment : Thunk<Hr>;
	setEmployeeListByDepartment:  Action<Hr, any>;

	saveEmployeeFromExcell : Thunk<Hr, any>;

	saveEmployeeEducationInfo : Thunk<Hr, any>;
	employeeEducationList : any;
	fetchEmployeeEducationList : Thunk<Hr, any>;
	setEmployeeEducationList:  Action<Hr, any>;
	deleteEmployeeEducationInfo : Thunk<Hr, any>;
	updateEmployeeEducationInfo : Thunk<Hr, any>;

	passingYearUpdateDataStore :any;
	setPassingYearUpdateDataStore: Thunk<Hr, any>;

	saveEmployeeTrainingInfo : Thunk<Hr, any>;
	employeeTrainingInfoList : any;
	fetchEmployeeTrainingInfoList : Thunk<Hr, any>;
	setEmployeeTrainingInfoList:  Action<Hr, any>;
	deleteEmployeeTrainingInfo : Thunk<Hr, any>;
	updateEmployeeTraningInfo : Thunk<Hr, any>;

	updateEmployeeBankInfo: Thunk<Hr, any>;

	updateEmployeeBasicInfo: Thunk<Hr, any>;

}

export const hrStore: Hr = {
	employeeList:[],
	employeeEducationList:[],
	employeeTrainingInfoList:[],
	passingYearUpdateDataStore: '',
	setPassingYearUpdateDataStore: thunk((state, payload) => {
		console.log(payload);
		
		// state.passingYearUpdateDataStore = payload;
	}),
	saveEmployeeFromExcell:thunk(async (actions, payload) => {
		const response = await saveEmployeeDataFromExcelUrl(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
			}else{
				notification.error({ message: body.message })
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	fetchEmployeeList: thunk(async (actions, payload) => {
		const response = await searchEmployeeListUrl(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				
				actions.setEmployeeList(body.item)
			}else{
				actions.setEmployeeList([])
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	setEmployeeList: action((state, payload) => {
		state.employeeList = payload;
	}),

	saveEmployeeEducationInfo:thunk(async (actions, payload) => {
		const response = await saveEmployeeEducationDataUrl(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
				let id = localStorage.getItem('employeeId')
				actions.fetchEmployeeEducationList(id);
			}else{
				notification.error({ message: body.message })
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	fetchEmployeeEducationList: thunk(async (actions, payload) => {
		const response = await fetchEmployeeEducationListUrl(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				actions.setEmployeeEducationList(body.item);
			}else{
				actions.setEmployeeEducationList([])
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	setEmployeeEducationList: action((state, payload) => {
		state.employeeEducationList = payload;
	}),

	deleteEmployeeEducationInfo: thunk(async (actions, payload) => {
		const response = await deleteEmployeeInformation(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
				let id = localStorage.getItem('employeeId')
				actions.fetchEmployeeEducationList(id);
			}else{
				notification.error({ message: body.message })
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	updateEmployeeEducationInfo:thunk(async (actions, payload) => {
		const response = await educationInfoUpdateUrl(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message });
				let id = localStorage.getItem('employeeId')
				actions.fetchEmployeeEducationList(id);
			}else{
				notification.error({ message: body.message });
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	saveEmployeeTrainingInfo:thunk(async (actions, payload) => {
		const response = await saveTraningInfoUrl(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
				let id = localStorage.getItem('employeeId')
				actions.fetchEmployeeTrainingInfoList(id);
			}else{
				notification.error({ message: body.message })
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	fetchEmployeeTrainingInfoList: thunk(async (actions, payload) => {
		const response = await fetchTraningInfoUrl(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				
				actions.setEmployeeTrainingInfoList(body.item)
			}else{
				actions.setEmployeeTrainingInfoList([])
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	setEmployeeTrainingInfoList: action((state, payload) => {
		state.employeeTrainingInfoList = payload;
	}),

	deleteEmployeeTrainingInfo: thunk(async (actions, payload) => {
		const response = await deleteTrainingInfoUrl(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
				let id = localStorage.getItem('employeeId')
				actions.fetchEmployeeTrainingInfoList(id);
			}else{
				notification.error({ message: body.message })
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	updateEmployeeTraningInfo:thunk(async (actions, payload) => {
		const response = await traningInfoUpdateUrl(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message });
				let id = localStorage.getItem('employeeId')
				actions.fetchEmployeeTrainingInfoList(id);
			}else{
				notification.error({ message: body.message });
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	updateEmployeeBankInfo:thunk(async (actions, payload) => {
		const response = await bankInfoUpdateUrl(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message });
			}else{
				notification.error({ message: body.message });
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	updateEmployeeBasicInfo:thunk(async (actions, payload) => {
		const response = await basicInfoUpdateUrl(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message });
			}else{
				notification.error({ message: body.message });
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),
	
	employeeListByDepartment:[],
	
	fetchEmployeeByDepartment: thunk(async (actions, payload) => {
		const response = await fetchEmployeeByDepartment(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				
				actions.setEmployeeListByDepartment(body.item)
			}else{
				actions.setEmployeeListByDepartment([])
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	setEmployeeListByDepartment: action((state, payload) => {
		state.employeeListByDepartment = payload;
	}),

}
