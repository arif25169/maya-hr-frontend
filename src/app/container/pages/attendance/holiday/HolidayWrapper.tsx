import React from 'react'
import { Card, Tabs } from 'antd';
import WeeklyHoliday from './WeeklyHoliday.page';
import GovtHolidayWrapper from './GovtHolidayWrapper';


export default function HolidayWrapper(props) {

    const { TabPane } = Tabs;
    const [activeTab, setActiveTab] = React.useState<any>("1");

    return (
        <>
            <Card title="Holiday">
                <Tabs defaultActiveKey="1" onChange={(e) => { setActiveTab(e) }}>
                    <TabPane tab="Weekly Holiday" key="1">
                        {activeTab === "1" && <WeeklyHoliday />}
                    </TabPane>
                    <TabPane tab="Govt Holiday" key="2">
                        {activeTab === "2" && <GovtHolidayWrapper />}
                    </TabPane>
                </Tabs>
            </Card>
        </>
    )
}