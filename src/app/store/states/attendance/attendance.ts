import { notification } from 'antd';
import { Action, Thunk, thunk, action } from 'easy-peasy';
import { creategovtHolidayList, createHolidayList, deleteDisabledEmployee, deletegovtHolidayList, deleteHolidayList, deviceprocess, fetchattendanceDetailsAllEmployee, fetchdisabledEmployee, fetchemployeeDateWiseAttReport, fetchemployeeMonthWiseAttReport, fetchenabledEmployee, fetchgovtHolidayList, fetchweeklyHolidayList, inputEmployeeAttendance, saveBatchIdmapping, saveSingleIdmapping, updateAttendance } from '../../../http/attendance/attendance';

export interface Attendance {
    inputEmployeeAttendance: Thunk<Attendance, any>;
    updateAttendance: Thunk<Attendance, any>;
    deviceprocess: Thunk<Attendance, any>;
    enabledEmployee: any;
    setenabledEmployee: Action<Attendance, any>;
    fetchenabledEmployee: Thunk<Attendance>

    saveSingleIdmapping: Thunk<Attendance, any>;
    saveBatchIdmapping: Thunk<Attendance, any>;

    disabledEmployee: any;
    setdisabledEmployee: Action<Attendance, any>;
    fetchdisabledEmployee: Thunk<Attendance>
    deleteDisabledEmployee: Thunk<Attendance, any>;

    loading: boolean;
    setLoading: Action<Attendance, boolean>;

    fetchweeklyHolidayList: Thunk<Attendance>;
    createHolidayList: Thunk<Attendance, any>;
    deleteHolidayList: Thunk<Attendance, any>;
    weeklyHolidayList: any;
    setweeklyHolidayList: Action<Attendance, any>;

    fetchgovtHolidayList: Thunk<Attendance, any>;
    creategovtHolidayList: Thunk<Attendance, any>;
    deletegovtHolidayList: Thunk<Attendance, any>;
    govtHolidayList: any;
    setgovtHolidayList: Action<Attendance, any>;

    employeeDateWiseAttReport: any;
    setemployeeDateWiseAttReport: Action<Attendance, any>;
    fetchemployeeDateWiseAttReport: Thunk<Attendance, any>

    employeeMonthWiseAttReport: any;
    setemployeeMonthWiseAttReport: Action<Attendance, any>;
    fetchemployeeMonthWiseAttReport: Thunk<Attendance, any>

    attendanceDetailsAllEmployee: any;
    setattendanceDetailsAllEmployee: Action<Attendance, any>;
    fetchattendanceDetailsAllEmployee: Thunk<Attendance, any>
}

