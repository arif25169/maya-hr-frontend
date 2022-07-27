import { notification } from 'antd';
import { Action, Thunk, thunk, action } from 'easy-peasy';
import { fetchDistrictList, fetchThanaList, fetchpartnerProfile, fetchclassList, fetchdepartmentList, fetchfeeHeadList, fetchsessionYearList, fetchdesignationList, fetchsessionList, fetchsessionYearListByClassId, fetchdepartmentListByClassId, fetchsessionYearListByClassDeptConfigId, fetchstudentBasicDetailsInfosBySesssionAndClassDepartSemesterYear, fetchstudentBasicDetails, fetchclassRoutineList, fetchclassRoutineView, classRoutineSave, classRoutineDelete, fetchexamRoutineList, fetchexamRoutineView, examRoutineSave, examRoutineDelete } from '../../../http/common/common';
import { bankInfoUpdateUrl, basicInfoUpdateUrl, deleteAttachment, deleteEmployeeInformation, deleteTrainingInfoUrl, deleteWorkExperienceInfoUrl, downloadHrTraining, educationInfoUpdateUrl, fetchAllEmployeeList, fetchattachmentList, fetchEmployeeByDepartment, fetchEmployeeEducationListUrl, fetchTraningInfoUrl, fetchWorkExperienceInfoListUrl, saveEmployeeAttachmentInfo, saveEmployeeDataFromExcelUrl, saveEmployeeEducationDataUrl, saveTraningInfoUrl, saveWorkExperienceInfoUrl, searchEmployeeListUrl, traningInfoUpdateUrl, workExperienceInfoUpdateUrl } from '../../../http/hr/hr';
import FileSaver from 'file-saver'

export interface Hr {
	
	employeeList : any;
	fetchEmployeeList : Thunk<Hr>;
	setEmployeeList:  Action<Hr, any>;
	
	employeeListForAttendanceFine : any;
	fetchEmployeeListForAttendanceFine : Thunk<Hr>;
	setEmployeeListForAttendanceFine:  Action<Hr, any>;
	
	allemployeeList : any;
	fetchAllEmployeeList : Thunk<Hr>;
	setAllEmployeeList:  Action<Hr, any>;

	employeeListByDepartment : any;
	fetchEmployeeByDepartment : Thunk<Hr>;
	setEmployeeListByDepartment:  Action<Hr, any>;		
	
	attachmentList : any;
	fetchattachmentList : Thunk<Hr, any>;
	setattachmentList:  Action<Hr, any>;	
	
	employeeListByDepartment2 : any;
	fetchEmployeeByDepartment2 : Thunk<Hr>;
	setEmployeeListByDepartment2:  Action<Hr, any>;

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
	saveEmployeeAttachmentInfo: Thunk<Hr, any>;
	downloadHrTraining: Thunk<Hr, any>;
	deleteAttachment : Thunk<Hr, any>;

	saveWorkExperienceInfo : Thunk<Hr, any>;
	workExperienceInfoList : any;
	fetchWorkExperienceInfoList : Thunk<Hr, any>;
	setWorkExperienceInfoList:  Action<Hr, any>;
	deleteWorkExperienceInfo : Thunk<Hr, any>;
	updateWorkExperienceInfo : Thunk<Hr, any>;

}

