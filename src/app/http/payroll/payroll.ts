import { post, get, del} from "../http";


export const fetchsalaryGradeList = () => get("/salary/grade/list");
export const saveSalaryGrade = (payload) => post("/salary/grade/save",payload);
export const updateSalaryGrade = (payload) => post("/salary/grade/update",payload);
export const deleteSalaryGrade = (payload) => del("/salary/grade/delete?salaryGradeid="+payload);

export const fetchsalaryHeadListAddition = () => get("/salary-head/addition/list");
export const addSalaryHeadAddition = (payload) => post("/salary-head/addition/save",payload);
export const updateSalaryHeadAddition = (payload) => post("/salary-head/addition/update",payload);
export const deleteSalaryHeadAddition = (payload) => del("/salary-head/addition/delete?salaryHeadId="+payload);

export const fetchsalaryHeadListDeduction = () => get("/salary-head/deduction/list");
export const addSalaryHeadDeduction = (payload) => post("/salary-head/deduction/save",payload);
export const updateSalaryHeadDeduction = (payload) => post("/salary-head/deduction/update",payload);
export const deleteSalaryHeadDeduction = (payload) => del("/salary-head/deduction/delete?salaryHeadId="+payload);

export const saveSalaryGradeConfiguration = (payload) => post("/salary-grade/configuration/save",payload);


export const fetchsalaryGradeConfigurationList = () => get("/salary-grade/configuration/list");
export const updateAdditionSalaryGradeConfiguration = (payload) => post("/salary-grade/configuration/update/addition",payload);
export const updateDeductionSalaryGradeConfiguration = (payload) => post("/salary-grade/configuration/update/deduction",payload);
export const deleteAdditionSalaryGradeConfiguration = (payload) => del("/salary-grade/configuration/delete/addition?configId="+payload);
export const deleteDeductionSalaryGradeConfiguration = (payload) => del("/salary-grade/configuration/delete/deduction?configId="+payload);

export const fetchsalarySheetViews = () => get("/salary-sheet/view");
export const saveSalaryProcess = (payload) => post("/salary/process/save", payload);
export const assignSalaryGrade = (payload) => post("/salary/grade/assign", payload);
export const assignDesignation = (payload) => post("/employee/designation/assign", payload);
export const updateBank = (payload) => post("/employee/bank/info/bulk/update", payload);
export const payEmployeeSalary = (payload) => post("/salary/payment/save", payload);
export const fetchsalaryProcessList = (payload) => get("/salary/process/list?month="+payload?.salaryMonth+"&year="+payload?.salaryYear);

export const fetchbankAdviseContentView = () => get("/bank/advise/content/view");
export const saveBankAdviseContent = (payload) => post("/bank/advise/content/save",payload);
export const fetchbankAdviseListView = (payload) => post("/bank/advise/view",payload);

export const fetchviewForSalaryPayment = (payload) => get("/salary/payment/view/for/payment?salaryRecordId="+payload);

