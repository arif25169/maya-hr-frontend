import { post, get, del} from "../http";
export const inputEmployeeAttendance = (payload) => post('/employee/attendance/input', payload);
export const updateAttendance = (payload) => post('/employee/attendance/update', payload);