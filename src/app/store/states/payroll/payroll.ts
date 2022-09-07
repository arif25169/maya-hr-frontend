import { notification } from 'antd';
import { Action, Thunk, thunk, action } from 'easy-peasy';
import { addSalaryHeadAddition, addSalaryHeadDeduction, assignDesignation, assignSalaryGrade, batchPayEmployeeSalary, deleteAdditionSalaryGradeConfiguration, deleteDeductionSalaryGradeConfiguration, deleteSalaryGrade, deleteSalaryHeadAddition, deleteSalaryHeadDeduction, deleteSalryConfiguration, employeeCustomIdUpdate, fetchbankAdviseContentView, fetchbankAdviseListView, fetchsalaryGradeConfigurationList, fetchsalaryGradeList, fetchsalaryHeadListAddition, fetchsalaryHeadListDeduction, fetchsalaryProcessList, fetchsalaryProcessList3, fetchsalarySheetViews, fetchsalarySheetViewsByDep, fetchsalarySheetViewsByDepNew, fetchsalryConfigurationSheetByDepartment, fetchviewForSalaryPayment, payEmployeeSalary, salaryProcessListDelete3, saveBankAdviseContent, saveSalaryGrade, saveSalaryGradeConfiguration, saveSalaryProcess, updateAdditionSalaryGradeConfiguration, updateBank, updateDeductionSalaryGradeConfiguration, updateSalaryGrade, updateSalaryHeadAddition, updateSalaryHeadDeduction } from '../../../http/payroll/payroll';

export interface Payroll {
    //////
    salaryGradeList: any;
    setsalaryGradeList: Action<Payroll, any>;
    fetchsalaryGradeList: Thunk<Payroll>;
    saveSalaryGrade: Thunk<Payroll, any>;
    updateSalaryGrade: Thunk<Payroll, any>;
    deleteSalaryGrade: Thunk<Payroll, any>;
    //////

    //////
    salaryHeadListAddition: any;
    setsalaryHeadListAddition: Action<Payroll, any>;
    fetchsalaryHeadListAddition: Thunk<Payroll>;
    addSalaryHeadAddition: Thunk<Payroll, any>;
    updateSalaryHeadAddition: Thunk<Payroll, any>;
    deleteSalaryHeadAddition: Thunk<Payroll, any>;
    //////

    //////
    salaryHeadListDeduction: any;
    setsalaryHeadListDeduction: Action<Payroll, any>;
    fetchsalaryHeadListDeduction: Thunk<Payroll>;
    addSalaryHeadDeduction: Thunk<Payroll, any>;
    updateSalaryHeadDeduction: Thunk<Payroll, any>;
    deleteSalaryHeadDeduction: Thunk<Payroll, any>;
    //////

    //////
    salaryGradeConfigurationList: any;
    setsalaryGradeConfigurationList: Action<Payroll, any>;
    fetchsalaryGradeConfigurationList: Thunk<Payroll>;
    updateAdditionSalaryGradeConfiguration: Thunk<Payroll, any>;
    updateDeductionSalaryGradeConfiguration: Thunk<Payroll, any>;
    deleteAdditionSalaryGradeConfiguration: Thunk<Payroll, any>;
    deleteDeductionSalaryGradeConfiguration: Thunk<Payroll, any>;
    //////
    saveSalaryGradeConfiguration: Thunk<Payroll, any>;

    salarySheetViews: any;
    setsalarySheetViews: Action<Payroll, any>;
    fetchsalarySheetViews: Thunk<Payroll>;
    fetchsalarySheetViewsByDep: Thunk<Payroll, any>;
    fetchsalarySheetViewsByDepNew: Thunk<Payroll, any>;
    saveSalaryProcess: Thunk<Payroll, any>;

    assignSalaryGrade: Thunk<Payroll, any>;
    assignDesignation: Thunk<Payroll, any>;
    updateBank: Thunk<Payroll, any>;
    employeeCustomIdUpdate: Thunk<Payroll, any>;

    salaryProcessList: any;
    setsalaryProcessList: Action<Payroll, any>;
    fetchsalaryProcessList: Thunk<Payroll, any>;
    payEmployeeSalary: Thunk<Payroll, any>;
    batchPayEmployeeSalary: Thunk<Payroll, any>;

    salaryProcessList3: any;
    setsalaryProcessList3: Action<Payroll, any>;
    fetchsalaryProcessList3: Thunk<Payroll, any>;
    salaryProcessListDelete3: Thunk<Payroll, any>;

