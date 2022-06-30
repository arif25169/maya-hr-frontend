import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Divider, Form, Input, InputNumber, Popconfirm, Row, Select, Space, Tooltip, message, Modal, Checkbox, Skeleton, } from 'antd'
import { DeleteOutlined, EditOutlined, SaveOutlined, SearchOutlined } from '@ant-design/icons';
import TableView from '../../../contents/AntTableResponsive';
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import 'react-multi-date-picker/styles/colors/green.css';
import DatePicker from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel";
const { Option } = Select;
const format = "YYYY-MM-DD";
var year = (new Date().getFullYear()) * 1;

export default function LeaveApplyApply() {
    const leaveCategoryList = useStoreState((state) => state.generalSetting.leaveCategoryList);
    const fetchleaveCategoryList = useStoreActions((state) => state.generalSetting.fetchleaveCategoryList);
    const fetchAllEmployeeList = useStoreActions((state) => state.hr.fetchAllEmployeeList);
    const allemployeeList = useStoreState((state) => state.hr.allemployeeList);

    useEffect(() => {
        fetchleaveCategoryList();
        fetchAllEmployeeList();
    }, []);

    const leaveApply = useStoreActions((state) => state.generalSetting.leaveApply);

    const [createForm] = Form.useForm();

    const createSubmitForm = (value) => {

        let leaveApplicationDates = dates?.map(item => item.format());
        let payload = {
            "leaveApplicationDates": leaveApplicationDates,
            "leaveCategoryId": value.leaveCategoryId,
            "replacementEmployeeId": value.replacementEmployeeId,
            "addressDuringLeave": value.addressDuringLeave,
            "reasonForLeave": value.reasonForLeave,
            "contactNo": value.contactNo,
            "totalLeave": leaveApplicationDates?.length
        }
        leaveApply(payload);
        createForm.resetFields();

    }
    const [dates, setDates] = useState<any>([]);





    return (
        <>
            <div >
                <Row>
                    <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24 }} lg={{ span: 24, offset: 2 }} xl={{ span: 24, offset: 2 }}>
                        <Form
                            layout="vertical"
                            onFinish={createSubmitForm}
                            form={createForm}
                        // style={{ height: 500 }}
                        >
                            <Row gutter={8}>

                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 5 }} xl={{ span: 5 }}>
                                    <Form.Item
                                        name="leaveApplicationDates"
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
                                            style={{ minHeight: 40, borderRadius: 0, borderColor: '#03D665', width: document.getElementById('employeess') !== null ? document?.getElementById('employeess')?.offsetWidth : 250 }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={5} xl={5}>
                                    <Form.Item
                                        name="leaveCategoryId"
                                        label="Leave Category:"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please select leave category" },
                                        ]}
                                    >
                                        <Select
                                            placeholder="Select Leave Category"
                                            id="leaveCategoryIdx"
                                        >
                                            {leaveCategoryList ? (
                                                leaveCategoryList.map((type, idx) => (
                                                    <Option key={type.leaveCategoryId} value={type.leaveCategoryId}>
                                                        {type.leaveCategoryName}
                                                    </Option>
                                                ))
                                            ) : (
                                                <Option value="fetching">Fetching Category</Option>
                                            )}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={5} xl={5}>
                                    <Form.Item
                                        name="replacementEmployeeId"
                                        label="Replacement Employee:"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please select employee" },
                                        ]}
                                    >
                                        <Select
                                            placeholder="Select Employee"
                                            id="employeess"
                                            showSearch
                                            filterOption={(input, option:any) =>
                                                option !== undefined &&
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                              }
                                        >
                                            {allemployeeList ? (
                                                allemployeeList.map((type, idx) => (
                                                    <Option key={type.employeeId} value={type.employeeId}>
                                                        {type.employeeName}
                                                    </Option>
                                                ))
                                            ) : (
                                                <Option value="fetching">Fetching Employee</Option>
                                            )}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={5} xl={5}>
                                    <Form.Item
                                        name="contactNo"
                                        label="Contact tel/Mo.No:"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please input contact no" },
                                        ]}
                                    >
                                        <Input placeholder='Contact tel/Mo.No' />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 1 }} xl={{ span: 1 }}> </Col>
                                <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                                    <Form.Item
                                        name="reasonForLeave"
                                        label="Reason(s) for leave:"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please input reason for leave" },
                                        ]}
                                    >
                                        <Input.TextArea placeholder='Reason(s) for leave' />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                                    <Form.Item
                                        name="addressDuringLeave"
                                        label="Address During Leave:"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please input address" },
                                        ]}
                                    >
                                        <Input placeholder='Address During Leave:' />
                                    </Form.Item>
                                </Col>



                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
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


            </div>

        </>
    )

}