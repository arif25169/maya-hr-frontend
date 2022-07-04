import { post, get, del} from "../http";


export const fetchpartnerProfile = () => get("/partner/profile");
export const fetchDistrictList = () => get("/location/info/district-list");
export const fetchclassList = () => get("/initial-setup/class/list");
export const fetchdesignationList = () => get("/initial-setup/designation/list");
export const fetchdepartmentList = () => get("/initial-setup/department/list");
export const fetchfeeHeadList = () => get("/initial-setup/fee-head/list");
export const fetchsessionYearList = () => get("/initial-setup/sessionyear/list");
export const fetchThanaList = (id) => get(`/location/info/thana-list/by/district-id?districtId=${id}`);
export const fetchsessionList = () => get("/initial-setup/session/list");
export const fetchsessionYearListByClassId = (id) => get(`/initial-setup/sessionyear/list/by/class-id?classId=${id}`);
export const fetchdepartmentListByClassId = (id) => get(`/initial-setup/department/list/by/class-id?classid=${id}`);
export const fetchsessionYearListByClassDeptConfigId = (id) => get(`/initial-setup/sessionyear/list/by/class-dept-configid?classDeptConfigId=${id}`);
export const fetchstudentBasicDetailsInfosBySesssionAndClassDepartSemesterYear = (payload) => get(`/student/report/whole/info/list/by/session/class-department/semester-year?classDeptConfId=${payload.classDeptConfId}&semesterYear=${payload.semesterYear}&sessionId=${payload.sessionId}`);
export const fetchstudentBasicDetails = (payload) => post("/student/report/basic/info/list/by/academic-year/section/group/category",payload);


export const fetchclassRoutineList = () => get("/class/routine/list");
export const fetchclassRoutineView = (payload) => get("/class/routine/view?classRoutineId="+payload);
export const classRoutineDelete = (payload) => del("/class/routine/delete?classRoutineId="+payload);
export const classRoutineSave = (payload) => post("/class/routine/save",payload);

export const fetchexamRoutineList = () => get("/exam/routine/list");
export const fetchexamRoutineView = (payload) => get("/exam/routine/view?routineId="+payload);
export const examRoutineDelete = (payload) => del("/exam/routine/delete?routineId="+payload);
export const examRoutineSave = (payload) => post("/exam/routine/save",payload);

export const selectDepartmentListUrl =() => get("/department/list");
export const selectDesignationListUrl =() => get("/designation/list");
export const selectEmployeeTypeListUrl =() => get("/employee-type/list");
export const selectShiftListUrl =() => get("/shift/list");

export const fetchallCompanyView = () => get("/company/all/view");

