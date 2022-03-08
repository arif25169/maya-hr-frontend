import React, { useEffect } from 'react'
import { useState } from 'react';
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import { Button, Card, Col, message, Row, Steps, Form, Input, DatePicker, Select, InputNumber, Table, Space, Tooltip, Popconfirm, Tabs} from 'antd'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { userStore } from '../../../store/states/user/user';
import EducationAndTraning from './employeeInfoTabs/EducationAndTraning';
import TrainingInfo from './TrainingInfo';

export default function EmployeeInformation() {

    const { TabPane } = Tabs;
    
    const callback = (key) => {
        console.log(key);
    }

    return (
        <>
            <Card title="Employee Information">
                <Row>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24}} lg={{ span: 24}} xl={{ span: 24}}>
                        <Tabs onChange={callback} type="card">
                            <TabPane tab="Personal" key="1">
                                Content of Tab Pane 1
                            </TabPane>
                            <TabPane tab="Education" key="2">
                                <EducationAndTraning />
                            </TabPane>
                            <TabPane tab="Training" key="3">
                                <TrainingInfo />
                            </TabPane>
                            <TabPane tab="Employment" key="4">
                                Content of Tab Pane 4
                            </TabPane>
                            <TabPane tab="Other Information" key="5">
                                Content of Tab Pane 5
                            </TabPane>
                            <TabPane tab="Photograph" key="6">
                                Content of Tab Pane 6
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
            </Card>
        </>
    )
}