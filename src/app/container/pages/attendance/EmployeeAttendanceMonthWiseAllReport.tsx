import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Divider, Form, Input, InputNumber, Popconfirm, Row, Select, Space, Tooltip, message, Modal, Checkbox, notification, Tabs, DatePicker, Skeleton, Descriptions } from 'antd'
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import TableView from '../../../contents/AntTableResponsive';
import { DeleteOutlined, DownloadOutlined, EditOutlined, FileExcelOutlined, SaveOutlined, SearchOutlined } from '@ant-design/icons';
import { Excel } from 'antd-table-saveas-excel';

var year = (new Date().getFullYear()) * 1;



export default function EmployeeAttendanceMonthWiseAllReport() {
    const { Option } = Select;
    const [form] = Form.useForm();

    const attendanceDetailsAllEmployee = useStoreState((state) => state.attendance.attendanceDetailsAllEmployee);
    const fetchattendanceDetailsAllEmployee = useStoreActions((state) => state.attendance.fetchattendanceDetailsAllEmployee);
    const loading = useStoreState((state) => state.attendance.loading);


    const onsearch = (value) => {
        fetchattendanceDetailsAllEmployee(value);
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
        { title: attendanceDetailsAllEmployee?.firstDay, dataIndex: 'firstDay', key: 'firstDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.secondDay, dataIndex: 'secondDay', key: 'secondDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.thirdDay, dataIndex: 'thirdDay', key: 'thirdDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.fourthDay, dataIndex: 'fourthDay', key: 'fourthDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.fifthDay, dataIndex: 'fifthDay', key: 'fifthDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.sixthDay, dataIndex: 'sixthDay', key: 'sixthDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.seventhDay, dataIndex: 'seventhDay', key: 'seventhDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.eighthDay, dataIndex: 'eighthDay', key: 'eighthDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.ninethDay, dataIndex: 'ninethDay', key: 'ninethDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.tenthDay, dataIndex: 'tenthDay', key: 'tenthDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.eleventhDay, dataIndex: 'eleventhDay', key: 'eleventhDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.twelvethDay, dataIndex: 'twelvethDay', key: 'twelvethDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.thirteenthDay, dataIndex: 'thirteenthDay', key: 'thirteenthDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.fourteenthDay, dataIndex: 'fourteenthDay', key: 'fourteenthDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.fifteenthDay, dataIndex: 'fifteenthDay', key: 'fifteenthDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.sixteenthDay, dataIndex: 'sixteenthDay', key: 'sixteenthDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.seventeenthDay, dataIndex: 'seventeenthDay', key: 'seventeenthDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.eighteenthDay, dataIndex: 'eighteenthDay', key: 'eighteenthDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.nineteenthDay, dataIndex: 'nineteenthDay', key: 'nineteenthDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.twentythDay, dataIndex: 'twentythDay', key: 'twentythDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.twentyFirstDay, dataIndex: 'twentyFirstDay', key: 'twentyFirstDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.twentySecondDay, dataIndex: 'twentySecondDay', key: 'twentySecondDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.twentyThirdDay, dataIndex: 'twentyThirdDay', key: 'twentyThirdDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.twentyFourthDay, dataIndex: 'twentyFourthDay', key: 'twentyFourthDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.twentyFifthDay, dataIndex: 'twentyFifthDay', key: 'twentyFifthDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.twentySixthDay, dataIndex: 'twentySixthDay', key: 'twentySixthDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.twentySeventhDay, dataIndex: 'twentySeventhDay', key: 'twentySeventhDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.twentyEighthDay, dataIndex: 'twentyEighthDay', key: 'twentyEighthDay', showOnResponse: true, showOnDesktop: true },
        attendanceDetailsAllEmployee?.twentyNinethDay!==''&&  { title: attendanceDetailsAllEmployee?.twentyNinethDay, dataIndex: 'twentyNinethDay', key: 'twentyNinethDay', showOnResponse: true, showOnDesktop: true },
        attendanceDetailsAllEmployee?.thirtythDay!==''&&  { title: attendanceDetailsAllEmployee?.thirtythDay, dataIndex: 'thirtythDay', key: 'thirtythDay', showOnResponse: true, showOnDesktop: true },
        attendanceDetailsAllEmployee?.thirtyFirstDay!==''&&  { title: attendanceDetailsAllEmployee?.thirtyFirstDay, dataIndex: 'thirtyFirstDay', key: 'thirtyFirstDay', showOnResponse: true, showOnDesktop: true },
    ];

    const columns2 = [
        { title: 'Id', dataIndex: 'customEmployeeId', key: 'customEmployeeId', showOnResponse: true, showOnDesktop: true },
        { title: 'Employee Name', dataIndex: 'employeeName', key: 'employeeName', showOnResponse: true, showOnDesktop: true },
        { title: 'Total Working Days', dataIndex: 'totalWorkingDay', key: 'totalWorkingDay', showOnResponse: true, showOnDesktop: true },
        { title: 'Total Present', dataIndex: 'totalPresent', key: 'totalPresent', showOnResponse: true, showOnDesktop: true },
        { title: 'Total Absent', dataIndex: 'totalAbsent', key: 'totalAbsent', showOnResponse: true, showOnDesktop: true },
        { title: 'Total Delay', dataIndex: 'totalDelay', key: 'totalDelay', showOnResponse: true, showOnDesktop: true },
        { title: 'Total Early Leave', dataIndex: 'totalEarlyLeave', key: 'totalEarlyLeave', showOnResponse: true, showOnDesktop: true },
        { title: 'Total Leave', dataIndex: 'totalLeave', key: 'totalLeave', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.firstDay, dataIndex: 'firstDay', key: 'firstDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.secondDay, dataIndex: 'secondDay', key: 'secondDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.thirdDay, dataIndex: 'thirdDay', key: 'thirdDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.fourthDay, dataIndex: 'fourthDay', key: 'fourthDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.fifthDay, dataIndex: 'fifthDay', key: 'fifthDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.sixthDay, dataIndex: 'sixthDay', key: 'sixthDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.seventhDay, dataIndex: 'seventhDay', key: 'seventhDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.eighthDay, dataIndex: 'eighthDay', key: 'eighthDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.ninethDay, dataIndex: 'ninethDay', key: 'ninethDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.tenthDay, dataIndex: 'tenthDay', key: 'tenthDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.eleventhDay, dataIndex: 'eleventhDay', key: 'eleventhDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.twelvethDay, dataIndex: 'twelvethDay', key: 'twelvethDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.thirteenthDay, dataIndex: 'thirteenthDay', key: 'thirteenthDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.fourteenthDay, dataIndex: 'fourteenthDay', key: 'fourteenthDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.fifteenthDay, dataIndex: 'fifteenthDay', key: 'fifteenthDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.sixteenthDay, dataIndex: 'sixteenthDay', key: 'sixteenthDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.seventeenthDay, dataIndex: 'seventeenthDay', key: 'seventeenthDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.eighteenthDay, dataIndex: 'eighteenthDay', key: 'eighteenthDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.nineteenthDay, dataIndex: 'nineteenthDay', key: 'nineteenthDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.twentythDay, dataIndex: 'twentythDay', key: 'twentythDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.twentyFirstDay, dataIndex: 'twentyFirstDay', key: 'twentyFirstDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.twentySecondDay, dataIndex: 'twentySecondDay', key: 'twentySecondDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.twentyThirdDay, dataIndex: 'twentyThirdDay', key: 'twentyThirdDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.twentyFourthDay, dataIndex: 'twentyFourthDay', key: 'twentyFourthDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.twentyFifthDay, dataIndex: 'twentyFifthDay', key: 'twentyFifthDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.twentySixthDay, dataIndex: 'twentySixthDay', key: 'twentySixthDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.twentySeventhDay, dataIndex: 'twentySeventhDay', key: 'twentySeventhDay', showOnResponse: true, showOnDesktop: true },
        { title: attendanceDetailsAllEmployee?.twentyEighthDay, dataIndex: 'twentyEighthDay', key: 'twentyEighthDay', showOnResponse: true, showOnDesktop: true },
        attendanceDetailsAllEmployee?.twentyNinethDay!==''?  { title: attendanceDetailsAllEmployee?.twentyNinethDay, dataIndex: 'twentyNinethDay', key: 'twentyNinethDay', showOnResponse: true, showOnDesktop: true } :  { title: '', dataIndex: 'twentyNinethDay', key: 'twentyNinethDay', showOnResponse: true, showOnDesktop: true },
        attendanceDetailsAllEmployee?.thirtythDay!==''?  { title: attendanceDetailsAllEmployee?.thirtythDay, dataIndex: 'thirtythDay', key: 'thirtythDay', showOnResponse: true, showOnDesktop: true } : { title: '', dataIndex: 'thirtythDay', key: 'thirtythDay', showOnResponse: true, showOnDesktop: true },
        attendanceDetailsAllEmployee?.thirtyFirstDay!==''?  { title: attendanceDetailsAllEmployee?.thirtyFirstDay, dataIndex: 'thirtyFirstDay', key: 'thirtyFirstDay', showOnResponse: true, showOnDesktop: true } : { title: '', dataIndex: 'thirtyFirstDay', key: 'thirtyFirstDay', showOnResponse: true, showOnDesktop: true },
    ];




    return (
        <>
            <>
                <Row>
                    <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24 }} lg={{ span: 20, offset: 4 }} xl={{ span: 20, offset: 4 }}>
                        <Form
                            layout="vertical"
                            id="sessionYearInfo"
                            onFinish={onsearch}
                            form={form}
                        >
                            <Row>

                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                                    <Form.Item
                                        name="month"
                                        label="Select Month"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please select month" },
                                        ]}
                                    >
                                        <Select placeholder="Select month">
                                            <Option key="1" value="January">January</Option>
                                            <Option key="2" value="February">February</Option>
                                            <Option key="3" value="March">March</Option>
                                            <Option key="4" value="April">April</Option>
                                            <Option key="5" value="May">May</Option>
                                            <Option key="6" value="June">June</Option>
                                            <Option key="7" value="July">July</Option>
                                            <Option key="8" value="August">August</Option>
                                            <Option key="9" value="September">September</Option>
                                            <Option key="10" value="October">October</Option>
                                            <Option key="11" value="November">November</Option>
                                            <Option key="12" value="December">December</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                                    <Form.Item
                                        name="year"
                                        label="Year"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please select year" },
                                        ]}
                                    >

                                        <Select placeholder="Select Year" allowClear>
                                            <Option value={year - 1}>{year - 1}</Option>
                                            <Option value={year}>{year}</Option>
                                            <Option value={year + 1}>{year + 1}</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 4 }} xl={{ span: 4 }}>

                                    <Button type="primary" htmlType="submit" icon={<SearchOutlined />} >
                                        Search
                                    </Button>

                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
                <Skeleton loading={loading} paragraph={{ rows: 10 }} />
                {attendanceDetailsAllEmployee?.staffList?.length >0 &&
                    <Row >


                        <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24 }} style={{ marginTop: 15 }}>
                            <TableView
                                antTableProps={{
                                    showHeader: true,
                                    columns: columns,
                                    rowKey: "customEmployeeId",
                                    dataSource: attendanceDetailsAllEmployee?.staffList,
                                    filterData: attendanceDetailsAllEmployee?.staffList,
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
                                        .addSheet(`${form.getFieldValue("year")}-${form.getFieldValue("month")}`)
                                        .addColumns(columns2)
                                        .addDataSource(attendanceDetailsAllEmployee?.staffList)
                                        .saveAs(`${form.getFieldValue("year")}-${form.getFieldValue("month")}.xlsx`);
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