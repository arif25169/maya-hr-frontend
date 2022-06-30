import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Divider, Form, Input, InputNumber, Popconfirm, Row, Select, Space, Tooltip, message, Modal, Checkbox, Skeleton, } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined, CloseOutlined, DeleteOutlined, EditOutlined, SaveOutlined, SearchOutlined } from '@ant-design/icons';
import TableView from '../../../contents/AntTableResponsive';
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import 'react-multi-date-picker/styles/colors/green.css';


export default function LeavePendingList() {
    const leaveApplicationPendingList = useStoreState((state) => state.generalSetting.leaveApplicationPendingList);
    const fetchleaveApplicationPendingList = useStoreActions((state) => state.generalSetting.fetchleaveApplicationPendingList);
    const approveLeaveApplication = useStoreActions((state) => state.generalSetting.approveLeaveApplication);
    const rejectLeaveApplication = useStoreActions((state) => state.generalSetting.rejectLeaveApplication);
    const [form] = Form.useForm();


    useEffect(() => {
        fetchleaveApplicationPendingList()
    }, [])

    const columns = [
        { title: 'Employee Name', dataIndex: 'employeeName', key: 'employeeName', showOnResponse: true, showOnDesktop: true },
        { title: 'Apply Date', dataIndex: 'applyDate', key: 'applyDate', showOnResponse: true, showOnDesktop: true },
        { title: 'Leave Category', dataIndex: 'leaveCategoryName', key: 'leaveCategoryName', showOnResponse: true, showOnDesktop: true },
        { title: 'Leave Application Dates', dataIndex: 'leaveApplicationDates', key: 'leaveApplicationDates', showOnResponse: true, showOnDesktop: true },
        { title: 'Replacement Employee Name', dataIndex: 'replacementEmployeeName', key: 'replacementEmployeeName', showOnResponse: true, showOnDesktop: true },
        { title: 'Contact No', dataIndex: 'contactNo', key: 'contactNo', showOnResponse: true, showOnDesktop: true },
        { title: 'Reason For Leave', dataIndex: 'reasonForLeave', key: 'reasonForLeave', showOnResponse: true, showOnDesktop: true },
        { title: 'Address During Leave', dataIndex: 'addressDuringLeave', key: 'addressDuringLeave', showOnResponse: true, showOnDesktop: true },
        { title: 'Application Status', dataIndex: 'applicationStatusString', key: 'applicationStatusString', showOnResponse: true, showOnDesktop: true },
        {
            title: 'Action', dataIndex: '', key: '', showOnResponse: true, showOnDesktop: true,
            render: (text: any, record: any, index) => (
                <Space size="middle">

                    <Popconfirm
                        title="Are you sure to rehect this?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => rejectLeaveApplication(record.applyId)}
                    >
                        <Tooltip title="Approve">
                            <Button danger icon={<CloseCircleOutlined  />} />
                        </Tooltip>
                    </Popconfirm>
                    <Popconfirm
                        title="Are you sure to approve this?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => approveLeaveApplication(record.applyId)}
                    >
                        <Tooltip title="Approve">
                            <Button type='primary' icon={<CheckCircleOutlined />} />
                        </Tooltip>
                    </Popconfirm>

                </Space>
            ),
        },
    ];
    return (
        <>
            <div>

                {leaveApplicationPendingList?.length > 0 &&
                    <TableView
                        antTableProps={{
                            showHeader: true,
                            columns: columns,
                            rowKey: "customEmployeeId",
                            dataSource: leaveApplicationPendingList,
                            filterData: leaveApplicationPendingList,
                            pagination: true,
                            bordered: true
                        }}
                        mobileBreakPoint={768}
                    />
                }
            </div>
        </>
    )

}