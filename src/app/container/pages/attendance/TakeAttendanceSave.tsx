import React, { useCallback, useEffect } from 'react'
import { useState } from 'react';
import { Button, Card, Col, Table, Form, Input, InputNumber, Popconfirm, Row, Select, Space, Tooltip, message, Modal, Checkbox, notification, Tabs, TimePicker, DatePicker, Skeleton } from 'antd'
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import TableView from '../../../contents/AntTableResponsive';
import moment from 'moment';
import { SelectDepartment } from '../../select/SelectDepartment';
import { SelectShift } from '../../select/SelectShift';
import { SearchOutlined } from '@ant-design/icons';
export default function TakeAttendanceSave() {

    const inputEmployeeAttendance = useStoreActions((state) => state.attendance.inputEmployeeAttendance);
    const fetchenabledEmployeeListTakeAttendance = useStoreActions((state) => state.generalSetting.fetchenabledEmployeeListTakeAttendance);
    const fetchemployeeListForManualInput = useStoreActions((state) => state.generalSetting.fetchemployeeListForManualInput);
    const employeeListForManualInput = useStoreState((state) => state.generalSetting.employeeListForManualInput);
    const loading = useStoreState((state) => state.generalSetting.loading);
    const fetchCompanyDepartmentList = useStoreActions((state) => state.common.fetchCompanyDepartmentList);
    const fetchCompanyShiftList = useStoreActions((state) => state.common.fetchCompanyShiftList);

    useEffect(() => {
        fetchCompanyDepartmentList();
        fetchCompanyShiftList();
    }, [])

    const [selectedRowKeys, setselectedRowKeys] = useState<any>([]);
    const [selectedValue, setselectedValue] = useState<any>([]);

    const onSelectChange = (selectedRowKeys, value) => {
        setselectedRowKeys(selectedRowKeys);
        setselectedValue(value);
        // console.log(value)
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }
    useEffect(() => {
        fetchenabledEmployeeListTakeAttendance();
    }, []);

    const [tableData, setTableData] = useState<any>([]);

    useEffect(() => {
        setTableData(employeeListForManualInput.map((item, index) => ({ ...item, index, attendanceStatus: 1 })));
    }, [employeeListForManualInput]);


    const [attendanceDate, setattendanceDate] = useState<any>(null);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'customEmployeeId',
            key: 'customEmployeeId',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Name',
            dataIndex: 'employeeName',
            key: 'employeeName',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'In-Time ',
            dataIndex: 'inTime',
            key: 'inTime',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => {
                return (
                    <>
                        {/* <Input type="time" className="ant-input" onChange={onchangeValue("inTime", record, record.index)} /> */}
                        <input className="ant-input" type="datetime-local" value={record.inTime} key={index} onChange={onchangeValue("inTime", record, record.index)} />
                        {/* <DatePicker
                            style={{width:"100%"}}
                            onChange={onchangeValue("inTime", record, record.index)}
                            showTime={{ use12Hours: true, format: "HH:mm a" }}
                            format="YYYY-MM-DD HH:mm a"
                            value={moment(record.inTime, 'YYYY/MM/DD HH:mm a')}
                        /> */}
                    </>
                )

            }
        },
        {
            title: 'Out-Time',
            dataIndex: 'outTime',
            key: 'outTime',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => {
                return (
                    <>
                        {/* <Input type="time" className="ant-input" onChange={onchangeValue("inTime", record, record.index)} /> */}
                        <input className="ant-input" type="datetime-local" value={record.outTime} key={index} onChange={onchangeValue("outTime", record, record.index)} />
                        {/* <DatePicker
                            style={{width:"100%"}}
                            onChange={onchangeValue("outTime", record, record.index)}
                            showTime={{ use12Hours: true, format: "HH:mm a" }}
                            format="YYYY-MM-DD HH:mm a"
                            value={moment(record.outTime, 'YYYY/MM/DD HH:mm a')}
                        /> */}
                    </>
                )

            }
        },
        {
            title: 'Check for Absent',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => {
                return (
                    <Checkbox checked={record?.attendanceStatus == '2' ? true : false} onChange={onchangeAbsent("attendanceStatus", record, record.index)} />
                )

            }
        },
    ];

    const onchangeValue: any =
        useCallback((key, data, index) => (e: any) => {
            const newData = [...tableData];
            console.log(e.target.value)
            newData[index][key] = e.target.value;
            setTableData(newData);
        }, [tableData]);

    const onchangeAbsent: any =
        useCallback((key, data, index) => (e: React.ChangeEvent<HTMLInputElement>) => {
            const newData = [...tableData];
            newData[index][key] = e.target.checked === true ? '2' : '1';
            setTableData(newData);
        }, [tableData]);

    const [form] = Form.useForm();

    const onSubmit = (value) => {
        setattendanceDate(moment(value?.attendanceDate).format("YYYY-MM-DD"))
        value.attendanceDate = moment(value?.attendanceDate).format("YYYY-MM-DD")
        fetchemployeeListForManualInput(value);
        setshiftId(value.shiftId)
    }

    const [shiftId, setshiftId] = useState<any>(null)

    return (
        <>
            <Card title="Staff Attendance Input">
                <Form
                    layout="vertical"
                    id="classConfigInfo"
                    form={form}
                    onFinish={onSubmit}
                >
                    <Row>
                        <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24 }} lg={{ span: 2 }} xl={{ span: 2 }}>  </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
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
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                            <Form.Item
                                name="shiftId"
                                label="Shift"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please select shift" },
                                ]}
                            >
                                <SelectShift />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                            <Form.Item
                                name="attendanceDate"
                                label="Start Date"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please select date" },
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
                {tableData?.length > 0 &&
                    <Row className="m-t-mo-30">
                        <Skeleton loading={loading} paragraph={{ rows: 10 }} />
                        <Col span={24}>
                            <div className="datatable-responsive-demo">
                                <TableView
                                    antTableProps={{
                                        showHeader: true,
                                        columns,
                                        dataSource: tableData,
                                        filterData: tableData,
                                        pagination: false,
                                        bordered: true,
                                        rowKey: "employeeId",
                                        rowSelection: rowSelection,

                                    }}
                                    mobileBreakPoint={768}
                                />
                            </div>
                            <Space style={{ float: "right", marginTop: 10 }} size={'middle'}>
                                <Button type="primary" onClick={() => {
                                    if (selectedRowKeys.length === 0) {
                                        message.error('Select employee first');
                                        return
                                    };
                                    inputEmployeeAttendance({
                                        attendanceDate: moment(attendanceDate).format('YYYY-MM-DD'),
                                        shiftId: shiftId,
                                        details: selectedValue.map(item => {
                                            return {
                                                attendanceStatus: item.attendanceStatus,
                                                employeeId: item.employeeId,
                                                inTime: item.inTime,
                                                outTime: item.outTime,
                                            }
                                        })
                                    });
                                    setselectedRowKeys([]);
                                    setselectedValue([]);
                                    setTableData([]);
                                    // setTimeout(() => {
                                    //     setTableData(employeeListForManualInput.map((item, index) => ({ ...item, index, attendanceStatus: 1 })));
                                    // }, 100);
                                }}>Save</Button>
                            </Space>
                        </Col>
                    </Row>
                }
            </Card>
        </>
    )
}