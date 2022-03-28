import React, { useEffect } from 'react'
import LeaveAssignAdd from './LeaveAssignAdd'
import LeaveAssignList from './LeaveAssignList'
import { Card, Tabs } from 'antd'




export default function LeaveAssign() {
    const { TabPane } = Tabs;

    return (
        <>
            <Card title="Leave Assign">
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Add" key="1">
                        <LeaveAssignAdd />
                    </TabPane>
                    <TabPane tab="List" key="2">
                        <LeaveAssignList />
                    </TabPane>
                </Tabs>
            </Card>
        </>
    )
}