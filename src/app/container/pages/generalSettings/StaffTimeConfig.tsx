import React, { useEffect } from 'react'
import { useState } from 'react';
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import { Button, Card, Col, message, Row, Steps, Form, Input, DatePicker, Select, InputNumber, Table, Space, Tooltip, Popconfirm, Modal} from 'antd'
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import TableView from '../../../contents/AntTableResponsive';

export default function StaffTimeConfig() {
    
    const [staffForm] = Form.useForm();

    const staffSubmit = (value) => {
        
    }
    return (
        <>
            <Card title="Staff Attendance Time Configuration">
                <Row>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }}>
                        <Card title="Staff List" className='box-shadow-none'>

                        </Card>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }}>
                        <Card title="Time and Day" className='box-shadow-none'>
                        <Form
                                layout="vertical"
                                onFinish={staffSubmit}
                                id="basic-info"
                                form={staffForm}
                            >
                                <Row gutter={8}>
                                    <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                                        <Form.Item
                                            name="inTime"
                                            label="In Time"
                                            className="title-Text"
                                            rules={[
                                                { required: true, message: "Please select in time" },
                                            ]}
                                        >
                                            <Input placeholder="In Time" type={'time'} />

                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                                        <Form.Item
                                            name="outTime"
                                            label="Out Time"
                                            className="title-Text"
                                            rules={[
                                                { required: true, message: "Please select out time" },
                                            ]}
                                        >
                                            <Input placeholder="Out Time" type={'time'} />

                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                                        <Form.Item
                                            name="delayTime"
                                            label="Delay Time"
                                            className="title-Text"
                                            rules={[
                                                { required: true, message: "Please select delay time" },
                                            ]}
                                        >
                                            <Input placeholder="Delay Time" type={'time'} />

                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                                        <Form.Item
                                            name="dayNames"
                                            label="Select Day(s)"
                                            className="title-Text"
                                            rules={[
                                                { required: true, message: "Please select day(s)" },
                                            ]}
                                        >
                                            <Select placeholder='Select Days' mode='multiple'>
                                                <Select.Option value="Saturday">Saturday</Select.Option>
                                                <Select.Option value="Sunday">Sunday</Select.Option>
                                                <Select.Option value="Monday">Monday</Select.Option>
                                                <Select.Option value="Tuesday">Tuesday</Select.Option>
                                                <Select.Option value="Wednesday">Wednesday</Select.Option>
                                                <Select.Option value="Thursday">Thursday</Select.Option>
                                                <Select.Option value="Friday">Friday</Select.Option>
                                            </Select>

                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                                        <Space size="small" >
                                            <Button type="primary" htmlType="submit" style={{ height: 40 }} icon={<SaveOutlined />}>
                                                Save
                                            </Button>
                                        </Space>
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Card>
        </>
    )
}