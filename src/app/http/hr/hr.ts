import { post, get, del} from "../http";
export const saveEmployeeDataFromExcelUrl = (payload) => post('/employee/save', payload);
export const fetchAllEmployeeList = () => get('/employee/whole/list');
export const searchEmployeeListUrl = (payload) => get(`/employee/list?departmentId=${payload.department}&designationId=${payload.designation}&employeeTypeId=${payload.employeeType}`);
export const saveEmployeeEducationDataUrl = (payload) => post('/employee/education/save', payload);
export const fetchEmployeeEducationListUrl = (payload) => get('/employee/education/list?employeeId='+payload);
export const deleteEmployeeInformation = (payload) => del('/employee/education/delete?educationId='+payload);
export const deleteAttachment = (payload) => del('/employee/attachment/delete?attachmentId='+payload);
export const educationInfoUpdateUrl = (payload) => post('/employee/education/update', payload);

export const saveTraningInfoUrl = (payload) => post('/employee/training/save', payload);
export const fetchTraningInfoUrl = (payload) => get('/employee/training/list?employeeId='+payload );
export const fetchattachmentList = (payload) => get('/employee/attachment/list?employeeId='+payload );
export const deleteTrainingInfoUrl = (payload) => del('/employee/training/delete?trainingId='+payload );
export const traningInfoUpdateUrl = (payload) => post('/employee/training/update', payload);

export const bankInfoUpdateUrl = (payload) => post('/employee/bank/info/update', payload);
export const basicInfoUpdateUrl = (payload) => post('/employee/basic/info/update', payload);
export const saveEmployeeAttachmentInfo = (payload) => post('/employee/attachment/info/save', payload);

export const fetchEmployeeByDepartment = (payload) => get('/employee/list/by/departmentId?departmentId='+payload);
export const downloadHrTraining = (payload) => get('/employee/training/certificate/download?trainingId='+payload);

export const saveWorkExperienceInfoUrl = (payload) => post('/employee/previous/work/info/save', payload);
export const fetchWorkExperienceInfoListUrl = (payload) => get('/employee/previous/work/info/list?employeeId='+payload );
export const deleteWorkExperienceInfoUrl = (payload) => del('/employee/previous/work/info/delete?previousWorkInfoId='+payload );
export const workExperienceInfoUpdateUrl = (payload) => post('/employee/previous/work/info/update', payload);