import React, { useEffect } from 'react'

import { Card, Tabs } from 'antd'

import SalaryGradeConfigure from './SalaryGradeConfigureAdd';
import SalaryGradeConfigureList from './SalaryGradeConfigureList';


export default function SalaryGradeConfigurePage() {
    const { TabPane } = Tabs;

    return (
        <>
            <Card title="Configure Salary">
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Add" key="1">
                        <SalaryGradeConfigure />
                    </TabPane>
                    <TabPane tab="List" key="2">
                        <SalaryGradeConfigureList />
                    </TabPane>
                </Tabs>
            </Card>
        </>
    )
}