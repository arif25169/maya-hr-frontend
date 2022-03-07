import { notification } from 'antd';
import { Action, Thunk, thunk, action } from 'easy-peasy';
import { addSalaryHeadAddition, addSalaryHeadDeduction, deleteAdditionSalaryGradeConfiguration, deleteDeductionSalaryGradeConfiguration, deleteSalaryGrade, deleteSalaryHeadAddition, deleteSalaryHeadDeduction, fetchsalaryGradeConfigurationList, fetchsalaryGradeList, fetchsalaryHeadListAddition, fetchsalaryHeadListDeduction, fetchsalarySheetViews, saveSalaryGrade, saveSalaryGradeConfiguration, saveSalaryProcess, updateAdditionSalaryGradeConfiguration, updateDeductionSalaryGradeConfiguration, updateSalaryGrade, updateSalaryHeadAddition, updateSalaryHeadDeduction } from '../../../http/payroll/payroll';

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

}
