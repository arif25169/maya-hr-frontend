import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Row,
  Select,
  DatePicker,
  Skeleton,
} from "antd";
import { useStoreActions, useStoreState } from "../../../store/hooks/easyPeasy";
import { Table } from "ant-table-extensions-extended";
import {
  DownloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { SelectDepartment } from "../../select/SelectDepartment";
import $ from 'jquery';
import jsPDF from "jspdf";
import { pdfDataL, ppowerdbypdf, pdatepdf, lpowerdbypdf, ldatepdf } from '../../utils/pdf';
import 'jspdf-autotable';

export default function EmployeeShiftReport() {
  const { Option } = Select;
  const [form] = Form.useForm();

  const employeeAttendanceShiftConfigurationReport = useStoreState(
    (state) => state.attendance.employeeAttendanceShiftConfigurationReport
  );
  const fetchemployeeAttendanceShiftConfigurationReport = useStoreActions(
    (state) => state.attendance.fetchemployeeAttendanceShiftConfigurationReport
  );
  const setemployeeAttendanceShiftConfigurationReport = useStoreActions(
    (state) => state.attendance.setemployeeAttendanceShiftConfigurationReport
  );

  const loading = useStoreState((state) => state.attendance.loading);
  const fetchCompanyDepartmentList = useStoreActions(
    (state) => state.common.fetchCompanyDepartmentList
  );
  useEffect(() => {
    setemployeeAttendanceShiftConfigurationReport([]);
    fetchCompanyDepartmentList();
  }, []);



  const onsearch = (value) => {
    let postData = {
      fromDate: moment(value?.fromDate).format("YYYY-MM-DD"),
      toDate: moment(value?.toDate).format("YYYY-MM-DD"),
      departmentId: value.departmentId,
    };
    fetchemployeeAttendanceShiftConfigurationReport(postData);
  };



  const columns = [
    {
      title: "Id",
      dataIndex: "customEmployeeId",
      key: "customEmployeeId",
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Employee Name",
      dataIndex: "employeeName",
      key: "employeeName",
      showOnResponse: true,
      showOnDesktop: true,
    },
    ...(employeeAttendanceShiftConfigurationReport?.firstDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationReport?.firstDay,
          dataIndex: "firstDayShiftName",
          key: "firstDayShiftName",
          showOnResponse: true,
          showOnDesktop: true,
        },
      ]
      : []),

    ...(employeeAttendanceShiftConfigurationReport?.secondDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationReport?.secondDay,
          dataIndex: "secondDayShiftName",
          key: "secondDayShiftName",
          showOnResponse: true,
          showOnDesktop: true,

        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationReport?.thirdDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationReport?.thirdDay,
          dataIndex: "thirdDayShiftName",
          key: "thirdDayShiftName",
          showOnResponse: true,
          showOnDesktop: true,

        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationReport?.fourthDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationReport?.fourthDay,
          dataIndex: "fourthDayShiftName",
          key: "fourthDayShiftName",
          showOnResponse: true,
          showOnDesktop: true,

        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationReport?.fifthDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationReport?.fifthDay,
          dataIndex: "fifthDayShiftName",
          key: "fifthDayShiftName",
          showOnResponse: true,
          showOnDesktop: true,

        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationReport?.sixthDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationReport?.sixthDay,
          dataIndex: "sixthDayShiftName",
          key: "sixthDayShiftName",
          showOnResponse: true,
          showOnDesktop: true,

        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationReport?.seventhDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationReport?.seventhDay,
          dataIndex: "seventhDayShiftName",
          key: "seventhDayShiftName",
          showOnResponse: true,
          showOnDesktop: true,

        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationReport?.eighthDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationReport?.eighthDay,
          dataIndex: "eighthDayShiftName",
          key: "eighthDayShiftName",
          showOnResponse: true,
          showOnDesktop: true,

        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationReport?.ninethDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationReport?.ninethDay,
          dataIndex: "ninethDayShiftName",
          key: "ninethDayShiftName",
          showOnResponse: true,
          showOnDesktop: true,

        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationReport?.tenthDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationReport?.tenthDay,
          dataIndex: "tenthDayShiftName",
          key: "tenthDayShiftName",
          showOnResponse: true,
          showOnDesktop: true,

        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationReport?.eleventhDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationReport?.eleventhDay,
          dataIndex: "eleventhDayShiftName",
          key: "eleventhDayShiftName",
          showOnResponse: true,
          showOnDesktop: true,

        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationReport?.twelvethDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationReport?.twelvethDay,
          dataIndex: "twelvethDayShiftName",
          key: "twelvethDayShiftName",
          showOnResponse: true,
          showOnDesktop: true,

        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationReport?.thirteenthDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationReport?.thirteenthDay,
          dataIndex: "thirteenthDayShiftName",
          key: "thirteenthDayShiftName",
          showOnResponse: true,
          showOnDesktop: true,

        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationReport?.fourteenthDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationReport?.fourteenthDay,
          dataIndex: "fourteenthDayShiftName",
          key: "fourteenthDayShiftName",
          showOnResponse: true,
          showOnDesktop: true,

        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationReport?.fifteenthDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationReport?.fifteenthDay,
          dataIndex: "fifteenthDayShiftName",
          key: "fifteenthDayShiftName",
          showOnResponse: true,
          showOnDesktop: true,

        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationReport?.sixteenthDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationReport?.sixteenthDay,
          dataIndex: "sixteenthDayShiftName",
          key: "sixteenthDayShiftName",
          showOnResponse: true,
          showOnDesktop: true,

        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationReport?.seventeenthDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationReport?.seventeenthDay,
          dataIndex: "seventeenthDayShiftName",
          key: "seventeenthDayShiftName",
          showOnResponse: true,
          showOnDesktop: true,

        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationReport?.eighteenthDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationReport?.eighteenthDay,
          dataIndex: "eighteenthDayShiftName",
          key: "eighteenthDayShiftName",
          showOnResponse: true,
          showOnDesktop: true,

        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationReport?.nineteenthDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationReport?.nineteenthDay,
          dataIndex: "nineteenthDayShiftName",
          key: "nineteenthDayShiftName",
          showOnResponse: true,
          showOnDesktop: true,

        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationReport?.twentythDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationReport?.twentythDay,
          dataIndex: "twentythDayShiftName",
          key: "twentythDayShiftName",
          showOnResponse: true,
          showOnDesktop: true,

        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationReport?.twentyFirstDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationReport?.twentyFirstDay,
          dataIndex: "twentyFirstDayShiftName",
          key: "twentyFirstDayShiftName",
          showOnResponse: true,
          showOnDesktop: true,

        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationReport?.twentySecondDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationReport?.twentySecondDay,
          dataIndex: "twentySecondDayShiftName",
          key: "twentySecondDayShiftName",
          showOnResponse: true,
          showOnDesktop: true,

        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationReport?.twentyThirdDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationReport?.twentyThirdDay,
          dataIndex: "twentyThirdDayShiftName",
          key: "twentyThirdDayShiftName",
          showOnResponse: true,
          showOnDesktop: true,

        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationReport?.twentyFourthDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationReport?.twentyFourthDay,
          dataIndex: "twentyFourthDayShiftName",
          key: "twentyFourthDayShiftName",
          showOnResponse: true,
          showOnDesktop: true,

        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationReport?.twentyFifthDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationReport?.twentyFifthDay,
          dataIndex: "twentyFifthDayShiftName",
          key: "twentyFifthDayShiftName",
          showOnResponse: true,
          showOnDesktop: true,

        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationReport?.twentySixthDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationReport?.twentySixthDay,
          dataIndex: "twentySixthDayShiftName",
          key: "twentySixthDayShiftName",
          showOnResponse: true,
          showOnDesktop: true,

        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationReport?.twentySeventhDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationReport?.twentySeventhDay,
          dataIndex: "twentySeventhDayShiftName",
          key: "twentySeventhDayShiftName",
          showOnResponse: true,
          showOnDesktop: true,

        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationReport?.twentyEighthDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationReport?.twentyEighthDay,
          dataIndex: "twentyEighthDayShiftName",
          key: "twentyEighthDayShiftName",
          showOnResponse: true,
          showOnDesktop: true,

        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationReport?.twentyNinethDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationReport?.twentyNinethDay,
          dataIndex: "twentyNinethDayShiftName",
          key: "twentyNinethDayShiftName",
          showOnResponse: true,
          showOnDesktop: true,

        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationReport?.thirtythDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationReport?.thirtythDay,
          dataIndex: "thirtythDayShiftName",
          key: "thirtythDayShiftName",
          showOnResponse: true,
          showOnDesktop: true,

        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationReport?.thirtyFirstDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationReport?.thirtyFirstDay,
          dataIndex: "thirtyFirstDayShiftName",
          key: "thirtyFirstDayShiftName",
          showOnResponse: true,
          showOnDesktop: true,

        },
      ]
      : []),
  ];

  var getColumns = function () {
    return [
      { title: "Id", dataKey: "customEmployeeId" },
      { title: "Employee Name", dataKey: "employeeName" },
      ...(employeeAttendanceShiftConfigurationReport?.firstDay !== '') ? [{ title: employeeAttendanceShiftConfigurationReport?.firstDay, dataKey: "firstDayShiftName" }] : [],
      ...(employeeAttendanceShiftConfigurationReport?.secondDay !== '') ? [{ title: employeeAttendanceShiftConfigurationReport?.secondDay, dataKey: "secondDayShiftName" }] : [],
      ...(employeeAttendanceShiftConfigurationReport?.thirdDay !== '') ? [{ title: employeeAttendanceShiftConfigurationReport?.thirdDay, dataKey: "thirdDayShiftName" }] : [],
      ...(employeeAttendanceShiftConfigurationReport?.fourthDay !== '') ? [{ title: employeeAttendanceShiftConfigurationReport?.fourthDay, dataKey: "fourthDayShiftName" }] : [],
      ...(employeeAttendanceShiftConfigurationReport?.fifthDay !== '') ? [{ title: employeeAttendanceShiftConfigurationReport?.fifthDay, dataKey: "fifthDayShiftName" }] : [],
      ...(employeeAttendanceShiftConfigurationReport?.sixthDay !== '') ? [{ title: employeeAttendanceShiftConfigurationReport?.sixthDay, dataKey: "sixthDayShiftName" }] : [],
      ...(employeeAttendanceShiftConfigurationReport?.seventhDay !== '') ? [{ title: employeeAttendanceShiftConfigurationReport?.seventhDay, dataKey: "seventhDayShiftName" }] : [],
      ...(employeeAttendanceShiftConfigurationReport?.eighthDay !== '') ? [{ title: employeeAttendanceShiftConfigurationReport?.eighthDay, dataKey: "eighthDayShiftName" }] : [],
      ...(employeeAttendanceShiftConfigurationReport?.ninethDay !== '') ? [{ title: employeeAttendanceShiftConfigurationReport?.ninethDay, dataKey: "ninethDayShiftName" }] : [],
      ...(employeeAttendanceShiftConfigurationReport?.tenthDay !== '') ? [{ title: employeeAttendanceShiftConfigurationReport?.tenthDay, dataKey: "tenthDayShiftName" }] : [],
      ...(employeeAttendanceShiftConfigurationReport?.eleventhDay !== '') ? [{ title: employeeAttendanceShiftConfigurationReport?.eleventhDay, dataKey: "eleventhDayShiftName" }] : [],
      ...(employeeAttendanceShiftConfigurationReport?.twelvethDay !== '') ? [{ title: employeeAttendanceShiftConfigurationReport?.twelvethDay, dataKey: "twelvethDayShiftName" }] : [],
      ...(employeeAttendanceShiftConfigurationReport?.thirteenthDay !== '') ? [{ title: employeeAttendanceShiftConfigurationReport?.thirteenthDay, dataKey: "thirteenthDayShiftName" }] : [],
      ...(employeeAttendanceShiftConfigurationReport?.fourteenthDay !== '') ? [{ title: employeeAttendanceShiftConfigurationReport?.fourteenthDay, dataKey: "fourteenthDayShiftName" }] : [],
      ...(employeeAttendanceShiftConfigurationReport?.fifteenthDay !== '') ? [{ title: employeeAttendanceShiftConfigurationReport?.fifteenthDay, dataKey: "fifteenthDayShiftName" }] : [],
      ...(employeeAttendanceShiftConfigurationReport?.sixteenthDay !== '') ? [{ title: employeeAttendanceShiftConfigurationReport?.sixteenthDay, dataKey: "sixteenthDayShiftName" }] : [],
      ...(employeeAttendanceShiftConfigurationReport?.seventeenthDay !== '') ? [{ title: employeeAttendanceShiftConfigurationReport?.seventeenthDay, dataKey: "seventeenthDayShiftName" }] : [],
      ...(employeeAttendanceShiftConfigurationReport?.eighteenthDay !== '') ? [{ title: employeeAttendanceShiftConfigurationReport?.eighteenthDay, dataKey: "eighteenthDayShiftName" }] : [],
      ...(employeeAttendanceShiftConfigurationReport?.nineteenthDay !== '') ? [{ title: employeeAttendanceShiftConfigurationReport?.nineteenthDay, dataKey: "nineteenthDayShiftName" }] : [],
      ...(employeeAttendanceShiftConfigurationReport?.twentythDay !== '') ? [{ title: employeeAttendanceShiftConfigurationReport?.twentythDay, dataKey: "twentythDayShiftName" }] : [],
      ...(employeeAttendanceShiftConfigurationReport?.twentyFirstDay !== '') ? [{ title: employeeAttendanceShiftConfigurationReport?.twentyFirstDay, dataKey: "twentyFirstDayShiftName" }] : [],
      ...(employeeAttendanceShiftConfigurationReport?.twentySecondDay !== '') ? [{ title: employeeAttendanceShiftConfigurationReport?.twentySecondDay, dataKey: "twentySecondDayShiftName" }] : [],
      ...(employeeAttendanceShiftConfigurationReport?.twentyThirdDay !== '') ? [{ title: employeeAttendanceShiftConfigurationReport?.twentyThirdDay, dataKey: "twentyThirdDayShiftName" }] : [],
      ...(employeeAttendanceShiftConfigurationReport?.twentyFourthDay !== '') ? [{ title: employeeAttendanceShiftConfigurationReport?.twentyFourthDay, dataKey: "twentyFourthDayShiftName" }] : [],
      ...(employeeAttendanceShiftConfigurationReport?.twentyFifthDay !== '') ? [{ title: employeeAttendanceShiftConfigurationReport?.twentyFifthDay, dataKey: "twentyFifthDayShiftName" }] : [],
      ...(employeeAttendanceShiftConfigurationReport?.twentySixthDay !== '') ? [{ title: employeeAttendanceShiftConfigurationReport?.twentySixthDay, dataKey: "twentySixthDayShiftName" }] : [],
      ...(employeeAttendanceShiftConfigurationReport?.twentySeventhDay !== '') ? [{ title: employeeAttendanceShiftConfigurationReport?.twentySeventhDay, dataKey: "twentySeventhDayShiftName" }] : [],
      ...(employeeAttendanceShiftConfigurationReport?.twentyEighthDay !== '') ? [{ title: employeeAttendanceShiftConfigurationReport?.twentyEighthDay, dataKey: "twentyEighthDayShiftName" }] : [],
      ...(employeeAttendanceShiftConfigurationReport?.twentyNinethDay !== '') ? [{ title: employeeAttendanceShiftConfigurationReport?.twentyNinethDay, dataKey: "twentyNinethDayShiftName" }] : [],
      ...(employeeAttendanceShiftConfigurationReport?.thirtythDay !== '') ? [{ title: employeeAttendanceShiftConfigurationReport?.thirtythDay, dataKey: "thirtythDayShiftName" }] : [],
      ...(employeeAttendanceShiftConfigurationReport?.thirtyFirstDay !== '') ? [{ title: employeeAttendanceShiftConfigurationReport?.thirtyFirstDay, dataKey: "thirtyFirstDayShiftName" }] : [],
    ];
  };

  function exportPdf() {


    var details = ` Department: ${$(".depSelect").text()}, Year: ${employeeAttendanceShiftConfigurationReport?.year}, Month:${employeeAttendanceShiftConfigurationReport?.monthName}`;

    var doc = new jsPDF("l", "mm", "a4");
    pdfDataL(doc, details);

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

    doc.autoTable(getColumns(), employeeAttendanceShiftConfigurationReport?.employeeList, {

      headerStyles: {
        lineWidth: .01,
        lineColor: [224, 224, 224]
      },
      theme: "grid",
      styles: { fontSize: 6 },
      overflow: 'linebreak',
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
      <Card title="Shift Report">
        <Row>
          <Col
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 24, offset: 0 }}
            md={{ span: 24 }}
            lg={{ span: 20, offset: 2 }}
            xl={{ span: 20, offset: 2 }}
          >
            <Form
              layout="vertical"
              id="sessionYearInfo"
              onFinish={onsearch}
              form={form}
            >
              <Row gutter={8}>
                <Col xs={24} sm={24} md={24} lg={2} xl={2}>
                  {" "}
                </Col>

                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 16 }}
                  lg={{ span: 6 }}
                  xl={{ span: 6 }}
                >
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
                    <DatePicker
                      style={{ width: "100%" }}
                      placeholder="Select Date"
                      format={"DD/MM/YYYY"}
                    />
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
                    <DatePicker
                      style={{ width: "100%" }}
                      placeholder="Select Date"
                      format={"DD/MM/YYYY"}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={2} xl={2}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ height: 40, marginTop: 30 }}
                    icon={<SearchOutlined />}
                  >
                    Search
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <Skeleton loading={loading} paragraph={{ rows: 10 }} />
        {employeeAttendanceShiftConfigurationReport?.employeeList?.length > 0 && (
          <>
            <Row>

              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 24, offset: 0 }}
                md={{ span: 24 }}
                style={{ marginTop: 15 }}
              >

                <Table
                  dataSource={employeeAttendanceShiftConfigurationReport?.employeeList}
                  searchable
                  headerBackground="#b8d7cd"
                  searchableProps={{
                    inputProps: {
                      placeholder: "Search this table...",
                      prefix: <SearchOutlined />,
                    },
                  }}
                  columns={columns}
                />
                <br />

              </Col>
            </Row>
            <Button style={{ float: 'right' }} type="primary" icon={<DownloadOutlined />} onClick={() => exportPdf()} >PDF Download</Button>
          </>
        )}
      </Card>
    </>
  );
}
