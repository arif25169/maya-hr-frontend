import { Button, Card, Col, DatePicker, Descriptions, Form, Input, Modal, Popconfirm, Row, Select, Space, Table, Tooltip } from 'antd'
import moment from 'moment';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import { DeleteOutlined, EditOutlined, FilePdfOutlined, PlusCircleOutlined, SaveOutlined, SearchOutlined } from '@ant-design/icons';
import TableView from '../../../contents/AntTableResponsive';


const { Option } = Select;

export default function EmployeeAttendanceMonthWiseSingleReport(props) {

    const attendanceDetailssinglefEmployee = useStoreState((state) => state.attendance.attendanceDetailssinglefEmployee);
    const fetchattendanceDetailssingleEmployee = useStoreActions((state) => state.attendance.fetchattendanceDetailssingleEmployee);
    const fetchAllEmployeeList = useStoreActions((state) => state.hr.fetchAllEmployeeList);
    const allemployeeList = useStoreState((state) => state.hr.allemployeeList);

    useEffect(() => {
        fetchAllEmployeeList();
    }, []);

    const [createForm] = Form.useForm();

    const saveFormSubmit = (value) => {
        let postData = {
            employeeId: value?.employeeId,
            fromDate: moment(value?.fromDate).format("YYYY-MM-DD"),
            toDate: moment(value?.toDate).format("YYYY-MM-DD")
        };
        fetchattendanceDetailssingleEmployee(postData)
        // createForm.resetFields();
    };





    const columns = [

        {
            title: 'Date',
            dataIndex: 'attendanceDate',
            key: 'attendanceDate',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Status',
            dataIndex: 'attendanceStatus',
            key: 'attendanceStatus',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Late',
            dataIndex: 'late',
            key: 'late',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'In',
            dataIndex: 'inTime',
            key: 'inTime',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Out',
            dataIndex: 'outTime',
            key: 'outTime',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Hours',
            dataIndex: 'workingHours',
            key: 'workingHours',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Remarks',
            dataIndex: 'remarks',
            key: 'remarks',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Employee Remarks',
            dataIndex: 'employeeRemarks',
            key: 'employeeRemarks',
            showOnResponse: true,
            showOnDesktop: true
        },

    ];




    return (
        <>
            <div>
                <Form
                    layout="vertical"
                    onFinish={saveFormSubmit}
                    id="basic-info"
                    form={createForm}
                >
                    <Row gutter={8}>
                        <Col xs={24} sm={24} md={24} lg={2} xl={2}> </Col>
                        <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                                    <Form.Item
                                        name="employeeId"
                                        label="Select Employee:"
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

                        <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                            <Form.Item
                                name="fromDate"
                                label="Start Date"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please enter from date" },
                                ]}
                            >

                                <DatePicker style={{ width: '100%' }} placeholder="Select Date" format={"DD/MM/YYYY"} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                            <Form.Item
                                name="toDate"
                                label="End Date"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please enter to date" },
                                ]}
                            >

                                <DatePicker style={{ width: '100%' }} placeholder="Select Date" format={"DD/MM/YYYY"} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={2} xl={2}>
                            <Button type="primary" htmlType="submit" style={{ height: 40, marginTop: 30 }} icon={<SearchOutlined />}>
                                Search
                            </Button>

                        </Col>
                    </Row>
                </Form>
                {attendanceDetailssinglefEmployee?.details?.length > 0 &&
                    <Row className='mt-30'>
                        <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                            <Descriptions
                                title="Employee Info"
                                bordered
                                column={{ xxl: 1, xl: 1, lg: 3, md: 1, sm: 1, xs: 1 }}
                                style={{ marginBottom: 10, }}
                            >
                                <Descriptions.Item label={<strong>ID</strong>}>{attendanceDetailssinglefEmployee?.customEmployeeId}</Descriptions.Item>
                                <Descriptions.Item label={<strong>Name</strong>}>{attendanceDetailssinglefEmployee?.employeeName}</Descriptions.Item>
                                <Descriptions.Item label={<strong>Designation</strong>}>{attendanceDetailssinglefEmployee?.designation}</Descriptions.Item>
                                <Descriptions.Item label={<strong>Department</strong>}>{attendanceDetailssinglefEmployee?.department}</Descriptions.Item>
                            </Descriptions>
                        </Col>
                        <Col span={24}>
                            <TableView
                                antTableProps={{
                                    showHeader: true,
                                    columns: columns,
                                    rowKey: "holidayId",
                                    dataSource: attendanceDetailssinglefEmployee.details,
                                    filterData: attendanceDetailssinglefEmployee.details,
                                    pagination: false,
                                    bordered: true,
                                }}
                                mobileBreakPoint={768}
                            />
                        </Col>
                        <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                            <Descriptions
                                title="Attendance Summary"
                                bordered
                                column={{ xxl: 1, xl: 1, lg: 3, md: 1, sm: 1, xs: 1 }}
                                style={{ marginTop: 10 }}
                            >
                                <Descriptions.Item label={<strong>Total Late Count</strong>}>{attendanceDetailssinglefEmployee?.totalLate}</Descriptions.Item>
                                <Descriptions.Item label={<strong>Total Approved Late Count</strong>}>{attendanceDetailssinglefEmployee?.totalApprovedLate}</Descriptions.Item>
                                <Descriptions.Item label={<strong>Total Working Day Count</strong>}>{attendanceDetailssinglefEmployee?.totalWorkingDay}</Descriptions.Item>
                                <Descriptions.Item label={<strong>Total Absent Count</strong>}>{attendanceDetailssinglefEmployee?.totalAbsent}</Descriptions.Item>
                                <Descriptions.Item label={<strong>Total Holiday Count</strong>}>{attendanceDetailssinglefEmployee?.totalHolyday}</Descriptions.Item>
                                <Descriptions.Item label={<strong>Total Leave Count</strong>}>{attendanceDetailssinglefEmployee?.totalLeave}</Descriptions.Item>
                                <Descriptions.Item label={<strong>Total Day Count</strong>}>{attendanceDetailssinglefEmployee?.totalDay}</Descriptions.Item>
                            </Descriptions>
                        </Col>
                    </Row>
                }
            </div>

        </>
    )
}
