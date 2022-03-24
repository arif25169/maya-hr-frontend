import { notification } from 'antd';
import { Action, Thunk, thunk, action } from 'easy-peasy';
import { inputEmployeeAttendance, updateAttendance } from '../../../http/attendance/attendance';

export interface Attendance {
    inputEmployeeAttendance: Thunk<Attendance, any>;
    updateAttendance: Thunk<Attendance, any>;

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
}
