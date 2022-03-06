import { notification } from 'antd';
import { Action, Thunk, thunk, action } from 'easy-peasy';
import { fetchDistrictList, fetchThanaList, fetchpartnerProfile, fetchclassList, fetchdepartmentList, fetchfeeHeadList, fetchsessionYearList, fetchdesignationList, fetchsessionList, fetchsessionYearListByClassId, fetchdepartmentListByClassId, fetchsessionYearListByClassDeptConfigId, fetchstudentBasicDetailsInfosBySesssionAndClassDepartSemesterYear, fetchstudentBasicDetails, fetchclassRoutineList, fetchclassRoutineView, classRoutineSave, classRoutineDelete, fetchexamRoutineList, fetchexamRoutineView, examRoutineSave, examRoutineDelete } from '../../../http/common/common';
import { saveEmployeeDataFromExcelUrl, searchEmployeeListUrl } from '../../../http/hr/hr';


export interface Hr {
	
	employeeList : any;
	fetchEmployeeList : Thunk<Hr>;
	setEmployeeList:  Action<Hr, any>;

	saveEmployeeFromExcell : Thunk<Hr, any>;
}

export const hrStore: Hr = {
	employeeList:[],
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

}
