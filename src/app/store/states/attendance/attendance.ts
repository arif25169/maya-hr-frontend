import { notification } from 'antd';
import { Action, Thunk, thunk, action } from 'easy-peasy';
import { deleteDisabledEmployee, deviceprocess, fetchdisabledEmployee, fetchenabledEmployee, inputEmployeeAttendance, saveBatchIdmapping, saveSingleIdmapping, updateAttendance } from '../../../http/attendance/attendance';

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
}

export const attendanceStore: Attendance = {

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

}
