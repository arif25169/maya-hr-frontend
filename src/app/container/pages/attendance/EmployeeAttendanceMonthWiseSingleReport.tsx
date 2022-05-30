import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Divider, Form, Input, InputNumber, Popconfirm, Row, Select, Space, Tooltip, message, Modal, Checkbox, notification, Tabs, DatePicker, Skeleton, Descriptions } from 'antd'
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import TableView from '../../../contents/AntTableResponsive';
import { DeleteOutlined, DownloadOutlined, EditOutlined, SaveOutlined, SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import { v4 as uuidv4 } from "uuid";
import $ from 'jquery';
import jsPDF from "jspdf";
import { pdfDataL, ppowerdbypdf, pdatepdf, ppowerdbypdfx } from '../../utils/pdf';
import { FilePdfOutlined } from '@ant-design/icons';
import { SelectDepartment } from '../../select/SelectDepartment';

import 'jspdf-autotable';

var year = (new Date().getFullYear()) * 1;

var getColumns = function () {
    return [
        { title: "Attendance Date", dataKey: "attendanceDate" },
        { title: "Attendance Status", dataKey: "attendanceStatus" },
        { title: "In Time", dataKey: "inTime" },
        { title: "In Status", dataKey: "inStatus" },
        { title: "Out Time", dataKey: "outTime" },
        { title: "Out Status", dataKey: "outStatus" },

    ];
};

export default function EmployeeAttendanceMonthWiseSingleReport() {
    const { Option } = Select;
    const [form] = Form.useForm();

    const employeeMonthWiseAttReport = useStoreState((state) => state.attendance.employeeMonthWiseAttReport);
    const fetchemployeeMonthWiseAttReport = useStoreActions((state) => state.attendance.fetchemployeeMonthWiseAttReport);
    const loading = useStoreState((state) => state.attendance.loading);
    const fetchCompanyDepartmentList = useStoreActions((state) => state.common.fetchCompanyDepartmentList);
    const fetchEmployeeByDepartment = useStoreActions((state) => state.hr.fetchEmployeeByDepartment);
    const employeeListByDepartment = useStoreState((state) => state.hr.employeeListByDepartment);

    useEffect(function () {
        fetchCompanyDepartmentList();
    }, []);

    const onsearch = (value) => {

        fetchemployeeMonthWiseAttReport(value);
    }

    const columns = [
        { title: 'Attendance Date', dataIndex: 'attendanceDate', key: 'attendanceDate', showOnResponse: true, showOnDesktop: true },
        { title: 'Attendance Status', dataIndex: 'attendanceStatus', key: 'attendanceStatus', showOnResponse: true, showOnDesktop: true },
        { title: 'In Time', dataIndex: 'inTime', key: 'inTime', showOnResponse: true, showOnDesktop: true },
        { title: 'In Status', dataIndex: 'inStatus', key: 'inStatus', showOnResponse: true, showOnDesktop: true },
        { title: 'Out Time', dataIndex: 'outTime', key: 'outTime', showOnResponse: true, showOnDesktop: true },
        { title: 'Out Status', dataIndex: 'outStatus', key: 'outStatus', showOnResponse: true, showOnDesktop: true },


    ];

    function exportPdf() {


        var details = "Attendance Info";

        var doc = new jsPDF("p", "mm", "a4");
        pdfDataL(doc, details);

        var totalPagesExp = "{total_pages_count_string}";

        var pageContent = function (data) {
            // FOOTER
            var str = ppowerdbypdfx + data.pageCount;
            if (typeof doc.putTotalPages === 'function') {
                str = str + " of " + totalPagesExp + pdatepdf;
            }
            doc.setFontSize(8);
            var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
            doc.text(str, data.settings.margin.right, pageHeight - 10);
        };

        doc.autoTable([
            { title: "", dataKey: "b1" },
            { title: "", dataKey: "b2" },
            { title: "", dataKey: "b3" },
            { title: "", dataKey: "b4" },
            { title: "", dataKey: "b5" },
            { title: "", dataKey: "b6" },
        ], [
            {
                b1: "Name:",
                b2: `${$(".staffName").text()}`,
                b3: "Month",
                b4: form.getFieldValue("month"),
                b5: "Year",
                b6: form.getFieldValue("year"),
            },
            {
                b1: "Designation:",
                b2: employeeMonthWiseAttReport?.designation,
                b3: "Total Working Day",
                b4: employeeMonthWiseAttReport?.totalWorkingDay,
                b5: "Total Present",
                b6: employeeMonthWiseAttReport?.totalPresent,
            },
            {
                b1: "Total Absent:",
                b2: employeeMonthWiseAttReport?.totalAbsent,
                b3: "Total Delay",
                b4: employeeMonthWiseAttReport?.totalDelay,
                b5: "Total Leave",
                b6: employeeMonthWiseAttReport?.totalLeave,
            },
        ], {
            startY: 45,
            showHeader: "never",
            theme: 'grid',
            styles: { lineColor: 224, fontSize: 8 },
            columnStyles: {
                b1: {
                    fontStyle: 'bold'
                },
                b3: {
                    fontStyle: 'bold'
                },
                b5: {
                    fontStyle: 'bold'
                },
            },

            // addPageContent: pageContent,
        });
        let first = doc.autoTable.previous;

        doc.autoTable(getColumns(), employeeMonthWiseAttReport?.details, {

            headerStyles: {
                lineWidth: .01,
                lineColor: [224, 224, 224]
            },
            theme: "grid",
            styles: { fontSize: 8 },
            startY: doc.autoTable.previous.finalY + 5,
            createdCell: function (cell: any, opts: any) {
                cell.styles.cellPadding = 1;
                if (cell.raw == null) {
                    cell.styles.textColor = "#fff";

                }
            },
            addPageContent: pageContent
        });

        if (typeof doc.putTotalPages === 'function') {
            doc.putTotalPages(totalPagesExp);
        }

        doc.save(details + ".pdf");

    }

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
                            <Row>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 5 }} xl={{ span: 5 }}>
                                    <Form.Item
                                        name="department"
                                        label="Department"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Select department" },
                                        ]}
                                    >
                                        <SelectDepartment onChange={e => {
                                            form.setFieldsValue({ employeeId: null });
                                            fetchEmployeeByDepartment(e)
                                        }} />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 5 }} xl={{ span: 5 }}>
                                    <Form.Item
                                        name="employeeId"
                                        label="Select Employee"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please select employee" },
                                        ]}
                                    >
                                        <Select placeholder="Select Employee" style={{ width: "100%" }} >
                                            {employeeListByDepartment ? (
                                                employeeListByDepartment.map((type, idx) => (
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
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 5 }} xl={{ span: 5 }}>
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
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 5 }} xl={{ span: 5 }}>
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
                {employeeMonthWiseAttReport?.customEmployeeId !== undefined &&
                    <Row >
                        <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24 }}>
                            <Descriptions
                                // title="User Info"
                                bordered
                                column={{ xxl: 3, xl: 3, lg: 3, md: 1, sm: 1, xs: 1 }}
                            >
                                <Descriptions.Item label={<strong>Designation</strong>}>{employeeMonthWiseAttReport?.designation}</Descriptions.Item>
                                <Descriptions.Item label={<strong>Total Working Day</strong>}>{employeeMonthWiseAttReport?.totalWorkingDay}</Descriptions.Item>
                                <Descriptions.Item label={<strong>Total Present</strong>}>{employeeMonthWiseAttReport?.totalPresent}</Descriptions.Item>
                                <Descriptions.Item label={<strong>Total Absent</strong>}>{employeeMonthWiseAttReport?.totalAbsent}</Descriptions.Item>
                                <Descriptions.Item label={<strong>Total Delay</strong>}>{employeeMonthWiseAttReport?.totalDelay}</Descriptions.Item>
                                <Descriptions.Item label={<strong>Total Leave</strong>}>{employeeMonthWiseAttReport?.totalLeave}</Descriptions.Item>
                            </Descriptions>
                        </Col>

                        <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24 }} style={{ marginTop: 15 }}>
                            <TableView
                                antTableProps={{
                                    showHeader: true,
                                    columns: columns,
                                    rowKey: "attendanceId",
                                    dataSource: employeeMonthWiseAttReport?.details,
                                    filterData: employeeMonthWiseAttReport?.details,
                                    pagination: true,
                                    bordered: true
                                }}
                                mobileBreakPoint={768}
                            />
                            <br />
                            <Button type="primary" htmlType="submit" icon={<DownloadOutlined />} onClick={() => exportPdf()} className="float-right">Download</Button>
                        </Col>
                    </Row>
                }
            </>
        </>
    )

}