export const hrStore: Hr = {
	employeeList:[],
	employeeListForAttendanceFine:[],
	allemployeeList:[],
	employeeEducationList:[],
	employeeTrainingInfoList:[],
	passingYearUpdateDataStore: '',
	workExperienceInfoList:[], 
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
				if (body.item?.length===0){
					notification.warn({message:"No Data Found"})
				}
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

	fetchEmployeeListForAttendanceFine: thunk(async (actions, payload) => {
		const response = await searchEmployeeListUrl(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				if (body.item?.length===0){
					notification.warn({message:"No Data Found"})
				}
				actions.setEmployeeListForAttendanceFine(body.item)
			}else{
				actions.setEmployeeListForAttendanceFine([])
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	setEmployeeListForAttendanceFine: action((state, payload) => {
		state.employeeListForAttendanceFine = payload;
	}),

	fetchAllEmployeeList: thunk(async (actions, payload) => {
		const response = await fetchAllEmployeeList();
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				
				actions.setAllEmployeeList(body.item)
			}else{
				actions.setAllEmployeeList([])
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	setAllEmployeeList: action((state, payload) => {
		state.allemployeeList = payload;
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
	
	saveEmployeeAttachmentInfo:thunk(async (actions, payload) => {
		const response = await saveEmployeeAttachmentInfo(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message });
				actions.fetchattachmentList(payload.employeeId)
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
		
	
	attachmentList:[],
	
	fetchattachmentList: thunk(async (actions, payload) => {
		const response = await fetchattachmentList(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				
				actions.setattachmentList(body.item)
			}else{
				actions.setattachmentList([])
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	setattachmentList: action((state, payload) => {
		state.attachmentList = payload;
	}),	
	
	employeeListByDepartment2:[],
	
	fetchEmployeeByDepartment2: thunk(async (actions, payload) => {
		const response = await fetchEmployeeByDepartment(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				
				actions.setEmployeeListByDepartment2(body.item)
			}else{
				actions.setEmployeeListByDepartment2([])
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	setEmployeeListByDepartment2: action((state, payload) => {
		state.employeeListByDepartment2 = payload;
	}),

	downloadHrTraining: thunk(async (actions, payload) => {
        const response = await downloadHrTraining(payload);
        if (response.status === 201 || response.status === 200) {
          const body = await response.json();
		  const blobPdfFromBase64String = base64String => {
			const byteArray = Uint8Array.from(
			  atob(base64String)
				.split('')
				.map(char => char.charCodeAt(0))
			);
		   return new Blob([byteArray], { type: 'application/pdf' });
		 };
            var blob =blobPdfFromBase64String(body?.item);
            var fileName = "TRAINING_DOCUMENT.pdf";
            FileSaver.saveAs(blob, fileName);
        } else {
            const body = await response.json();
            notification.error({ message: body.message })
        }
    }),

	deleteAttachment: thunk(async (actions, payload) => {
		const response = await deleteAttachment(payload.attachmentId);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
				let id = localStorage.getItem('employeeId')
				actions.fetchattachmentList(payload.employeeId);
			}else{
				notification.error({ message: body.message })
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	setWorkExperienceInfoList: action((state, payload) => {
		state.workExperienceInfoList = payload;
	}),

	saveWorkExperienceInfo:thunk(async (actions, payload) => {
		const response = await saveWorkExperienceInfoUrl(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
				let id = localStorage.getItem('employeeId')
				actions.fetchWorkExperienceInfoList(id);
			}else{
				notification.error({ message: body.message })
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),
	
	fetchWorkExperienceInfoList: thunk(async (actions, payload) => {
		const response = await fetchWorkExperienceInfoListUrl(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				
				actions.setWorkExperienceInfoList(body.item)
			}else{
				actions.setWorkExperienceInfoList([])
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	deleteWorkExperienceInfo: thunk(async (actions, payload) => {
		const response = await deleteWorkExperienceInfoUrl(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message })
				let id = localStorage.getItem('employeeId')
				actions.fetchWorkExperienceInfoList(id);
			}else{
				notification.error({ message: body.message })
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

	updateWorkExperienceInfo:thunk(async (actions, payload) => {
		const response = await workExperienceInfoUpdateUrl(payload);
		if (response.status === 201 || response.status === 200) {
			const body = await response.json();
			if (body.messageType == 1) {
				notification.success({ message: body.message });
				let id = localStorage.getItem('employeeId')
				actions.fetchWorkExperienceInfoList(id);
			}else{
				notification.error({ message: body.message });
			}
		} else {
			notification.error({ message: 'Something Wrong' });
		}
	}),

}
