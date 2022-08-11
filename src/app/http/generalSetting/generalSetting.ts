import { post, get, del} from "../http";
export const saveCompanyUrl = (payload) => post("/company/sign-up", payload);

export const saveDepartmentUrl = (payload) => post("/department/save", payload);
export const updateDepartmentUrl = (payload) => post("/department/update", payload);
export const fetchDepartmentUrl = () => get("/department/list");
export const deleteDepartmentUrl = (payload) => del("/department/delete?departmentId="+payload);

export const saveDesignationUrl = (payload) => post("/designation/save", payload);
export const updateDesignationUrl = (payload) => post("/designation/update", payload);
export const fetchDesignationUrl = () => get("/designation/list");
export const deleteDesignationUrl = (payload) => del("/designation/delete?designationId="+payload);

export const saveEmployeeTypeUrl = (payload) => post("/employee-type/save", payload);
export const updateEmployeeTypeUrl = (payload) => post("/employee-type/update", payload);
export const fetchEmployeeTypeUrl = () => get("/employee-type/list");
export const deleteEmployeeTypeUrl = (payload) => del("/employee-type/delete?employeeTypeId="+payload);

export const saveShiftUrl = (payload) => post("/shift/save", payload);
export const updateShiftUrl = (payload) => post("/shift/update", payload);
export const fetchShiftUrl = () => get("/shift/list");
export const deleteShiftUrl = (payload) => del("/shift/delete?shiftId="+payload);

export const fetchleaveCategoryList = () => get("/leave/category/list");
export const createLeaveCategory = (payload) => post("/leave/category/save",payload);
export const updateLeaveCategory = (payload) => post("/leave/category/update",payload);
export const deleteLeaveCategory = (payload) => del("/leave/category/delete?leaveCatoryId="+payload);

export const fetchholidayList = () => get("/holiday/list");
export const createHoliday = (payload) => post("/holiday/save",payload);
export const updateHoliday = (payload) => post("/holiday/update",payload);
export const deleteHoliday = (payload) => del("/holiday/delete?holidayId="+payload);


export const fetchleaveConfigList = () => get("/leave/config/list");
export const createLeaveConfig = (payload) => post("/leave/config/save",payload);
export const updateLeaveConfig = (payload) => post("/leave/config/update",payload);
export const deleteLeaveConfig = (payload) => del("/leave/config/delete?leaveConfigId="+payload);

export const employeeListByDepartmentIdUrl = (payload) => get("/employee/list?departmentId="+payload);
export const leaveConfigListByDepartmentIdUrl = (payload) => get("/leave/config/list/by/departmentId?departmentId="+payload);
export const createLeaveAssignSaveUrl = (payload) => post("/leave/assign/save",payload);
export const leaveApply = (payload) => post("/leave/application/save",payload);

export const fetchCompanyInfoUrl = () => get('/company/info');
export const updateCompanyInfoUrl = (payload) => post("/company/update",payload);

export const employeeListForAttendanceConfigUrl = () => get('/employee/list');
export const fetchenabledEmployeeListTakeAttendance = () => get('/employee/list');
export const fetchemployeeAtttendanceListForUpdate = (payload) => get('/employee/attendance/list/for/update?attendanceDate='+payload.attendanceDate+'&shiftId='+payload.shiftId);
export const employeeAttendanceConfigSaveUrl = (payload) => post('/attendance/time/configuration/save', payload);
export const updateAttendanceTimeConfiguration = (payload) => post('/attendance/time/configuration/update', payload);
export const employeeAttendanceConfigListUrl = () => get('/attendance/time/configuration/list');

export const fetchleaveAssignListByDepartment = (payload) => get("/leave/assign/list/department-id?departmentId="+payload.departmentId+"&year="+payload.year);
export const fetchattendanceTimeConfigurationListByDepartmentWise = (payload) => get("/attendance/time/configuration/list/by/departmentid?departmentId="+payload.departmentId);
export const deleteAttendanceTimeConfiguration = (payload) => del("/attendance/time/configuration/delete?attendnaceTimeConfigurationIds="+payload);
export const fetchapplicantApplyList = (payload) => get('/leave/application/applicant/apply/list?year='+payload);
export const deleteLeaveApplication = (payload) => del("/leave/application/delete?applyId="+payload);
export const fetchleaveApplicationPendingList = () => get('/leave/application/pending/list');
export const fetchRemarksList = () => get('/employee/attendance/remark/list');
export const approveLeaveApplication = (payload) => post("/leave/application/approve?applyId="+payload);
export const rejectLeaveApplication = (payload) => post("/leave/application/reject?applyId="+payload);

export const approveLateAttendance = (payload) => post("/employee/attendance/approve/late/attendance?attendanceId="+payload);
export const approveAbsentAttendance = (payload) => post("/employee/attendance/approve/absent/attendance?attendanceId="+payload);
export const goToCompany = (payload) => get("/company/jump?companyId="+payload);

export const savedutyStation = (payload) => post("/duty-station/save", payload);
export const updatedutyStation = (payload) => post("/duty-station/update", payload);
export const fetchdutyStationList = () => get("/duty-station/list");
export const deletedutyStation = (payload) => del("/duty-station/delete?dutyStationId="+payload);

export const saveAttendanceFineUrl = (payload) => post("/attendance/fine/save", payload);
export const updateAttendanceFineUrl = (payload) => post("/attendance/fine/update", payload);
export const fetcAttendanceFineUrl = (payload) => get(`/attendance/fine/list?month=${payload.month}&year=${payload.year}`);
export const fetchemployeeListForManualInput = (payload) => get(`/employee/attendance/list/for/manual/input?attendanceDate=${payload.attendanceDate}&departmentId=${payload.departmentId}&shiftId=${payload.shiftId}`);
export const deleteAttendanceFineUrl = (payload) => del(`/attendance/fine/delete?attendanceFineId=${payload}`);