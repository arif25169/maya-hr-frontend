import React, { useCallback, useEffect } from 'react'
import { useState } from 'react';
import { Button, Card, Col, Table, Form, Input, InputNumber, Popconfirm, Row, Select, Space, Tooltip, message, Modal, Checkbox, notification, Tabs, TimePicker, DatePicker, Skeleton } from 'antd'
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import TableView from '../../../contents/AntTableResponsive';
import moment from 'moment';
import { SearchOutlined } from '@ant-design/icons';

export default function UpdateAttendance() {

    const updateAttendance = useStoreActions((state) => state.attendance.updateAttendance);
    const fetchemployeeAtttendanceListForUpdate = useStoreActions((state) => state.generalSetting.fetchemployeeAtttendanceListForUpdate);
    const employeeAtttendanceListForUpdate = useStoreState((state) => state.generalSetting.employeeAtttendanceListForUpdate);
    const loading = useStoreState((state) => state.generalSetting.loading);

    const fetchData = () => {
        fetchemployeeAtttendanceListForUpdate(moment(attendanceDate).format('YYYY-MM-DD'))
    }
    const [tableData, setTableData] = useState<any>([]);

    useEffect(() => {
        setTableData([])
        setTableData(employeeAtttendanceListForUpdate);
    }, [employeeAtttendanceListForUpdate]);

    const [attendanceDate, setattendanceDate] = useState<any>(moment(new Date(), 'DD/MM/YYYY'));

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
            title: 'In-Time ( HH : MM AM/PM )',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => {
                return (
                    <Input type="time" className="ant-input" value={record?.inTime} onChange={onchangeValue("inTime", record, record.index)}></Input>

                )

            }
        },
        {
            title: 'In-Time ( HH : MM AM/PM )',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => {
                return (
                    <Input type="time" className="ant-input" value={record?.outTime} onChange={onchangeValue("outTime", record, record.index)}></Input>
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
            <Card title="Update Staff Attendance">
                <div style={{ textAlign: "center", marginBottom: 20, marginTop: 10 }}>
                    <DatePicker
                        style={{ width: 300, height: 40 }}
                        defaultValue={attendanceDate}
                        placeholder="Select Date"
                        format={"DD/MM/YYYY"}
                        onChange={(e) => setattendanceDate(e)}
                    />
                    <Button type='primary' onClick={fetchData} style={{ marginLeft: 20, height: 40 }} icon={<SearchOutlined />}> Search</Button>
                </div>
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
                                        pagination: true,
                                        bordered: true,
                                        rowKey: "staffId",

                                    }}
                                    mobileBreakPoint={768}
                                />
                            </div>
                            <Space style={{ float: "right" }} size={'middle'}>
                                <Button type="primary" onClick={() => {
                                    updateAttendance(tableData?.map(item => ({ attendanceId: item?.attendanceId, attendanceStatus: item?.attendanceStatus, inTime: item?.inTime === null ? '' : item?.inTime, outTime: item?.outTime === null ? '' : item?.outTime, })));
                                    setTimeout(() => {
                                        fetchemployeeAtttendanceListForUpdate(moment(attendanceDate).format('YYYY-MM-DD'))
                                    }, 1000);
                                }}>Update</Button>
                            </Space>
                        </Col>
                    </Row>
                }
            </Card>
        </>
    )
}