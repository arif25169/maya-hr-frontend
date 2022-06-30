import { Button, Card, Col, DatePicker, Descriptions, Form, Input, Modal, Popconfirm, Row, Space, Table, Tooltip } from 'antd'
import moment from 'moment';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import { DeleteOutlined, EditOutlined, FilePdfOutlined, PlusCircleOutlined, SaveOutlined, SearchOutlined } from '@ant-design/icons';
import TableView from '../../../contents/AntTableResponsive';




export default function EmployeeSelfAttendanceDetails(props) {

    const attendanceDetailsselfEmployee = useStoreState((state) => state.attendance.attendanceDetailsselfEmployee);
    const fetchattendanceDetailsselfEmployee = useStoreActions((state) => state.attendance.fetchattendanceDetailsselfEmployee);
    const updateEmployeeAttendanceRemark = useStoreActions((state) => state.attendance.updateEmployeeAttendanceRemark);

    const [createForm] = Form.useForm();

    const saveFormSubmit = (value) => {
        let postData = {
            fromDate: moment(value?.fromDate).format("YYYY-MM-DD"),
            toDate: moment(value?.toDate).format("YYYY-MM-DD")
        };
        fetchattendanceDetailsselfEmployee(postData)
        // createForm.resetFields();
    };

    const [isModalVisible, setIsModalVisible] = useState<any>(false);

    const [attendanceId, setattendanceId] = useState<any>(null)

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
        {
            title: 'Action', dataIndex: '', key: '', showOnResponse: true, showOnDesktop: true,
            render: (text: any, record: any, index) => (
                <Space size="middle">
                    <Tooltip title="Add Remarks">
                        <Button type='primary'
                            onClick={() => {
                                updateForm.setFieldsValue({employeeRemark:record.employeeRemarks})
                                setattendanceId(record.attendanceId)
                                setIsModalVisible(true);

                            }}
                            icon={<PlusCircleOutlined />}

                        />
                    </Tooltip>


                </Space>
            ),
        },
    ];

    const [updateForm] = Form.useForm();

    const updateSubmitForm = (val) => {
        let payload = {
            "attendanceId": attendanceId,
            "employeeRemark": val.employeeRemark
        };
        updateEmployeeAttendanceRemark(payload);
        setIsModalVisible(false);
        updateForm.resetFields();
        setTimeout(() => {
            createForm.submit();
        }, 1200);

    }



    return (
        <>
            <Card title="Employee Attendance Report" >
                <Form
                    layout="vertical"
                    onFinish={saveFormSubmit}
                    id="basic-info"
                    form={createForm}
                >
                    <Row gutter={8}>
                        <Col xs={24} sm={24} md={24} lg={4} xl={4}> </Col>


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
                        <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                            <Button type="primary" htmlType="submit" style={{ height: 40, marginTop: 30 }} icon={<SearchOutlined />}>
                                Search
                            </Button>

                        </Col>
                    </Row>
                </Form>
                {attendanceDetailsselfEmployee?.details?.length > 0 &&
                    <Row className='mt-30'>
                        <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                            <Descriptions
                                title="Employee Info"
                                bordered
                                column={{ xxl: 1, xl: 1, lg: 3, md: 1, sm: 1, xs: 1 }}
                                style={{ marginBottom: 10, }}
                            >
                                <Descriptions.Item label={<strong>ID</strong>}>{attendanceDetailsselfEmployee?.customEmployeeId}</Descriptions.Item>
                                <Descriptions.Item label={<strong>Name</strong>}>{attendanceDetailsselfEmployee?.employeeName}</Descriptions.Item>
                                <Descriptions.Item label={<strong>Designation</strong>}>{attendanceDetailsselfEmployee?.designation}</Descriptions.Item>
                                <Descriptions.Item label={<strong>Department</strong>}>{attendanceDetailsselfEmployee?.department}</Descriptions.Item>
                            </Descriptions>
                        </Col>
                        <Col span={24}>
                            <TableView
                                antTableProps={{
                                    showHeader: true,
                                    columns: columns,
                                    rowKey: "holidayId",
                                    dataSource: attendanceDetailsselfEmployee.details,
                                    filterData: attendanceDetailsselfEmployee.details,
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
                                <Descriptions.Item label={<strong>Total Late Count</strong>}>{attendanceDetailsselfEmployee?.totalLate}</Descriptions.Item>
                                <Descriptions.Item label={<strong>Total Approved Late Count</strong>}>{attendanceDetailsselfEmployee?.totalApprovedLate}</Descriptions.Item>
                                <Descriptions.Item label={<strong>Total Approved Absent Count</strong>}>{attendanceDetailsselfEmployee?.totalApprovedAbsent}</Descriptions.Item>
                                <Descriptions.Item label={<strong>Total Working Day Count</strong>}>{attendanceDetailsselfEmployee?.totalWorkingDay}</Descriptions.Item>
                                <Descriptions.Item label={<strong>Total Absent Count</strong>}>{attendanceDetailsselfEmployee?.totalAbsent}</Descriptions.Item>
                                <Descriptions.Item label={<strong>Total Holiday Count</strong>}>{attendanceDetailsselfEmployee?.totalHolyday}</Descriptions.Item>
                                <Descriptions.Item label={<strong>Total Leave Count</strong>}>{attendanceDetailsselfEmployee?.totalLeave}</Descriptions.Item>
                                <Descriptions.Item label={<strong>Total Day Count</strong>}>{attendanceDetailsselfEmployee?.totalDay}</Descriptions.Item>
                            </Descriptions>
                        </Col>
                    </Row>
                }
            </Card>
            <Modal
                title="Add Remarks"
                visible={isModalVisible}
                //  onOk={handleOk}
                okButtonProps={{ form: 'update', htmlType: 'submit' }}
                onCancel={() => setIsModalVisible(false)}
                cancelText="Close"
                okText="Submit"
                centered
                maskClosable={false}
            >
                <Form
                    layout="vertical"
                    id="update"
                    onFinish={updateSubmitForm}
                    form={updateForm}
                >
                    <Row>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                            <Form.Item
                                name="employeeRemark"
                                label="Employee Reamrks"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please write remarks" },
                                ]}
                            >
                                <Input.TextArea placeholder="Employee Remarks"  style={{height:100}}> </Input.TextArea>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}
