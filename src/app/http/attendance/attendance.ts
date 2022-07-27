import { post, get, del} from "../http";
export const inputEmployeeAttendance = (payload) => post('/employee/attendance/input', payload);
export const updateAttendance = (payload) => post('/employee/attendance/update/batch', payload);
export const deviceprocess = (payload) => post('/employee/attendance/auto/machine/data/process?date='+payload, payload);
export const fetchenabledEmployee = () => get("/employee/device/map/enabled/list");
export const saveSingleIdmapping = (payload) => post("/employee/device/map/save", payload);
export const saveBatchIdmapping = (payload) => post("/employee/device/map/batch/save", payload);
export const fetchdisabledEmployee = () => get("/employee/device/map/disabled/list");
export const deleteDisabledEmployee = (payload) => del('/employee/device/map/delete?mapId='+payload);

export const fetchweeklyHolidayList = () => get("/holyday/weekly/list");
export const createHolidayList = (payload) => get("/holyday/weekly/save?dayName="+payload?.dayName);
export const deleteHolidayList = (payload) => del('/holyday/weekly/delete?holyDayId='+payload);

export const fetchgovtHolidayList = (payload) => get("/holyday/govt/list/by-year?year="+payload?.year);
export const creategovtHolidayList = (payload) => post("/holyday/govt/save", payload);
export const updateEmployeeAttendanceRemark = (payload) => post("/employee/attendance/remark", payload);
export const deletegovtHolidayList = (payload) => del("/holyday/govt/delete?holyDayId="+payload);
export const fetchemployeeDateWiseAttReport = (attendanceDate) => get("/employee/attendance/report/date-wise?attendanceDate=" + attendanceDate);
export const fetchemployeeMonthWiseAttReport = (payload) => get(`/employee/attendance/report/single/employee/details?month=${payload.month}&employeeId=${payload.employeeId}&year=${payload.year}`);
export const fetchattendanceDetailsAllEmployee = (payload) => get(`/employee/attendance/report/all/employee/details?month=${payload.month}&year=${payload.year}`);
export const fetchattendanceDetailsselfEmployee = (payload) => get(`/employee/attendance/report/self/details?fromDate=${payload.fromDate}&toDate=${payload.toDate}`);
export const fetchattendanceDetailsAllEmployee2 = (payload) => get(`/employee/attendance/report/all/employee/details?fromDate=${payload.fromDate}&toDate=${payload.toDate}`);
export const fetchattendanceDetailssingleEmployee = (payload) => get(`/employee/attendance/report/single/employee/details?fromDate=${payload.fromDate}&toDate=${payload.toDate}&employeeId=${payload.employeeId}`);
export const fetchattendanceDetailsDepartmentEmployee = (payload) => get(`/employee/attendance/report/department/employee/details?fromDate=${payload.fromDate}&toDate=${payload.toDate}&departmentId=${payload.departmentId}`);
export const fetchemployeeAttendanceShiftConfigurationList = (payload) => get(`/employee/attendance/shift/configuration/list?fromDate=${payload.fromDate}&toDate=${payload.toDate}&departmentId=${payload.departmentId}`);
export const fetchshiftList = () => get("/employee/attendance/shift/configuration/shift/list");
export const saveShiftConfiguration = (payload) => post("/employee/attendance/shift/configuration/save", payload);
