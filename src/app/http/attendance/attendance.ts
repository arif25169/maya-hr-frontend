import { post, get, del} from "../http";
export const inputEmployeeAttendance = (payload) => post('/employee/attendance/input', payload);
export const updateAttendance = (payload) => post('/employee/attendance/update', payload);
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
export const deletegovtHolidayList = (payload) => del("/holyday/govt/delete?holyDayId="+payload);
