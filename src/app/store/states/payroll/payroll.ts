import { notification } from 'antd';
import { Action, Thunk, thunk, action } from 'easy-peasy';
import { addSalaryHeadAddition, addSalaryHeadDeduction, assignSalaryGrade, deleteAdditionSalaryGradeConfiguration, deleteDeductionSalaryGradeConfiguration, deleteSalaryGrade, deleteSalaryHeadAddition, deleteSalaryHeadDeduction, fetchbankAdviseContentView, fetchbankAdviseListView, fetchsalaryGradeConfigurationList, fetchsalaryGradeList, fetchsalaryHeadListAddition, fetchsalaryHeadListDeduction, fetchsalaryProcessList, fetchsalarySheetViews, saveBankAdviseContent, saveSalaryGrade, saveSalaryGradeConfiguration, saveSalaryProcess, updateAdditionSalaryGradeConfiguration, updateDeductionSalaryGradeConfiguration, updateSalaryGrade, updateSalaryHeadAddition, updateSalaryHeadDeduction } from '../../../http/payroll/payroll';

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
    saveSalaryProcess: Thunk<Payroll, any>;

    assignSalaryGrade: Thunk<Payroll, any>;

    salaryProcessList: any;
    setsalaryProcessList: Action<Payroll, any>;
    fetchsalaryProcessList: Thunk<Payroll, any>;

    bankAdviseContentView: any;
    setbankAdviseContentView: Action<Payroll, any>;
    fetchbankAdviseContentView: Thunk<Payroll>;
    saveBankAdviseContent: Thunk<Payroll, any>;

    bankAdviseListView: any;
    setbankAdviseListView: Action<Payroll, any>;
    fetchbankAdviseListView: Thunk<Payroll, any>;
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

    fetchbankAdviseListView: thunk(async (actions, payload) => {
        const response = await fetchbankAdviseListView(payload);
        if (response.status === 201 || response.status === 200) {
            const body = await response.json();
            if (body?.messageType === 1) {
            if (body?.item?.employeeList?.length>0) {
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
