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
  SearchOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { SelectDepartment } from "../../select/SelectDepartment";

import { SelectShiftConfig } from "../../select/SelectShiftConfig";

export default function EmployeeShiftConfig() {
  const { Option } = Select;
  const [form] = Form.useForm();

  const employeeAttendanceShiftConfigurationList = useStoreState(
    (state) => state.attendance.employeeAttendanceShiftConfigurationList
  );
  const fetchemployeeAttendanceShiftConfigurationList = useStoreActions(
    (state) => state.attendance.fetchemployeeAttendanceShiftConfigurationList
  );    
  const setemployeeAttendanceShiftConfigurationList = useStoreActions(
    (state) => state.attendance.setemployeeAttendanceShiftConfigurationList
  );  
  const saveShiftConfiguration = useStoreActions(
    (state) => state.attendance.saveShiftConfiguration
  );
  const loading = useStoreState((state) => state.attendance.loading);
  const fetchCompanyDepartmentList = useStoreActions(
    (state) => state.common.fetchCompanyDepartmentList
  );
  useEffect(() => {
    setemployeeAttendanceShiftConfigurationList([]);
    fetchCompanyDepartmentList();
  }, []);

  const [search, setsearch] = useState<any>(null);

  const onsearch = (value) => {
    let postData = {
      fromDate: moment(value?.fromDate).format("YYYY-MM-DD"),
      toDate: moment(value?.toDate).format("YYYY-MM-DD"),
      departmentId: value.departmentId,
    };
    setsearch(postData)
    fetchemployeeAttendanceShiftConfigurationList(postData);
  };

  const onSave = (e, val, index) => {
    let saveData = {
      "dayIndex": index,
      "employeeId": val.employeeId,
      "monthName": employeeAttendanceShiftConfigurationList?.monthName,
      "shiftId": e,
      "year": employeeAttendanceShiftConfigurationList?.year
    };
    let payload = {
      saveData: saveData,
      search: search
    };
    saveShiftConfiguration(payload)
  }

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
    ...(employeeAttendanceShiftConfigurationList?.firstDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationList?.firstDay,
          dataIndex: "firstDayShiftId",
          key: "firstDayShiftId",
          showOnResponse: true,
          showOnDesktop: true,
          render: (text, record) => {
            return <SelectShiftConfig style={{ width: "100%" }} onChange={(e) => onSave(e, record, "01")} defaultSelected={record?.firstDayShiftId} />
          },
        },
      ]
      : []),

    ...(employeeAttendanceShiftConfigurationList?.secondDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationList?.secondDay,
          dataIndex: "secondDayShiftId",
          key: "secondDayShiftId",
          showOnResponse: true,
          showOnDesktop: true,
          render: (text, record) => {
            return <SelectShiftConfig style={{ width: "100%" }} onChange={(e) => onSave(e, record, "02")} defaultSelected={record?.secondDayShiftId} />
          },
        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationList?.thirdDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationList?.thirdDay,
          dataIndex: "thirdDayShiftId",
          key: "thirdDayShiftId",
          showOnResponse: true,
          showOnDesktop: true,
          render: (text, record) => {
            return <SelectShiftConfig style={{ width: "100%" }} onChange={(e) => onSave(e, record, "03")} defaultSelected={record?.thirdDayShiftId} />
          },
        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationList?.fourthDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationList?.fourthDay,
          dataIndex: "fourthDayShiftId",
          key: "fourthDayShiftId",
          showOnResponse: true,
          showOnDesktop: true,
          render: (text, record) => {
            return <SelectShiftConfig style={{ width: "100%" }} onChange={(e) => onSave(e, record, "04")} defaultSelected={record?.fourthDayShiftId} />
          },
        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationList?.fifthDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationList?.fifthDay,
          dataIndex: "fifthDayShiftId",
          key: "fifthDayShiftId",
          showOnResponse: true,
          showOnDesktop: true,
          render: (text, record) => {
            return <SelectShiftConfig style={{ width: "100%" }} onChange={(e) => onSave(e, record, "05")} defaultSelected={record?.fifthDayShiftId} />
          },
        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationList?.sixthDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationList?.sixthDay,
          dataIndex: "sixthDayShiftId",
          key: "sixthDayShiftId",
          showOnResponse: true,
          showOnDesktop: true,
          render: (text, record) => {
            return <SelectShiftConfig style={{ width: "100%" }} onChange={(e) => onSave(e, record, "06")} defaultSelected={record?.sixthDayShiftId} />
          },
        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationList?.seventhDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationList?.seventhDay,
          dataIndex: "seventhDayShiftId",
          key: "seventhDayShiftId",
          showOnResponse: true,
          showOnDesktop: true,
          render: (text, record) => {
            return <SelectShiftConfig style={{ width: "100%" }} onChange={(e) => onSave(e, record, "07")} defaultSelected={record?.seventhDayShiftId} />
          },
        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationList?.eighthDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationList?.eighthDay,
          dataIndex: "eighthDayShiftId",
          key: "eighthDayShiftId",
          showOnResponse: true,
          showOnDesktop: true,
          render: (text, record) => {
            return <SelectShiftConfig style={{ width: "100%" }} onChange={(e) => onSave(e, record, "08")} defaultSelected={record?.eighthDayShiftId} />
          },
        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationList?.ninethDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationList?.ninethDay,
          dataIndex: "ninethDayShiftId",
          key: "ninethDayShiftId",
          showOnResponse: true,
          showOnDesktop: true,
          render: (text, record) => {
            return <SelectShiftConfig style={{ width: "100%" }} onChange={(e) => onSave(e, record, "09")} defaultSelected={record?.ninethDayShiftId} />
          },
        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationList?.tenthDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationList?.tenthDay,
          dataIndex: "tenthDayShiftId",
          key: "tenthDayShiftId",
          showOnResponse: true,
          showOnDesktop: true,
          render: (text, record) => {
            return <SelectShiftConfig style={{ width: "100%" }} onChange={(e) => onSave(e, record, "10")} defaultSelected={record?.tenthDayShiftId} />
          },
        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationList?.eleventhDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationList?.eleventhDay,
          dataIndex: "eleventhDayShiftId",
          key: "eleventhDayShiftId",
          showOnResponse: true,
          showOnDesktop: true,
          render: (text, record) => {
            return <SelectShiftConfig style={{ width: "100%" }} onChange={(e) => onSave(e, record, "11")} defaultSelected={record?.eleventhDayShiftId} />
          },
        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationList?.twelvethDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationList?.twelvethDay,
          dataIndex: "twelvethDayShiftId",
          key: "twelvethDayShiftId",
          showOnResponse: true,
          showOnDesktop: true,
          render: (text, record) => {
            return <SelectShiftConfig style={{ width: "100%" }} onChange={(e) => onSave(e, record, "12")} defaultSelected={record?.twelvethDayShiftId} />
          },
        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationList?.thirteenthDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationList?.thirteenthDay,
          dataIndex: "thirteenthDayShiftId",
          key: "thirteenthDayShiftId",
          showOnResponse: true,
          showOnDesktop: true,
          render: (text, record) => {
            return <SelectShiftConfig style={{ width: "100%" }} onChange={(e) => onSave(e, record, "13")} defaultSelected={record?.thirteenthDayShiftId} />
          },
        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationList?.fourteenthDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationList?.fourteenthDay,
          dataIndex: "fourteenthDayShiftId",
          key: "fourteenthDayShiftId",
          showOnResponse: true,
          showOnDesktop: true,
          render: (text, record) => {
            return <SelectShiftConfig style={{ width: "100%" }} onChange={(e) => onSave(e, record, "14")} defaultSelected={record?.fourteenthDayShiftId} />
          },
        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationList?.fifteenthDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationList?.fifteenthDay,
          dataIndex: "fifteenthDayShiftId",
          key: "fifteenthDayShiftId",
          showOnResponse: true,
          showOnDesktop: true,
          render: (text, record) => {
            return <SelectShiftConfig style={{ width: "100%" }} onChange={(e) => onSave(e, record, "15")} defaultSelected={record?.fifteenthDayShiftId} />
          },
        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationList?.sixteenthDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationList?.sixteenthDay,
          dataIndex: "sixteenthDayShiftId",
          key: "sixteenthDayShiftId",
          showOnResponse: true,
          showOnDesktop: true,
          render: (text, record) => {
            return <SelectShiftConfig style={{ width: "100%" }} onChange={(e) => onSave(e, record, "16")} defaultSelected={record?.sixteenthDayShiftId} />
          },
        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationList?.seventeenthDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationList?.seventeenthDay,
          dataIndex: "seventeenthDayShiftId",
          key: "seventeenthDayShiftId",
          showOnResponse: true,
          showOnDesktop: true,
          render: (text, record) => {
            return <SelectShiftConfig style={{ width: "100%" }} onChange={(e) => onSave(e, record, "17")} defaultSelected={record?.seventeenthDayShiftId} />
          },
        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationList?.eighteenthDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationList?.eighteenthDay,
          dataIndex: "eighteenthDayShiftId",
          key: "eighteenthDayShiftId",
          showOnResponse: true,
          showOnDesktop: true,
          render: (text, record) => {
            return <SelectShiftConfig style={{ width: "100%" }} onChange={(e) => onSave(e, record, "18")} defaultSelected={record?.eighteenthDayShiftId} />
          },
        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationList?.nineteenthDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationList?.nineteenthDay,
          dataIndex: "nineteenthDayShiftId",
          key: "nineteenthDayShiftId",
          showOnResponse: true,
          showOnDesktop: true,
          render: (text, record) => {
            return <SelectShiftConfig style={{ width: "100%" }} onChange={(e) => onSave(e, record, "19")} defaultSelected={record?.nineteenthDayShiftId} />
          },
        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationList?.twentythDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationList?.twentythDay,
          dataIndex: "twentythDayShiftId",
          key: "twentythDayShiftId",
          showOnResponse: true,
          showOnDesktop: true,
          render: (text, record) => {
            return <SelectShiftConfig style={{ width: "100%" }} onChange={(e) => onSave(e, record, "20")} defaultSelected={record?.twentythDayShiftId} />
          },
        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationList?.twentyFirstDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationList?.twentyFirstDay,
          dataIndex: "twentyFirstDayShiftId",
          key: "twentyFirstDayShiftId",
          showOnResponse: true,
          showOnDesktop: true,
          render: (text, record) => {
            return <SelectShiftConfig style={{ width: "100%" }} onChange={(e) => onSave(e, record, "21")} defaultSelected={record?.twentyFirstDayShiftId} />
          },
        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationList?.twentySecondDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationList?.twentySecondDay,
          dataIndex: "twentySecondDayShiftId",
          key: "twentySecondDayShiftId",
          showOnResponse: true,
          showOnDesktop: true,
          render: (text, record) => {
            return <SelectShiftConfig style={{ width: "100%" }} onChange={(e) => onSave(e, record, "22")} defaultSelected={record?.twentySecondDayShiftId} />
          },
        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationList?.twentyThirdDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationList?.twentyThirdDay,
          dataIndex: "twentyThirdDayShiftId",
          key: "twentyThirdDayShiftId",
          showOnResponse: true,
          showOnDesktop: true,
          render: (text, record) => {
            return <SelectShiftConfig style={{ width: "100%" }} onChange={(e) => onSave(e, record, "23")} defaultSelected={record?.twentyThirdDayShiftId} />
          },
        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationList?.twentyFourthDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationList?.twentyFourthDay,
          dataIndex: "twentyFourthDayShiftId",
          key: "twentyFourthDayShiftId",
          showOnResponse: true,
          showOnDesktop: true,
          render: (text, record) => {
            return <SelectShiftConfig style={{ width: "100%" }} onChange={(e) => onSave(e, record, "24")} defaultSelected={record?.twentyFourthDayShiftId} />
          },
        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationList?.twentyFifthDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationList?.twentyFifthDay,
          dataIndex: "twentyFifthDayShiftId",
          key: "twentyFifthDayShiftId",
          showOnResponse: true,
          showOnDesktop: true,
          render: (text, record) => {
            return <SelectShiftConfig style={{ width: "100%" }} onChange={(e) => onSave(e, record, "25")} defaultSelected={record?.twentyFifthDayShiftId} />
          },
        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationList?.twentySixthDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationList?.twentySixthDay,
          dataIndex: "twentySixthDayShiftId",
          key: "twentySixthDayShiftId",
          showOnResponse: true,
          showOnDesktop: true,
          render: (text, record) => {
            return <SelectShiftConfig style={{ width: "100%" }} onChange={(e) => onSave(e, record, "26")} defaultSelected={record?.twentySixthDayShiftId} />
          },
        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationList?.twentySeventhDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationList?.twentySeventhDay,
          dataIndex: "twentySeventhDayShiftId",
          key: "twentySeventhDayShiftId",
          showOnResponse: true,
          showOnDesktop: true,
          render: (text, record) => {
            return <SelectShiftConfig style={{ width: "100%" }} onChange={(e) => onSave(e, record, "27")} defaultSelected={record?.twentySeventhDayShiftId} />
          },
        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationList?.twentyEighthDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationList?.twentyEighthDay,
          dataIndex: "twentyEighthDayShiftId",
          key: "twentyEighthDayShiftId",
          showOnResponse: true,
          showOnDesktop: true,
          render: (text, record) => {
            return <SelectShiftConfig style={{ width: "100%" }} onChange={(e) => onSave(e, record, "28")} defaultSelected={record?.twentyEighthDayShiftId} />
          },
        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationList?.twentyNinethDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationList?.twentyNinethDay,
          dataIndex: "twentyNinethDayShiftId",
          key: "twentyNinethDayShiftId",
          showOnResponse: true,
          showOnDesktop: true,
          render: (text, record) => {
            return <SelectShiftConfig style={{ width: "100%" }} onChange={(e) => onSave(e, record, "29")} defaultSelected={record?.twentyNinethDayShiftId} />
          },
        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationList?.thirtythDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationList?.thirtythDay,
          dataIndex: "thirtythDayShiftId",
          key: "thirtythDayShiftId",
          showOnResponse: true,
          showOnDesktop: true,
          render: (text, record) => {
            return <SelectShiftConfig style={{ width: "100%" }} onChange={(e) => onSave(e, record, "30")} defaultSelected={record?.thirtythDayShiftId} />
          },
        },
      ]
      : []),
    ...(employeeAttendanceShiftConfigurationList?.thirtyFirstDay !== ''
      ? [
        {
          title: employeeAttendanceShiftConfigurationList?.thirtyFirstDay,
          dataIndex: "thirtyFirstDayShiftId",
          key: "thirtyFirstDayShiftId",
          showOnResponse: true,
          showOnDesktop: true,
          render: (text, record) => {
            return <SelectShiftConfig style={{ width: "100%" }} onChange={(e) => onSave(e, record, "31")} defaultSelected={record?.thirtyFirstDayShiftId} />
          },
        },
      ]
      : []),
  ];

  return (
    <>
      <Card title="Shift Configuration">
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
        {employeeAttendanceShiftConfigurationList?.employeeShiftList?.length > 0 && (
          <Row>

            <Col
              xs={{ span: 24, offset: 0 }}
              sm={{ span: 24, offset: 0 }}
              md={{ span: 24 }}
              style={{ marginTop: 15 }}
            >
              {/* <TableView
                antTableProps={{
                  showHeader: true,
                  columns: columns,
                  rowKey: "customEmployeeId",
                  dataSource: employeeAttendanceShiftConfigurationList?.staffList,
                  filterData: employeeAttendanceShiftConfigurationList?.staffList,
                  pagination: true,
                  bordered: true,
                }}
                mobileBreakPoint={768}
              /> */}
              <Table
                dataSource={employeeAttendanceShiftConfigurationList?.employeeShiftList}
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
        )}
      </Card>
    </>
  );
}