    salaryProcessList2: any;
    setsalaryProcessList2: Action<Payroll, any>;
    fetchsalaryProcessList2: Thunk<Payroll, any>;

    viewForSalaryPayment: any;
    setviewForSalaryPayment: Action<Payroll, any>;
    fetchviewForSalaryPayment: Thunk<Payroll, any>;

    bankAdviseContentView: any;
    setbankAdviseContentView: Action<Payroll, any>;
    fetchbankAdviseContentView: Thunk<Payroll>;
    saveBankAdviseContent: Thunk<Payroll, any>;

    bankAdviseListView: any;
    setbankAdviseListView: Action<Payroll, any>;
    setbankAdviseListView2: Action<Payroll>;
    fetchbankAdviseListView: Thunk<Payroll, any>;

    salryConfigurationSheetByDepartment: any;
    setsalryConfigurationSheetByDepartment: Action<Payroll, any>;
    fetchsalryConfigurationSheetByDepartment: Thunk<Payroll, any>;
    deleteSalryConfiguration: Thunk<Payroll, any>;
}

export const payrollStore: Payroll = {

    salaryGradeList: [],

    setsalaryGradeList: action((state, payload) => {
        state.salaryGradeList = payload;
    }),

    fetchsalaryGradeList: thunk(async (actions) => {
        const response = await fetchsalaryGradeList();
        if (response.status === 201 || response.status === 200) {
            const body = await response.json();
            if (body?.item?.length > 0) {
                body.item.forEach((element, index) => {
                    element.key = index
                });
                // console.log(body.item)
                actions.setsalaryGradeList(body.item);
            } else {
                notification['warning']({
                    message: 'No data found',
                });
                actions.setsalaryGradeList(body.item);
            }
        } else {
            const body = await response.json();
            notification['error']({
                message: 'Something went wrong',
            });
        }
    }),

    saveSalaryGrade: thunk(async (actions, payload) => {
        const response = await saveSalaryGrade(payload);
        if (response.status === 201 || response.status === 200) {
            const body = await response.json();
            if (body.messageType == 1) {
                notification.success({ message: body.message })
                actions.fetchsalaryGradeList();
            } else {
                notification.error({ message: body.message })
            }
        } else {
            const body = await response.json();
            notification.error({ message: body.message })
        }
    }),

    updateSalaryGrade: thunk(async (actions, payload) => {
        const response = await updateSalaryGrade(payload);
        if (response.status === 201) {
            const body = await response.json();
            if (body.messageType == 1) {
                notification.success({ message: body.message })
                actions.fetchsalaryGradeList();
            } else {
                notification.error({ message: body.message })
            }

        } else {
            const body = await response.json();
            notification.error({ message: 'Something went wrong' })
        }
    }),

    deleteSalaryGrade: thunk(async (actions, payload) => {
        const response = await deleteSalaryGrade(payload);
        if (response.status === 201 || response.status === 200) {
            const body = await response.json();
            if (body.messageType == 1) {
                notification.success({ message: body.message })
                actions.fetchsalaryGradeList();
            } else {
                notification.error({ message: body.message })
            }
        } else {
            const body = await response.json();
            notification.error({ message: 'Something went wrong' })
        }
    }),

    salaryHeadListAddition: [],

    setsalaryHeadListAddition: action((state, payload) => {
        state.salaryHeadListAddition = payload;
    }),

    fetchsalaryHeadListAddition: thunk(async (actions) => {
        const response = await fetchsalaryHeadListAddition();
        if (response.status === 201 || response.status === 200) {
            const body = await response.json();
            if (body?.item?.length > 0) {
                actions.setsalaryHeadListAddition(body.item);
            } else {
                notification['warning']({
                    message: 'No data found',
                });
                actions.setsalaryHeadListAddition(body.item);
            }
        } else {
            const body = await response.json();
            notification['error']({
                message: 'Something went wrong',
            });
        }
    }),

    addSalaryHeadAddition: thunk(async (actions, payload) => {
        const response = await addSalaryHeadAddition(payload);
        if (response.status === 201 || response.status === 200) {
            const body = await response.json();
            if (body.messageType == 1) {
                notification.success({ message: body.message })
                actions.fetchsalaryHeadListAddition();
            } else {
                notification.error({ message: body.message })
            }
        } else {
            const body = await response.json();
            notification.error({ message: body.message })
        }
    }),

    updateSalaryHeadAddition: thunk(async (actions, payload) => {
        const response = await updateSalaryHeadAddition(payload);
        if (response.status === 201) {
            const body = await response.json();
            if (body.messageType == 1) {
                notification.success({ message: body.message })
                actions.fetchsalaryHeadListAddition();
            } else {
                notification.error({ message: body.message })
            }

        } else {
            const body = await response.json();
            notification.error({ message: 'Something went wrong' })
        }
    }),

    deleteSalaryHeadAddition: thunk(async (actions, payload) => {
        const response = await deleteSalaryHeadAddition(payload);
        if (response.status === 201 || response.status === 200) {
            const body = await response.json();
            if (body.messageType == 1) {
                notification.success({ message: body.message })
                actions.fetchsalaryHeadListAddition();
            } else {
                notification.error({ message: body.message })
            }
        } else {
            const body = await response.json();
            notification.error({ message: 'Something went wrong' })
        }
    }),

    salaryHeadListDeduction: [],

    setsalaryHeadListDeduction: action((state, payload) => {
        state.salaryHeadListDeduction = payload;
    }),

    fetchsalaryHeadListDeduction: thunk(async (actions) => {
        const response = await fetchsalaryHeadListDeduction();
        if (response.status === 201 || response.status === 200) {
            const body = await response.json();
            if (body?.item?.length > 0) {
                actions.setsalaryHeadListDeduction(body.item);
            } else {
                notification['warning']({
                    message: 'No data found',
                });
                actions.setsalaryHeadListDeduction(body.item);
            }
        } else {
            const body = await response.json();
            notification['error']({
                message: 'Something went wrong',
            });
        }
    }),

    addSalaryHeadDeduction: thunk(async (actions, payload) => {
        const response = await addSalaryHeadDeduction(payload);
        if (response.status === 201 || response.status === 200) {
            const body = await response.json();
            if (body.messageType == 1) {
                notification.success({ message: body.message })
                actions.fetchsalaryHeadListDeduction();
            } else {
                notification.error({ message: body.message })
            }
        } else {
            const body = await response.json();
            notification.error({ message: body.message })
        }
    }),

    updateSalaryHeadDeduction: thunk(async (actions, payload) => {
        const response = await updateSalaryHeadDeduction(payload);
        if (response.status === 201) {
            const body = await response.json();
            if (body.messageType == 1) {
                notification.success({ message: body.message })
                actions.fetchsalaryHeadListDeduction();
            } else {
                notification.error({ message: body.message })
            }

        } else {
            const body = await response.json();
            notification.error({ message: 'Something went wrong' })
        }
    }),

    deleteSalaryHeadDeduction: thunk(async (actions, payload) => {
        const response = await deleteSalaryHeadDeduction(payload);
        if (response.status === 201 || response.status === 200) {
            const body = await response.json();
            if (body.messageType == 1) {
                notification.success({ message: body.message })
                actions.fetchsalaryHeadListDeduction();
            } else {
                notification.error({ message: body.message })
            }
        } else {
            const body = await response.json();
            notification.error({ message: 'Something went wrong' })
        }
    }),


    saveSalaryGradeConfiguration: thunk(async (actions, payload) => {
        const response = await saveSalaryGradeConfiguration(payload);
        if (response.status === 201 || response.status === 200) {
            const body = await response.json();
            if (body.messageType == 1) {
                notification.success({ message: body.message })
                // actions.fetchsalaryHeadListAddition();
            } else {
                notification.error({ message: body.message })
            }
        } else {
            const body = await response.json();
            notification.error({ message: body.message })
        }
    }),


    salaryGradeConfigurationList: [],

    setsalaryGradeConfigurationList: action((state, payload) => {
        state.salaryGradeConfigurationList = payload;
    }),

    fetchsalaryGradeConfigurationList: thunk(async (actions) => {
        const response = await fetchsalaryGradeConfigurationList();
        if (response.status === 201 || response.status === 200) {
            const body = await response.json();
            if (body?.item?.length > 0) {
                actions.setsalaryGradeConfigurationList(body.item);
            } else {
                notification['warning']({
                    message: 'No data found',
                });
                actions.setsalaryGradeConfigurationList([]);
            }
        } else {
            const body = await response.json();
            notification['error']({
                message: 'Something went wrong',
            });
        }
    }),

    updateAdditionSalaryGradeConfiguration: thunk(async (actions, payload) => {
        const response = await updateAdditionSalaryGradeConfiguration(payload);
        if (response.status === 201 || response.status === 200) {
            const body = await response.json();
            if (body.messageType == 1) {
                notification.success({ message: body.message })
                actions.fetchsalaryGradeConfigurationList();
            } else {
                notification.error({ message: body.message })
            }
        } else {
            const body = await response.json();
            notification.error({ message: body.message })
        }
    }),

    updateDeductionSalaryGradeConfiguration: thunk(async (actions, payload) => {
        const response = await updateDeductionSalaryGradeConfiguration(payload);
        if (response.status === 201) {
            const body = await response.json();
            if (body.messageType == 1) {
                notification.success({ message: body.message })
                actions.fetchsalaryGradeConfigurationList();
            } else {
                notification.error({ message: body.message })
            }

        } else {
            const body = await response.json();
            notification.error({ message: 'Something went wrong' })
        }
    }),

    deleteAdditionSalaryGradeConfiguration: thunk(async (actions, payload) => {
        const response = await deleteAdditionSalaryGradeConfiguration(payload);
        if (response.status === 201 || response.status === 200) {
            const body = await response.json();
            if (body.messageType == 1) {
                notification.success({ message: body.message })
                actions.fetchsalaryGradeConfigurationList();
            } else {
                notification.error({ message: body.message })
            }
        } else {
            const body = await response.json();
            notification.error({ message: 'Something went wrong' })
        }
    }),
    deleteDeductionSalaryGradeConfiguration: thunk(async (actions, payload) => {
        const response = await deleteDeductionSalaryGradeConfiguration(payload);
        if (response.status === 201 || response.status === 200) {
            const body = await response.json();
            if (body.messageType == 1) {
                notification.success({ message: body.message })
                actions.fetchsalaryGradeConfigurationList();
            } else {
                notification.error({ message: body.message })
            }
        } else {
            const body = await response.json();
            notification.error({ message: 'Something went wrong' })
        }
    }),


    salarySheetViews: [],

    setsalarySheetViews: action((state, payload) => {
        state.salarySheetViews = payload;
    }),

    fetchsalarySheetViews: thunk(async (actions) => {
        const response = await fetchsalarySheetViews();
        if (response.status === 201 || response.status === 200) {
            const body = await response.json();
            if (body?.item?.employeeList?.length > 0) {
                actions.setsalarySheetViews(body.item);
            } else {
                notification['warning']({
                    message: 'No data found',
                });
                actions.setsalarySheetViews(body.item);
            }
        } else {
            const body = await response.json();
            notification['error']({
                message: 'Something went wrong',
            });
        }
    }),    
    fetchsalarySheetViewsByDep: thunk(async (actions, payload) => {
        const response = await fetchsalarySheetViewsByDep(payload);
        if (response.status === 201 || response.status === 200) {
            const body = await response.json();
            if (body?.item?.employeeList?.length > 0) {
                actions.setsalarySheetViews(body.item);
            } else {
                notification['warning']({
                    message: 'No data found',
                });
                actions.setsalarySheetViews(body.item);
            }
        } else {
            const body = await response.json();
            notification['error']({
                message: 'Something went wrong',
            });
        }
    }),    
    fetchsalarySheetViewsByDepNew: thunk(async (actions, payload) => {
        const response = await fetchsalarySheetViewsByDepNew(payload);
        if (response.status === 201 || response.status === 200) {
            const body = await response.json();
            if (body?.item?.employeeList?.length > 0) {
                actions.setsalarySheetViews(body.item);
            } else {
                notification['warning']({
                    message: 'No data found',
                });
                actions.setsalarySheetViews(body.item);
            }
        } else {
            const body = await response.json();
            notification['error']({
                message: 'Something went wrong',
            });
        }
    }),

    saveSalaryProcess: thunk(async (actions, payload) => {
        const response = await saveSalaryProcess(payload);
        if (response.status === 201 || response.status === 200) {
            const body = await response.json();
            if (body.messageType == 1) {
                notification.success({ message: body.message })
                // actions.fetchsalaryHeadListAddition();
            } else {
                notification.error({ message: body.message })
            }
        } else {
            const body = await response.json();
            notification.error({ message: body.message })
        }
    }),

    assignSalaryGrade: thunk(async (actions, payload) => {
        const response = await assignSalaryGrade(payload);
        if (response.status === 201 || response.status === 200) {
            const body = await response.json();
            if (body.messageType == 1) {
                notification.success({ message: body.message })
                // actions.fetchsalaryHeadListAddition();
            } else {
                notification.error({ message: body.message })
            }
        } else {
            const body = await response.json();
            notification.error({ message: body.message })
        }
    }),    
    
    assignDesignation: thunk(async (actions, payload) => {
        const response = await assignDesignation(payload);
        if (response.status === 201 || response.status === 200) {
            const body = await response.json();
            if (body.messageType == 1) {
                notification.success({ message: body.message })
                // actions.fetchsalaryHeadListAddition();
            } else {
                notification.error({ message: body.message })
            }
        } else {
            const body = await response.json();
            notification.error({ message: body.message })
        }
    }),    
    updateBank: thunk(async (actions, payload) => {
        const response = await updateBank(payload);
        if (response.status === 201 || response.status === 200) {
            const body = await response.json();
            if (body.messageType == 1) {
                notification.success({ message: body.message })
                // actions.fetchsalaryHeadListAddition();
            } else {
                notification.error({ message: body.message })
            }
        } else {
            const body = await response.json();
            notification.error({ message: body.message })
        }
    }),    
    
    employeeCustomIdUpdate: thunk(async (actions, payload) => {
        const response = await employeeCustomIdUpdate(payload);
        if (response.status === 201 || response.status === 200) {
            const body = await response.json();
            if (body.messageType == 1) {
                notification.success({ message: body.message })
                // actions.fetchsalaryHeadListAddition();
            } else {
                notification.error({ message: body.message })
            }
        } else {
            const body = await response.json();
            notification.error({ message: body.message })
        }
    }),

    salaryProcessList: [],

    setsalaryProcessList: action((state, payload) => {
        state.salaryProcessList = payload;
    }),

    fetchsalaryProcessList: thunk(async (actions, payload) => {
        const response = await fetchsalaryProcessList(payload);
        if (response.status === 201 || response.status === 200) {
            const body = await response.json();
            if (body?.item?.employeeList?.length > 0) {
                actions.setsalaryProcessList(body.item);
            } else {
                notification['warning']({
                    message: 'No data found',
                });
                actions.setsalaryProcessList(body.item);
            }
        } else {
            const body = await response.json();
            notification['error']({
                message: 'Something went wrong',
            });
        }
    }),

    salaryProcessList3: [],

    setsalaryProcessList3: action((state, payload) => {
        state.salaryProcessList3 = payload;
    }),

    fetchsalaryProcessList3: thunk(async (actions, payload) => {
        const response = await fetchsalaryProcessList3(payload);
        if (response.status === 201 || response.status === 200) {
            const body = await response.json();
            if (body?.item?.employeeList?.length > 0) {
                actions.setsalaryProcessList3(body.item);
            } else {
                notification['warning']({
                    message: 'No data found',
                });
                actions.setsalaryProcessList3(body.item);
            }
        } else {
            const body = await response.json();
            notification['error']({
                message: 'Something went wrong',
            });
        }
    }),      
    
    salryConfigurationSheetByDepartment: [],

    setsalryConfigurationSheetByDepartment: action((state, payload) => {
        state.salryConfigurationSheetByDepartment = payload;
    }),

    fetchsalryConfigurationSheetByDepartment: thunk(async (actions, payload) => {
        const response = await fetchsalryConfigurationSheetByDepartment(payload);
        if (response.status === 201 || response.status === 200) {
            const body = await response.json();
            if (body?.item?.employeeList?.length > 0) {
                actions.setsalryConfigurationSheetByDepartment(body.item);
            } else {
                notification['warning']({
                    message: 'No data found',
                });
                actions.setsalryConfigurationSheetByDepartment(body.item);
            }
        } else {
            notification['error']({
                message: 'Something went wrong',
            });
        }
    }),    

    deleteSalryConfiguration: thunk(async (actions, payload) => {
        const response = await deleteSalryConfiguration(payload.id);
        if (response.status === 201 || response.status === 200) {
            const body = await response.json();
            if (body.messageType == 1) {
                notification.success({ message: body.message })
                actions.fetchsalryConfigurationSheetByDepartment(payload.data);
            } else {
                notification.error({ message: body.message })
            }
        } else {
            const body = await response.json();
            notification.error({ message: 'Something went wrong' })
        }
    }),

    salaryProcessListDelete3: thunk(async (actions, payload) => {
        const response = await salaryProcessListDelete3(payload.id);
        if (response.status === 201 || response.status === 200) {
            const body = await response.json();
            if (body.messageType == 1) {
                notification.success({ message: body.message })
                 actions.fetchsalaryProcessList3(payload.data);
            } else {
                notification.error({ message: body.message })
            }
        } else {
            const body = await response.json();
            notification['error']({
                message: 'Something went wrong',
            });
        }
    }),

    payEmployeeSalary: thunk(async (actions, payload) => {
        const response = await payEmployeeSalary(payload);
        if (response.status === 201 || response.status === 200) {
            const body = await response.json();
            notification.success({ message: body.message })
        } else {
            const body = await response.json();
            notification['error']({
                message: 'Something went wrong',
            });
        }
    }),    
    
    batchPayEmployeeSalary: thunk(async (actions, payload) => {
        const response = await batchPayEmployeeSalary(payload);
        if (response.status === 201 || response.status === 200) {
            const body = await response.json();
            notification.success({ message: body.message })
        } else {
            const body = await response.json();
            notification['error']({
                message: 'Something went wrong',
            });
        }
    }),

    salaryProcessList2: [],

    setsalaryProcessList2: action((state, payload) => {
        state.salaryProcessList2 = payload;
    }),

    fetchsalaryProcessList2: thunk(async (actions, payload) => {
        const response = await fetchsalaryProcessList(payload);
        if (response.status === 201 || response.status === 200) {
            const body = await response.json();
            if (body?.item?.employeeList?.length > 0) {
                actions.setsalaryProcessList2(body.item);
            } else {
                notification['warning']({
                    message: 'No data found',
                });
                actions.setsalaryProcessList2(body.item);
            }
        } else {
            const body = await response.json();
            notification['error']({
                message: 'Something went wrong',
            });
        }
    }),
    viewForSalaryPayment: null,

    setviewForSalaryPayment: action((state, payload) => {
        state.viewForSalaryPayment = payload;
    }),

    fetchviewForSalaryPayment: thunk(async (actions, payload) => {
        const response = await fetchviewForSalaryPayment(payload);
        if (response.status === 201 || response.status === 200) {
            const body = await response.json();
            actions.setviewForSalaryPayment(body.item);
        } else {
            const body = await response.json();
            notification['error']({
                message: 'Something went wrong',
            });
        }
    }),

    bankAdviseContentView: {},

    setbankAdviseContentView: action((state, payload) => {
        state.bankAdviseContentView = payload;
    }),

    fetchbankAdviseContentView: thunk(async (actions) => {
        const response = await fetchbankAdviseContentView();
        if (response.status === 201 || response.status === 200) {
            const body = await response.json();
            if (body?.messageType === 1) {
                actions.setbankAdviseContentView(body.item);
            } else {
                notification['warning']({
                    message: 'No data found',
                });
                actions.setbankAdviseContentView({});
            }
        } else {
            actions.setbankAdviseContentView({});
            notification['error']({
                message: 'Something went wrong',
            });
        }
    }),

    saveBankAdviseContent: thunk(async (actions, payload) => {
        const response = await saveBankAdviseContent(payload);
        if (response.status === 201 || response.status === 200) {
            const body = await response.json();
            if (body.messageType == 1) {
                notification.success({ message: body.message })
                actions.fetchbankAdviseContentView();
            } else {
                notification.error({ message: body.message })
            }
        } else {
            const body = await response.json();
            notification.error({ message: body.message })
        }
    }),

    bankAdviseListView: null,

    setbankAdviseListView: action((state, payload) => {
        state.bankAdviseListView = payload;
    }),    
    
    setbankAdviseListView2: action((state) => {
        state.bankAdviseListView = null;
    }),

    fetchbankAdviseListView: thunk(async (actions, payload) => {
        const response = await fetchbankAdviseListView(payload);
        if (response.status === 201 || response.status === 200) {
            const body = await response.json();
            if (body?.messageType === 1) {
                if (body?.item?.employeeList?.length > 0) {
                    actions.setbankAdviseListView(body.item);
                }
                else {
                    notification['warning']({
                        message: 'No data found',
                    });
                    actions.setbankAdviseListView(null);
                }
            } else {
                notification['warning']({
                    message: 'No data found',
                });
                actions.setbankAdviseListView(null);
            }
        } else {
            actions.setbankAdviseListView(null);
            notification['error']({
                message: 'Something went wrong',
            });
        }
    }),

}
