import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Divider, Form, Input, InputNumber, Popconfirm, Row, Select, Space, Tooltip, message, Modal, Checkbox, notification, Tabs, DatePicker, Skeleton, Descriptions } from 'antd'
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import TableView from '../../../contents/AntTableResponsive';
import { DeleteOutlined, DownloadOutlined, EditOutlined, FileExcelOutlined, SaveOutlined, SearchOutlined } from '@ant-design/icons';
import { Excel } from 'antd-table-saveas-excel';
import moment from 'moment';
import { SelectDepartment } from '../../select/SelectDepartment';

import $ from 'jquery';



export default function EmployeeAttendanceDepartmentWiseAllReport() {
    const { Option } = Select;
    const [form] = Form.useForm();

    const attendanceDetailsDepartmentEmployee = useStoreState((state) => state.attendance.attendanceDetailsDepartmentEmployee);
    const fetchattendanceDetailsDepartmentEmployee = useStoreActions((state) => state.attendance.fetchattendanceDetailsDepartmentEmployee);
    const loading = useStoreState((state) => state.attendance.loading);
    const fetchCompanyDepartmentList = useStoreActions((state) => state.common.fetchCompanyDepartmentList);
    useEffect(() => {
        fetchCompanyDepartmentList();
    }, [])

    const onsearch = (value) => {
        let postData = {
            fromDate: moment(value?.fromDate).format("YYYY-MM-DD"),
            toDate: moment(value?.toDate).format("YYYY-MM-DD"),
            departmentId: value.departmentId
        };
        fetchattendanceDetailsDepartmentEmployee(postData)
    }


    const columns = [
        { title: 'Id', dataIndex: 'customEmployeeId', key: 'customEmployeeId', showOnResponse: true, showOnDesktop: true },
        { title: 'Employee Name', dataIndex: 'employeeName', key: 'employeeName', showOnResponse: true, showOnDesktop: true },
        { title: 'Working Days', dataIndex: 'totalWorkingDay', key: 'totalWorkingDay', showOnResponse: true, showOnDesktop: true },
        { title: 'Present', dataIndex: 'totalPresent', key: 'totalPresent', showOnResponse: true, showOnDesktop: true },
        { title: 'Absent', dataIndex: 'totalAbsent', key: 'totalAbsent', showOnResponse: true, showOnDesktop: true },
        { title: 'Leave', dataIndex: 'totalLeave', key: 'totalLeave', showOnResponse: true, showOnDesktop: true },
        { title: 'Delay', dataIndex: 'totalDelay', key: 'totalDelay', showOnResponse: true, showOnDesktop: true },
        { title: 'Early Leave', dataIndex: 'totalEarlyLeave', key: 'totalEarlyLeave', showOnResponse: true, showOnDesktop: true },
        ...(attendanceDetailsDepartmentEmployee?.firstDay!=='')? [{ title: attendanceDetailsDepartmentEmployee?.firstDay, dataIndex: 'firstDay', key: 'firstDay', showOnResponse: true, showOnDesktop: true }]:[],
        ...(attendanceDetailsDepartmentEmployee?.secondDay!=='')? [{ title: attendanceDetailsDepartmentEmployee?.secondDay, dataIndex: 'secondDay', key: 'secondDay', showOnResponse: true, showOnDesktop: true }]:[],
        ...(attendanceDetailsDepartmentEmployee?.thirdDay!=='')? [{ title: attendanceDetailsDepartmentEmployee?.thirdDay, dataIndex: 'thirdDay', key: 'thirdDay', showOnResponse: true, showOnDesktop: true }]:[],
        ...(attendanceDetailsDepartmentEmployee?.fourthDay!=='')? [{ title: attendanceDetailsDepartmentEmployee?.fourthDay, dataIndex: 'fourthDay', key: 'fourthDay', showOnResponse: true, showOnDesktop: true }]:[],
        ...(attendanceDetailsDepartmentEmployee?.fifthDay!=='')? [{ title: attendanceDetailsDepartmentEmployee?.fifthDay, dataIndex: 'fifthDay', key: 'fifthDay', showOnResponse: true, showOnDesktop: true }]:[],
        ...(attendanceDetailsDepartmentEmployee?.sixthDay!=='')? [{ title: attendanceDetailsDepartmentEmployee?.sixthDay, dataIndex: 'sixthDay', key: 'sixthDay', showOnResponse: true, showOnDesktop: true }]:[],
        ...(attendanceDetailsDepartmentEmployee?.seventhDay!=='')? [{ title: attendanceDetailsDepartmentEmployee?.seventhDay, dataIndex: 'seventhDay', key: 'seventhDay', showOnResponse: true, showOnDesktop: true }]:[],
        ...(attendanceDetailsDepartmentEmployee?.eighthDay!=='')? [{ title: attendanceDetailsDepartmentEmployee?.eighthDay, dataIndex: 'eighthDay', key: 'eighthDay', showOnResponse: true, showOnDesktop: true }]:[],
        ...(attendanceDetailsDepartmentEmployee?.ninethDay!=='')? [{ title: attendanceDetailsDepartmentEmployee?.ninethDay, dataIndex: 'ninethDay', key: 'ninethDay', showOnResponse: true, showOnDesktop: true }]:[],
        ...(attendanceDetailsDepartmentEmployee?.tenthDay!=='')? [{ title: attendanceDetailsDepartmentEmployee?.tenthDay, dataIndex: 'tenthDay', key: 'tenthDay', showOnResponse: true, showOnDesktop: true }]:[],
        ...(attendanceDetailsDepartmentEmployee?.eleventhDay!=='')? [{ title: attendanceDetailsDepartmentEmployee?.eleventhDay, dataIndex: 'eleventhDay', key: 'eleventhDay', showOnResponse: true, showOnDesktop: true }]:[],
        ...(attendanceDetailsDepartmentEmployee?.twelvethDay!=='')? [{ title: attendanceDetailsDepartmentEmployee?.twelvethDay, dataIndex: 'twelvethDay', key: 'twelvethDay', showOnResponse: true, showOnDesktop: true }]:[],
        ...(attendanceDetailsDepartmentEmployee?.thirteenthDay!=='')? [{ title: attendanceDetailsDepartmentEmployee?.thirteenthDay, dataIndex: 'thirteenthDay', key: 'thirteenthDay', showOnResponse: true, showOnDesktop: true }]:[],
        ...(attendanceDetailsDepartmentEmployee?.fourteenthDay!=='')? [{ title: attendanceDetailsDepartmentEmployee?.fourteenthDay, dataIndex: 'fourteenthDay', key: 'fourteenthDay', showOnResponse: true, showOnDesktop: true }]:[],
        ...(attendanceDetailsDepartmentEmployee?.fifteenthDay!=='')? [{ title: attendanceDetailsDepartmentEmployee?.fifteenthDay, dataIndex: 'fifteenthDay', key: 'fifteenthDay', showOnResponse: true, showOnDesktop: true }]:[],
        ...(attendanceDetailsDepartmentEmployee?.sixteenthDay!=='')? [{ title: attendanceDetailsDepartmentEmployee?.sixteenthDay, dataIndex: 'sixteenthDay', key: 'sixteenthDay', showOnResponse: true, showOnDesktop: true }]:[],
        ...(attendanceDetailsDepartmentEmployee?.seventeenthDay!=='')? [{ title: attendanceDetailsDepartmentEmployee?.seventeenthDay, dataIndex: 'seventeenthDay', key: 'seventeenthDay', showOnResponse: true, showOnDesktop: true }]:[],
        ...(attendanceDetailsDepartmentEmployee?.eighteenthDay!=='')? [{ title: attendanceDetailsDepartmentEmployee?.eighteenthDay, dataIndex: 'eighteenthDay', key: 'eighteenthDay', showOnResponse: true, showOnDesktop: true }]:[],
        ...(attendanceDetailsDepartmentEmployee?.nineteenthDay!=='')? [{ title: attendanceDetailsDepartmentEmployee?.nineteenthDay, dataIndex: 'nineteenthDay', key: 'nineteenthDay', showOnResponse: true, showOnDesktop: true }]:[],
        ...(attendanceDetailsDepartmentEmployee?.twentythDay!=='')? [{ title: attendanceDetailsDepartmentEmployee?.twentythDay, dataIndex: 'twentythDay', key: 'twentythDay', showOnResponse: true, showOnDesktop: true }]:[],
        ...(attendanceDetailsDepartmentEmployee?.twentyFirstDay!=='')? [{ title: attendanceDetailsDepartmentEmployee?.twentyFirstDay, dataIndex: 'twentyFirstDay', key: 'twentyFirstDay', showOnResponse: true, showOnDesktop: true }]:[],
        ...(attendanceDetailsDepartmentEmployee?.twentySecondDay!=='')? [{ title: attendanceDetailsDepartmentEmployee?.twentySecondDay, dataIndex: 'twentySecondDay', key: 'twentySecondDay', showOnResponse: true, showOnDesktop: true }]:[],
        ...(attendanceDetailsDepartmentEmployee?.twentyThirdDay!=='')? [{ title: attendanceDetailsDepartmentEmployee?.twentyThirdDay, dataIndex: 'twentyThirdDay', key: 'twentyThirdDay', showOnResponse: true, showOnDesktop: true }]:[],
        ...(attendanceDetailsDepartmentEmployee?.twentyFourthDay!=='')? [{ title: attendanceDetailsDepartmentEmployee?.twentyFourthDay, dataIndex: 'twentyFourthDay', key: 'twentyFourthDay', showOnResponse: true, showOnDesktop: true }]:[],
        ...(attendanceDetailsDepartmentEmployee?.twentyFifthDay!=='')? [{ title: attendanceDetailsDepartmentEmployee?.twentyFifthDay, dataIndex: 'twentyFifthDay', key: 'twentyFifthDay', showOnResponse: true, showOnDesktop: true }]:[],
        ...(attendanceDetailsDepartmentEmployee?.twentySixthDay!=='')? [{ title: attendanceDetailsDepartmentEmployee?.twentySixthDay, dataIndex: 'twentySixthDay', key: 'twentySixthDay', showOnResponse: true, showOnDesktop: true }]:[],
        ...(attendanceDetailsDepartmentEmployee?.twentySeventhDay!=='')? [{ title: attendanceDetailsDepartmentEmployee?.twentySeventhDay, dataIndex: 'twentySeventhDay', key: 'twentySeventhDay', showOnResponse: true, showOnDesktop: true }]:[],
        ...(attendanceDetailsDepartmentEmployee?.twentyEighthDay!=='')? [{ title: attendanceDetailsDepartmentEmployee?.twentyEighthDay, dataIndex: 'twentyEighthDay', key: 'twentyEighthDay', showOnResponse: true, showOnDesktop: true }]:[],
        ...(attendanceDetailsDepartmentEmployee?.twentyNinethDay!=='')? [{ title: attendanceDetailsDepartmentEmployee?.twentyNinethDay, dataIndex: 'twentyNinethDay', key: 'twentyNinethDay', showOnResponse: true, showOnDesktop: true }]:[],
        ...(attendanceDetailsDepartmentEmployee?.thirtyFirstDay!=='')? [{ title: attendanceDetailsDepartmentEmployee?.thirtyFirstDay, dataIndex: 'thirtyFirstDay', key: 'thirtyFirstDay', showOnResponse: true, showOnDesktop: true }]:[],

    ];





    return (
        <>
            <>
                <Row>
                    <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24 }} lg={{ span: 20, offset: 2 }} xl={{ span: 20, offset: 2 }}>
                        <Form
                            layout="vertical"
                            id="sessionYearInfo"
                            onFinish={onsearch}
                            form={form}
                        >
                            <Row gutter={8}>
                                <Col xs={24} sm={24} md={24} lg={2} xl={2}> </Col>

                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 16 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                    <Form.Item
                                        name="departmentId"
                                        label="Department"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please select department" },
                                        ]}
                                    >
                                        <SelectDepartment />
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
                    </Col>
                </Row>
                <Skeleton loading={loading} paragraph={{ rows: 10 }} />
                {attendanceDetailsDepartmentEmployee?.staffList?.length > 0 &&
                    <Row >


                        <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24 }} style={{ marginTop: 15 }}>
                            <TableView
                                antTableProps={{
                                    showHeader: true,
                                    columns: columns,
                                    rowKey: "customEmployeeId",
                                    dataSource: attendanceDetailsDepartmentEmployee?.staffList,
                                    filterData: attendanceDetailsDepartmentEmployee?.staffList,
                                    pagination: true,
                                    bordered: true
                                }}
                                mobileBreakPoint={768}
                            />
                            <br />
                            <Space size={'large'} style={{ float: "right" }}>
                                < Button
                                    type='primary'

                                    icon={<FileExcelOutlined />}
                                    onClick={() => {
                                        const excel: any = new Excel();
                                        excel
                                            .addSheet(`Attendance`)
                                            .addColumns(columns)
                                            .addDataSource(attendanceDetailsDepartmentEmployee?.staffList, {str2Percent: true,})
                                            .saveAs(`Attendance of ${$(".depSelect").text()}.xlsx`);
                                    }}
                                >
                                    Download Excel
                                </ Button >
                            </Space>
                        </Col>
                    </Row>
                }
            </>
        </>
    )

}