import React from 'react'
import { Card, Tabs } from 'antd';
import EmployeeAttendanceMonthWiseSingleReport from './EmployeeAttendanceMonthWiseSingleReport';
import EmployeeAttendanceMonthWiseAllReport from './EmployeeAttendanceMonthWiseAllReport';


export default function EmployeeAttendanceMonthWiseReport(props) {

    const { TabPane } = Tabs;

    return (
        <>
            <Card title="Month Wise Attendance">
                <Tabs defaultActiveKey="1">
                    <TabPane tab="All" key="1">
                        <EmployeeAttendanceMonthWiseAllReport />
                    </TabPane>
                    <TabPane tab="Single" key="2">
                        <EmployeeAttendanceMonthWiseSingleReport />
                    </TabPane>

                </Tabs>
            </Card>
        </>
    )
}