import React, { useCallback, useEffect } from 'react'
import { useState } from 'react';
import { Button, Card, Col, Table, Form, Input, InputNumber, Popconfirm, Row, Select, Space, Tooltip, message, Modal, Checkbox, notification, Tabs, TimePicker, DatePicker, Skeleton } from 'antd'
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import TableView from '../../../contents/AntTableResponsive';
import moment from 'moment';
import { SearchOutlined } from '@ant-design/icons';
import { SelectShift } from '../../select/SelectShift';

export default function UpdateAttendance() {

    const updateAttendance = useStoreActions((state) => state.attendance.updateAttendance);
    const fetchemployeeAtttendanceListForUpdate = useStoreActions((state) => state.attendance.fetchemployeeAtttendanceListForUpdate);
    const employeeAtttendanceListForUpdate = useStoreState((state) => state.attendance.employeeAtttendanceListForUpdate);
    const loading = useStoreState((state) => state.generalSetting.loading);
    const fetchCompanyShiftList = useStoreActions((state) => state.common.fetchCompanyShiftList);
    const [tableData, setTableData] = useState<any>([]);

    useEffect(() => {
        fetchCompanyShiftList();
    }, [])

    useEffect(() => {
        setTableData([])
        setTableData(employeeAtttendanceListForUpdate);
    }, [employeeAtttendanceListForUpdate]);


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
            title: 'Attendance Status',
            dataIndex: 'status',
            key: 'status',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'In Status',
            dataIndex: 'inStatus',
            key: 'inStatus',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'Out Status',
            dataIndex: 'outStatus',
            key: 'outStatus',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'In-Time',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => {
                return (
                    <input className="ant-input" type="datetime-local" value={record.inTime} key={index} onChange={onchangeValue("inTime", record, record.index)} />
                )

            }
        },
        {
            title: 'Out-Time',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => {
                return (
                    <input className="ant-input" type="datetime-local" value={record.outTime} key={index} onChange={onchangeValue("outTime", record, record.index)} />
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
        useCallback((key, data, index) => (e: React.ChangeEvent<HTMLInputElement>) => {
            const newData = [...tableData];
            newData[index][key] = e.target.value;
            setTableData(newData);
        }, [tableData]);

    const onchangeAbsent: any =
        useCallback((key, data, index) => (e: React.ChangeEvent<HTMLInputElement>) => {
            const newData = [...tableData];
            newData[index][key] = e.target.checked === true ? '2' : '1';
            setTableData(newData);
        }, [tableData]);


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
    const [form] = Form.useForm();

    const [data, setdata] = useState<any>(null);

    const onSubmit = (value) => {
        value.attendanceDate = moment(value?.attendanceDate).format("YYYY-MM-DD");
        setdata(value)
        fetchemployeeAtttendanceListForUpdate(value)
    }

    return (
        <>
            <Card title="Update Staff Attendance">
            <Form
                    layout="vertical"
                    id="classConfigInfo"
                    form={form}
                    onFinish={onSubmit}
                >
                    <Row>
                        <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 24 }} lg={{ span: 4 }} xl={{ span: 4 }}>  </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 7 }} xl={{ span: 7 }}>
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
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 7}} xl={{ span: 7 }}>
                            <Form.Item
                                name="attendanceDate"
                                label="Attendance Date"
                                className="title-Text"
                                // initialValue={moment(new Date(), 'DD/MM/YYYY')}
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

                <Skeleton loading={loading} paragraph={{ rows: 10 }} />
                {tableData?.length > 0 &&
                    <Row className="m-t-mo-30">
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
                            <Space style={{ float: "right", marginTop:10 }} size={'middle'}>
                                <Button type="primary" onClick={() => {
                                    if (selectedRowKeys.length === 0) {
                                        message.error('Select employee first');
                                        return
                                    };
                                    let updateData = selectedValue?.map(item => (
                                        { 
                                            attendanceId: item?.attendanceId,
                                            attendanceStatus: item?.attendanceStatus,
                                            inTime: item?.inTime === null ? '' : item?.inTime,
                                            outTime: item?.outTime === null ? '' : item?.outTime,
                                        }));
                                        let payload = {
                                            "attendanceDate": data.attendanceDate,
                                            "details": updateData,
                                            "shiftId": data.shiftId
                                        }
                                    updateAttendance({
                                        payload:payload,
                                        data:data
                                    });
                                    setselectedRowKeys([]);
                                    setselectedValue([]);
                                    setTableData([]);
                                }}>Update</Button>
                            </Space>
                        </Col>
                    </Row>
                }
            </Card>
        </>
    )
}