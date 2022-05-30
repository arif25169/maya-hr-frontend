import React from 'react'
import { Card, Tabs } from 'antd';
import GovtHolidayAdd from './GovtHolidayAdd.page';
import GovtHolidayList from './GovtHolidayList.page';


export default function GovtHolidayWrapper(props) {

    const { TabPane } = Tabs;
    const [activeTab, setActiveTab] = React.useState<any>("1");

    return (
        <>
            <Card>
                <Tabs defaultActiveKey="1" onChange={(e) => { setActiveTab(e) }}>
                    <TabPane tab="Add" key="1">
                        {activeTab === "1" && <GovtHolidayAdd />}
                    </TabPane>
                    <TabPane tab="List" key="2">
                        <GovtHolidayList />
                    </TabPane>
                </Tabs>
            </Card>
        </>
    )
}