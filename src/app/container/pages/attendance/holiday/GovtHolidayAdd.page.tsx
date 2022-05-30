import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Divider, Form, Input, InputNumber, Popconfirm, Row, Select, Space, Tooltip, message, Modal, Checkbox, Skeleton, } from 'antd'
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { useStoreActions, useStoreState } from '../../../../store/hooks/easyPeasy';
import 'react-multi-date-picker/styles/colors/green.css';
import DatePicker from "react-multi-date-picker"
import { DateObject } from 'react-multi-date-picker';
import DatePanel from "react-multi-date-picker/plugins/date_panel";

const format = "YYYY-MM-DD";
export default function GovtHoliday() {
    const creategovtHolidayList = useStoreActions((state) => state.attendance.creategovtHolidayList);
    const [createForm] = Form.useForm();
    const createSubmitForm = (value) => {
        let govtHolyDays = dates?.map(item => item.format());
        let payload = {
            description: value.description,
            govtHolyDays: govtHolyDays
        };
        creategovtHolidayList(payload);
        createForm.resetFields();

    }
    const [dates, setDates] = useState<any>([]);
    return (
        <>
            <Row>
                <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24 }} lg={{ span: 12, offset: 4 }} xl={{ span: 12, offset: 4 }}>
                    <Form
                        layout="vertical"
                        id="sessionInfo"
                        onFinish={createSubmitForm}
                        form={createForm}
                        style={{ height: 500 }}
                    >
                        <Row>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 12 }}>
                                <Form.Item
                                    name="description"
                                    label="Description"
                                    className="title-Text"
                                    rules={[
                                        { required: true, message: "Please write description" },
                                    ]}
                                >
                                    <Input.TextArea placeholder='Holiday Description' style={{ height: 100 }} />
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 12 }}></Col>

                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 12 }}>
                                <Form.Item
                                    name="dayName"
                                    label="Select Date(s)"
                                    className="title-Text"
                                    rules={[
                                        { required: true, message: "Please select date" },
                                    ]}
                                >
                                    <DatePicker
                                        value={dates}
                                        onChange={setDates}
                                        multiple
                                        sort
                                        placeholder='Select Dates'
                                        format={format}
                                        calendarPosition="bottom-center"
                                        plugins={[<DatePanel />]}
                                        className="green"
                                        style={{ width: 250, minHeight: 40, borderRadius: 0, borderColor: '#03D665' }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 12 }}></Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 9 }} xl={{ span: 9 }}></Col>
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 3 }} xl={{ span: 3 }}>
                                <Space size="small" >
                                    <Button type="primary" htmlType="submit" icon={<SaveOutlined />} >
                                        Save
                                    </Button>
                                </Space>
                            </Col>
                        </Row>

                    </Form>
                </Col>
            </Row>


        </>
    )

}