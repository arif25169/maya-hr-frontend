import { post, get, del} from "../http";
export const saveEmployeeDataFromExcelUrl = (payload) => post('/employee/save', payload);
export const searchEmployeeListUrl = (payload) => get(`/employee/list?departmentId=${payload.department}&designationId=${payload.designation}&employeeTypeId=${payload.employeeType}`);