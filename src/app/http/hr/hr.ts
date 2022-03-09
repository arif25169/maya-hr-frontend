import { post, get, del} from "../http";
export const saveEmployeeDataFromExcelUrl = (payload) => post('/employee/save', payload);
export const searchEmployeeListUrl = (payload) => get(`/employee/list?departmentId=${payload.department}&designationId=${payload.designation}&employeeTypeId=${payload.employeeType}`);
export const saveEmployeeEducationDataUrl = (payload) => post('/employee/education/save', payload);
export const fetchEmployeeEducationListUrl = (payload) => get('/employee/education/list?employeeId='+payload);
export const deleteEmployeeInformation = (payload) => del('/employee/education/delete?educationId='+payload);
export const educationInfoUpdateUrl = (payload) => post('/employee/education/update', payload);

export const saveTraningInfoUrl = (payload) => post('/employee/training/save', payload);
export const fetchTraningInfoUrl = (payload) => get('/employee/training/list?employeeId='+payload );
export const deleteTrainingInfoUrl = (payload) => del('/employee/training/delete?trainingId='+payload );