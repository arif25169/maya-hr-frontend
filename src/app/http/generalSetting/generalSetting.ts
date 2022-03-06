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