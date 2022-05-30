import React from 'react'
import { Card, Tabs } from 'antd';
import EnbaledEmployeeMapping from './EnbaledEmployeeMapping';
import DisabledEmployeeMapping from './DisabledEmployeeMapping';


export default function EmployeeIdMappingWrapper(props) {

    const { TabPane } = Tabs;

    return (
        <>
            <Card title="ID Mapping">
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Enabled" key="1">
                        <EnbaledEmployeeMapping />
                    </TabPane>
                    <TabPane tab="Disabled" key="2">
                        <DisabledEmployeeMapping />
                    </TabPane>

                </Tabs>
            </Card>
        </>
    )
}