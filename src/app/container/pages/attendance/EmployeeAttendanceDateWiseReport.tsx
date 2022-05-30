import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Divider, Form, Input, InputNumber, Popconfirm, Row, Select, Space, Tooltip, message, Modal, Checkbox, notification, Tabs, DatePicker, Skeleton } from 'antd'
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import TableView from '../../../contents/AntTableResponsive';
import { DeleteOutlined, DownloadOutlined, EditOutlined, SaveOutlined, SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import { v4 as uuidv4 } from "uuid";
import $ from 'jquery';
import jsPDF from "jspdf";
import { pdfDataL, ppowerdbypdf, pdatepdf, lpowerdbypdf, ldatepdf } from '../../utils/pdf';
import { FilePdfOutlined } from '@ant-design/icons';
import 'jspdf-autotable';

export default function EmployeeAttendanceDateWiseReport() {
    const { Option } = Select;
    const [form] = Form.useForm();

    const employeeDateWiseAttReport = useStoreState((state) => state.attendance.employeeDateWiseAttReport);
    const fetchemployeeDateWiseAttReport = useStoreActions((state) => state.attendance.fetchemployeeDateWiseAttReport);
    const loading = useStoreState((state) =>  state.attendance.loading);

    const [date, setDate] = useState<any>('')

    const examReportSearch = (value) => {
        setDate(moment(value?.attendanceDate).format("YYYY-MM-DD"))
        fetchemployeeDateWiseAttReport(moment(value?.attendanceDate).format("YYYY-MM-DD"));
    }

    const unassignedSubjectMarkListColumn = [
        { title: 'Id', dataIndex: 'employeeId', key: 'employeeId', showOnResponse: true, showOnDesktop: true },
        { title: 'Name', dataIndex: 'employeeName', key: 'employeeName', showOnResponse: true, showOnDesktop: true },
        { title: 'Designation', dataIndex: 'designation', key: 'designation', showOnResponse: true, showOnDesktop: true },
        { title: 'Mobile', dataIndex: 'mobileNo', key: 'mobileNo', showOnResponse: true, showOnDesktop: true },
        { title: 'Attendance Status', dataIndex: 'attendanceStatus', key: 'attendanceStatus', showOnResponse: true, showOnDesktop: true },
        { title: 'In Time', dataIndex: 'inTime', key: 'inTime', showOnResponse: true, showOnDesktop: true },
        { title: 'In Status', dataIndex: 'inStatus', key: 'inStatus', showOnResponse: true, showOnDesktop: true },
        { title: 'Out Time', dataIndex: 'outTime', key: 'outTime', showOnResponse: true, showOnDesktop: true },
        { title: 'Out Status', dataIndex: 'outStatus', key: 'outStatus', showOnResponse: true, showOnDesktop: true },

    ];

    function exportPdf() {


        var details = "Employee Attendance Info of " + date;

        var doc = new jsPDF("l", "mm", "a4");
        pdfDataL(doc, details);

        var col = ["ID", "Name", "Designation", "Mobile", "Attendance Status", "In Time", "In Status", "Out Time", "Out Status"];

        var rows: any = [];


        employeeDateWiseAttReport.forEach(element => {
            var temp = [element.employeeId, element.employeeName, element.designation, element.mobileNo,
            element.attendanceStatus, element.inTime, element.inStatus, element.outTime, element.outStatus ];
            rows.push(temp);
        });

        var totalPagesExp = "{total_pages_count_string}";

        var pageContent = function (data) {
            // FOOTER
            var str = lpowerdbypdf + data.pageCount;
            if (typeof doc.putTotalPages === 'function') {
                str = str + " of " + totalPagesExp + ldatepdf;
            }
            doc.setFontSize(8);
            var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
            doc.text(str, data.settings.margin.right, pageHeight - 10);
        };

        doc.autoTable(col, rows, {

            headerStyles: {
                lineWidth: .01,
                lineColor: [224, 224, 224]
            },
            theme: "grid",
            styles: { fontSize: 7 },
            startY: 45,
            addPageContent: pageContent
        });

        if (typeof doc.putTotalPages === 'function') {
            doc.putTotalPages(totalPagesExp);
        }

        doc.save(details + ".pdf");

    }

    return (
        <>
            <Card title="Date Wise Employee Attendance List">
                <Row>
                    <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24 }} lg={{ span: 12, offset: 6 }} xl={{ span: 12, offset: 6 }}>
                        <Form
                            layout="vertical"
                            id="sessionYearInfo"
                            onFinish={examReportSearch}
                            form={form}
                        >
                            <Row>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 4 }} xl={{ span: 4 }}>

                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 10 }} lg={{ span: 10 }} xl={{ span: 10 }}>
                                    <Form.Item
                                        name="attendanceDate"
                                        label="Attendance Date"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please select attendance date" },
                                        ]}
                                    >
                                        <DatePicker style={{ width: '100%' }} placeholder="Select Date" format={"DD/MM/YYYY"} />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>

                                    <Button type="primary" htmlType="submit" icon={<SearchOutlined />} >
                                        Search
                                    </Button>

                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
               <Skeleton loading={loading} paragraph={{rows:10}} />
               {employeeDateWiseAttReport.length>0 && 
                <Row style={{ display: employeeDateWiseAttReport.length > 0 ? '' : 'none' }}>
                    <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24 }}>
                        <TableView
                            antTableProps={{
                                showHeader: true,
                                columns: unassignedSubjectMarkListColumn,
                                rowKey: "attendanceId",
                                dataSource: employeeDateWiseAttReport,
                                filterData: employeeDateWiseAttReport,
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
            </Card>
        </>
    )

}