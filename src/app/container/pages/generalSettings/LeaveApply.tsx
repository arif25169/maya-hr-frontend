import React from 'react'
import { Card, Tabs } from 'antd';
import LeaveApplyApply from './LeaveApplyApply';
import LeaveApplyList from './LeaveApplyList';


export default function LeaveApply(props) {

    const { TabPane } = Tabs;
    const [activeTab, setActiveTab] = React.useState<any>("1");

    return (
        <>
            <Card title="Apply Leave">
                <Tabs defaultActiveKey="1" onChange={(e) => { setActiveTab(e) }}>
                    <TabPane tab="Apply Leave" key="1">
                        {activeTab === "1" && <LeaveApplyApply />}
                    </TabPane>
                    <TabPane tab="Applied Leave List" key="2">
                        {activeTab === "2" && <LeaveApplyList />}
                    </TabPane>
                </Tabs>
            </Card>
        </>
    )
}