export const attendanceStore: Attendance = {
    loading: false,
    setLoading: action((state, payload) => {
        state.loading = payload;
    }),
    inputEmployeeAttendance: thunk(async (actions, payload) => {
        const response = await inputEmployeeAttendance(payload);
        if (response.status === 201 || response.status === 200) {
            const body: any = await response.json();
            if (body.messageType == 1) {
                notification.success({ message: body.message })
            } else {
                notification.error({ message: body.message })
            }
        } else {
            //const body = await response.json();
            notification.error({ message: "Something went wrong" })
        }
    }),
    updateAttendance: thunk(async (actions, payload) => {
        const response = await updateAttendance(payload);
        if (response.status === 201 || response.status === 200) {
            const body: any = await response.json();
            if (body.messageType == 1) {
                notification.success({ message: body.message })
            } else {
                notification.error({ message: body.message })
            }
        } else {
            //const body = await response.json();
            notification.error({ message: "Something went wrong" })
        }
    }),
    deviceprocess: thunk(async (actions, payload) => {
        const response = await deviceprocess(payload);
        if (response.status === 201 || response.status === 200) {
            const body: any = await response.json();
            if (body.messageType == 1) {
                notification.success({ message: body.message })
            } else {
                notification.error({ message: body.message })
            }
        } else {
            //const body = await response.json();
            notification.error({ message: "Something went wrong" })
        }
    }),

    enabledEmployee: null,
    fetchenabledEmployee: thunk(async (actions) => {
        const response = await fetchenabledEmployee();
        if (response.status === 201 || response.status === 200) {

            const body = await response.json();
            actions.setenabledEmployee(body?.item);
        } else {
            actions.setenabledEmployee(null);

        }
    }),

    setenabledEmployee: action((state, payload) => {
        state.enabledEmployee = payload;
    }),

    saveSingleIdmapping: thunk(async (actions, payload) => {
        const response = await saveSingleIdmapping(payload);
        if (response.status === 201 || response.status === 200) {
            const body = await response.json();
            if (body.messageType == 1) {
                actions.fetchenabledEmployee();
                notification.success({ message: body.message })
            } else {
                notification.error({ message: body.message })
            }

        } else {
            notification.error({ message: "Something went wrong" })
        }
    }),

    saveBatchIdmapping: thunk(async (actions, payload) => {
        const response = await saveBatchIdmapping(payload);
        if (response.status === 201 || response.status === 200) {
            const body = await response.json();
            if (body.messageType == 1) {
                actions.fetchenabledEmployee();
                notification.success({ message: body.message })
            } else {
                notification.error({ message: body.message })
            }

        } else {
            notification.error({ message: "Something went wrong" })
        }
    }),

    disabledEmployee: null,
    fetchdisabledEmployee: thunk(async (actions) => {
        const response = await fetchdisabledEmployee();
        if (response.status === 201 || response.status === 200) {
            const body = await response.json();
            actions.setdisabledEmployee(body?.item);
        } else {
            actions.setdisabledEmployee(null);
        }
    }),

    setdisabledEmployee: action((state, payload) => {
        state.disabledEmployee = payload;
    }),

    deleteDisabledEmployee: thunk(async (actions, payload) => {
        const response = await deleteDisabledEmployee(payload);
        if (response.status === 201 || response.status === 200) {
            const body = await response.json();
            if (body.messageType == 1) {
                actions.fetchdisabledEmployee();
                notification.success({ message: body.message })
            } else {
                notification.error({ message: body.message })
            }

        } else {
            notification.error({ message: "Something went wrong" })
        }
    }),

    ///////////
    weeklyHolidayList: null,

    fetchweeklyHolidayList: thunk(async (actions) => {
        actions.setLoading(true);
        const response = await fetchweeklyHolidayList();
        if (response.status === 201 || response.status === 200) {
            const body = await response.json();
            actions.setLoading(false);


            actions.setweeklyHolidayList(body.item);
        } else {
            const body = await response.json();
            actions.setLoading(false);
        }
    }),
    setweeklyHolidayList: action((state, payload) => {
        state.weeklyHolidayList = payload;
    }),

    createHolidayList: thunk(async (actions, payload) => {
        const response = await createHolidayList(payload);
        if (response.status === 201 || response.status === 200) {
            const body = await response.json();
            if (body.messageType == 1) {
                notification.success({ message: body.message })
                actions.fetchweeklyHolidayList();
            } else {
                notification.error({ message: body.message })
            }
        } else {
            const body = await response.json();
            notification.error({ message: body.message })
        }
    }),


    deleteHolidayList: thunk(async (actions, payload) => {
        const response = await deleteHolidayList(payload);
        if (response.status === 201 || response.status === 200) {
            const body = await response.json();
            if (body.messageType == 1) {
                notification.success({ message: body.message })
                actions.fetchweeklyHolidayList();
            } else {
                notification.error({ message: body.message })
            }
        } else {
            const body = await response.json();
            notification.error({ message: body.statusText })
        }
    }),
    //////////////

    ///////////
    govtHolidayList: null,

    fetchgovtHolidayList: thunk(async (actions, payload) => {
        actions.setLoading(true);
        const response = await fetchgovtHolidayList(payload);
        if (response.status === 201 || response.status === 200) {
            const body = await response.json();
            if (body?.item?.length > 0) {
                actions.setgovtHolidayList(body.item);
            } else {
                actions.setgovtHolidayList([]);
                notification.warning({ message: "No data found" })
            }
            actions.setLoading(false);
        } else {
            const body = await response.json();
            actions.setLoading(false);
        }
    }),
    setgovtHolidayList: action((state, payload) => {
        state.govtHolidayList = payload;
    }),

    creategovtHolidayList: thunk(async (actions, payload) => {
        const response = await creategovtHolidayList(payload);
        if (response.status === 201 || response.status === 200) {
            const body = await response.json();
            if (body.messageType == 1) {
                notification.success({ message: body.message })
                //actions.fetchgovtHolidayList();
            } else {
                notification.error({ message: body.message })
            }
        } else {
            const body = await response.json();
            notification.error({ message: body.message })
        }
    }),


    deletegovtHolidayList: thunk(async (actions, payload) => {
        const response = await deletegovtHolidayList(payload?.id);
        if (response.status === 201 || response.status === 200) {
            const body = await response.json();
            if (body.messageType == 1) {
                notification.success({ message: body.message })
                actions.fetchgovtHolidayList({ year: payload?.year });
            } else {
                notification.error({ message: body.message })
            }
        } else {
            const body = await response.json();
            notification.error({ message: body.statusText })
        }
    }),
    //////////////

    employeeDateWiseAttReport: [],
    fetchemployeeDateWiseAttReport: thunk(async (actions, payload) => {
        actions.setLoading(true);
        const response = await fetchemployeeDateWiseAttReport(payload);
        if (response.status === 201 || response.status === 200) {
            actions.setLoading(false);
            const body = await response.json();
            if (body.item?.length > 0) {
                actions.setemployeeDateWiseAttReport(body?.item);
            } else {
                notification.error({
                    message: "No data found"
                })
                actions.setemployeeDateWiseAttReport([]);
            }
        } else {
            notification.error({
                message: "Something went wrong"
            })
            actions.setLoading(false);
        }
    }),

    setemployeeDateWiseAttReport: action((state, payload) => {
        state.employeeDateWiseAttReport = payload;
    }),
    employeeMonthWiseAttReport: [],
    fetchemployeeMonthWiseAttReport: thunk(async (actions, payload) => {
        actions.setLoading(true);
        const response = await fetchemployeeMonthWiseAttReport(payload);
        if (response.status === 201 || response.status === 200) {
            actions.setLoading(false);
            const body = await response.json();
            if (body.item?.details?.length > 0) {
                actions.setemployeeMonthWiseAttReport(body?.item);
            } else {
                notification.error({
                    message: "No data found"
                })
                actions.setemployeeMonthWiseAttReport([]);
            }
        } else {
            notification.error({
                message: "Something went wrong"
            })
            actions.setLoading(false);
        }
    }),

    setemployeeMonthWiseAttReport: action((state, payload) => {
        state.employeeMonthWiseAttReport = payload;
    }),

    attendanceDetailsAllEmployee: [],
    fetchattendanceDetailsAllEmployee: thunk(async (actions, payload) => {
        actions.setLoading(true);
        const response = await fetchattendanceDetailsAllEmployee(payload);
        if (response.status === 201 || response.status === 200) {
            actions.setLoading(false);
            const body = await response.json();
            if (body.item?.staffList?.length > 0) {
                actions.setattendanceDetailsAllEmployee(body?.item);
            } else {
                notification.error({
                    message: "No data found"
                })
                actions.setattendanceDetailsAllEmployee([]);
            }
        } else {
            notification.error({
                message: "Something went wrong"
            })
            actions.setLoading(false);
        }
    }),

    setattendanceDetailsAllEmployee: action((state, payload) => {
        state.attendanceDetailsAllEmployee = payload;
    }),


}
