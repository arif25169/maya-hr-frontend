import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Divider, Form, Input, InputNumber, Popconfirm, Row, Select, Space, Tooltip, message, Modal, Checkbox, Skeleton, } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined, CloseOutlined, DeleteOutlined, EditOutlined, SaveOutlined, SearchOutlined } from '@ant-design/icons';
import TableView from '../../../contents/AntTableResponsive';
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import 'react-multi-date-picker/styles/colors/green.css';


export default function RemarksList() {
    const remarksLits = useStoreState((state) => state.generalSetting.remarksLits);
    const fetchRemarksList = useStoreActions((state) => state.generalSetting.fetchRemarksList);
    const approveLateAttendance = useStoreActions((state) => state.generalSetting.approveLateAttendance);
    const approveAbsentAttendance = useStoreActions((state) => state.generalSetting.approveAbsentAttendance);
    useEffect(() => {
        fetchRemarksList()
    }, [])

    const columns = [
        { title: 'Employee Id', dataIndex: 'customEmployeeId', key: 'customEmployeeId', showOnResponse: true, showOnDesktop: true },
        { title: 'Employee Name', dataIndex: 'employeeName', key: 'employeeName', showOnResponse: true, showOnDesktop: true },
        { title: 'Date', dataIndex: 'attendanceDate', key: 'attendanceDate', showOnResponse: true, showOnDesktop: true },
        { title: 'Status', dataIndex: 'status', key: 'status', showOnResponse: true, showOnDesktop: true },
        { title: 'In', dataIndex: 'inTime', key: 'inTime', showOnResponse: true, showOnDesktop: true },
        { title: 'In Status', dataIndex: 'inStatus', key: 'inStatus', showOnResponse: true, showOnDesktop: true },
        { title: 'Late', dataIndex: 'late', key: 'late', showOnResponse: true, showOnDesktop: true },
        { title: 'Out', dataIndex: 'outTime', key: 'outTime', showOnResponse: true, showOnDesktop: true },
        { title: 'Out Status', dataIndex: 'outStatus', key: 'outStatus', showOnResponse: true, showOnDesktop: true },
        { title: 'Employee Remarks', dataIndex: 'employeeRemarks', key: 'employeeRemarks', showOnResponse: true, showOnDesktop: true },
        {
            title: 'Approve Late', dataIndex: '', key: '', showOnResponse: true, showOnDesktop: true,
            render: (text: any, record: any, index) => (
                <Space size="middle">

                    <Popconfirm
                        title="Are you sure to approve this?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => approveLateAttendance(record.attendanceId)}
                    >
                        <Tooltip title="Approve Late">
                            <Button type='primary' icon={<CheckCircleOutlined />} />
                        </Tooltip>
                    </Popconfirm>
                </Space>
            ),
        },
        {
            title: 'Approve Absent', dataIndex: '', key: '', showOnResponse: true, showOnDesktop: true,
            render: (text: any, record: any, index) => (
                <Space size="middle">
                    <Popconfirm
                        title="Are you sure to approve this?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => approveAbsentAttendance(record.attendanceId)}
                    >
                        <Tooltip title="Approve Absent">
                            <Button type='primary' icon={<CheckCircleOutlined />} />
                        </Tooltip>
                    </Popconfirm>

                </Space>
            ),
        },

    ];
    return (
        <>
            <Card title="Remarks List">

                {remarksLits?.length > 0 &&
                    <TableView
                        antTableProps={{
                            showHeader: true,
                            columns: columns,
                            rowKey: "customEmployeeId",
                            dataSource: remarksLits,
                            filterData: remarksLits,
                            pagination: true,
                            bordered: true
                        }}
                        mobileBreakPoint={768}
                    />
                }
            </Card>
        </>
    )

}