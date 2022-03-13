import React, { useEffect } from 'react'
import { useState } from 'react';
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import { Button, Card, Col, message, Row, Steps, Form, Input, DatePicker, Select, InputNumber, Table, Space, Tooltip, Popconfirm, Tabs} from 'antd'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { userStore } from '../../../store/states/user/user';
import EducationAndTraning from './employeeInfoTabs/EducationInformation';
import TrainingInfo from './TrainingInfo';
import BankInfoUpdate from './employeeInfoTabs/BankInfoUpdate';
import BasicInfoUpdate from './employeeInfoTabs/BasicInfoUpdate';

export default function EmployeeInformation() {

    const { TabPane } = Tabs;
    
    const [activeTab, setActiveTab] = React.useState<any>("1");

    return (
        <>
            <Card title="Employee Information">
                <Row>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24}} lg={{ span: 24}} xl={{ span: 24}}>
                        <Tabs defaultActiveKey="1" onChange={(e) => { setActiveTab(e) }} type="card">
                            <TabPane tab="Basic" key="1">
                                {activeTab === "1" && <BasicInfoUpdate /> }
                            </TabPane>
                            <TabPane tab="Bank" key="2">
                                {activeTab === "2" && <BankInfoUpdate /> }
                            </TabPane>
                            <TabPane tab="Education" key="3">
                                {activeTab === "3" && <EducationAndTraning /> }
                            </TabPane>
                            <TabPane tab="Training" key="4">
                                {activeTab === "4" && <TrainingInfo /> }
                            </TabPane>
                            <TabPane tab="Employment" key="5">
                                Content of Tab Pane 5
                            </TabPane>
                            <TabPane tab="Other Information" key="6">
                                Content of Tab Pane 6
                            </TabPane>
                            <TabPane tab="Photograph" key="7">
                                Content of Tab Pane 7
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
            </Card>
        </>
    )
}