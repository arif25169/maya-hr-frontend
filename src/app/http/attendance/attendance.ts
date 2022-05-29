import { post, get, del} from "../http";
export const inputEmployeeAttendance = (payload) => post('/employee/attendance/input', payload);
export const updateAttendance = (payload) => post('/employee/attendance/update', payload);
export const deviceprocess = (payload) => post('/employee/attendance/auto/machine/data/process?date='+payload, payload);