import React, { useCallback, useEffect } from 'react'
import { useState } from 'react';
import { Button, Card, Col, Table, Form, Input, InputNumber, Popconfirm, Row, Select, Space, Tooltip, message, Modal, Checkbox, notification, Tabs, TimePicker, DatePicker, Skeleton } from 'antd'
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import TableView from '../../../contents/AntTableResponsive';
import moment from 'moment';
export default function TakeAttendanceSave() {

    const inputEmployeeAttendance = useStoreActions((state) => state.attendance.inputEmployeeAttendance);
    const fetchenabledEmployeeListTakeAttendance = useStoreActions((state) => state.generalSetting.fetchenabledEmployeeListTakeAttendance);
    const enabledEmployeeListTakeAttendance = useStoreState((state) => state.generalSetting.enabledEmployeeListTakeAttendance);
    const loading = useStoreState((state) => state.generalSetting.loading);

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
        setTableData(enabledEmployeeListTakeAttendance);
    }, [enabledEmployeeListTakeAttendance]);


    const [attendanceDate, setattendanceDate] = useState<any>(moment(new Date(), 'DD/MM/YYYY'));

    const columns = [
        {
            title: 'ID',
            dataIndex: 'employeeCustomId',
            key: 'employeeCustomId',
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
            title: 'In-Time ( HH : MM AM/PM )',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => {
                return (
                    <>
                        <Input type="time" className="ant-input" onChange={onchangeValue("inTime", record, record.index)} />
                    </>
                )

            }
        },
        {
            title: 'Out-Time ( HH : MM AM/PM )',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => {
                return (
                    <Input type="time" className="ant-input" onChange={onchangeValue("outTime", record, record.index)}></Input>
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



    return (
        <>
            <Card title="Staff Attendance Input">
                <div style={{ textAlign: "center", marginBottom: 20, marginTop: 10 }}>
                    <DatePicker
                        style={{ width: 300, height: 40 }}
                        defaultValue={attendanceDate}
                        placeholder="Select Date"
                        format={"DD/MM/YYYY"}
                        onChange={(e) => setattendanceDate(e)}
                    />
                </div>
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
                        <Space style={{ float: "right", marginTop:10 }} size={'middle'}>
                            <Button type="primary" onClick={() => {
                                if (selectedRowKeys.length === 0) {
                                    message.error('Select employee first');
                                    return
                                };
                                inputEmployeeAttendance({
                                    attendanceDate: moment(attendanceDate).format('YYYY-MM-DD'),
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
                            }}>Save</Button>
                        </Space>
                    </Col>
                </Row>
            </Card>
        </>
    )
}