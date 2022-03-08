import React, { useEffect } from 'react'
import { useState } from 'react';
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import { Button, Card, Col, message, Row, Steps, Form, Input, DatePicker, Select, InputNumber, Table, Space} from 'antd'
import moment from 'moment';
import { PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { monitorEventLoopDelay } from 'perf_hooks';

export default function TrainingInfo() {

    const [form] = Form.useForm();
    const [updateForm] = Form.useForm();
    const [showTrainingFrom, setShowTrainingFrom] = useState<any>(false); 
    const [addButtonDisable, setAddButtonDisable] = useState<any>(false);
    const saveEmployeeTrainingInfo = useStoreActions((state) => state.hr.saveEmployeeTrainingInfo);
    const fetchEmployeeTrainingInfoList = useStoreActions((state) => state.hr.fetchEmployeeTrainingInfoList);
    const employeeTrainingInfoList = useStoreState((state) => state.hr.employeeTrainingInfoList);


    useEffect(() => {
        fetchEmployeeTrainingInfoList(localStorage.getItem('employeeId'))
    }, []);

    const trainingInformationSubmit = (value) => {
        let postdata:any = {
            country: value.countryName,
            duration: value.duration,
            employeeId: localStorage.getItem('employeeId'),
            instituteName: value.institute,
            location: value.location,
            topicsCovered: value.topicsCovered,
            trainingTitle: value.trainingTitle,
            trainingYear:moment(value.trainingYear).year()
          }
          saveEmployeeTrainingInfo(postdata);
          
    } 

    const trainingInfoFormShowHide = () => {
        setShowTrainingFrom(true);
        setAddButtonDisable(true);
    }

    const onClickCancel = () => {
        setShowTrainingFrom(false);
    }

    return (
        <>
            <Card title="Training Info">
                {showTrainingFrom == true ?
                    <Form
                            layout="vertical"
                            id="educationInformation"
                            form={form}
                            onFinish={trainingInformationSubmit}
                        >
                        <Row>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                                <Form.Item
                                    name="trainingTitle"
                                    label="Training Title"
                                    className="title-Text"
                                    rules={[
                                        { required: true, message: "Please Write Training Title" },
                                    ]}
                                >
                                    <Input placeholder="Write Training Title" />
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                                <Form.Item
                                    name="countryName"
                                    label="Country Name"
                                    className="title-Text"
                                    rules={[
                                        { required: true, message: "Please Write Country Name" },
                                    ]}
                                >
                                    <Input placeholder="Write Country Name" />
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                                <Form.Item
                                    name="topicsCovered"
                                    label="Topics Covered"
                                    className="title-Text"
                                    rules={[
                                        { required: true, message: "Please Write Topics Covered" },
                                    ]}
                                >
                                    <Input placeholder="Write Topics Covered" />
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                                <Form.Item
                                    name="trainingYear"
                                    label="Training Year"
                                    className="title-Text"
                                    rules={[
                                        { required: true, message: "Please Select Training Year" },
                                    ]}
                                >
                                    <DatePicker picker="year" style={{ width: "100%" }}/>
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                                <Form.Item
                                    name="institute"
                                    label="Institute"
                                    className="title-Text"
                                    rules={[
                                        { required: true, message: "Please Write Institute" },
                                    ]}
                                >
                                    <Input placeholder="Write Instiute" />
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                                <Form.Item
                                    name="duration"
                                    label="Duration"
                                    className="title-Text"
                                    rules={[
                                        { required: true, message: "Please Write Duration" },
                                    ]}
                                >
                                    <InputNumber placeholder="Write Duration" />
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6}} lg={{ span: 6}} xl={{ span: 6}}>
                                <Form.Item
                                    name="location"
                                    label="location"
                                    className="title-Text"
                                    rules={[
                                        { required: true, message: "Please Write Location" },
                                    ]}
                                >
                                    <Input placeholder="Write Location" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24}} lg={{ span: 24}} xl={{ span: 24}}>
                                <Space size="small" style={{ float: "right" }} >
                                    <Button type="primary" htmlType="submit" icon={<SaveOutlined />} >
                                        Save
                                    </Button>
                                    <Button type="primary" danger onClick={() => onClickCancel()}>
                                        Cancel
                                    </Button>
                                </Space>
                            </Col>
                            
                        </Row>
                    </Form>
                : ""}
                <Button type="primary"  icon={<PlusOutlined />} onClick={() => trainingInfoFormShowHide()} disabled={addButtonDisable == true ? true : false}>
                    Add Education (If Required)
                </Button>
            </Card>
        </>
    )
}