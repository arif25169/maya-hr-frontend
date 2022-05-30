import React, { useEffect } from 'react'
import { useState } from 'react';
import { Button, Card, Col, Divider, Form, Input, InputNumber, Popconfirm, Row, Select, Space, Tooltip, message, Modal, Checkbox, notification, Tabs, Skeleton } from 'antd'
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import TableView from '../../../contents/AntTableResponsive';
import { DeleteOutlined } from '@ant-design/icons';

export default function DisabledEmployeeMapping() {

    const fetchdisabledEmployee = useStoreActions((state) => state.attendance.fetchdisabledEmployee);
    const deleteDisabledEmployee = useStoreActions((state) => state.attendance.deleteDisabledEmployee);
    const disabledEmployee = useStoreState((state) => state.attendance.disabledEmployee);


    useEffect(() => {
        fetchdisabledEmployee();
    }, []);


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
            title: 'Designation',
            dataIndex: 'designation',
            key: 'designation',
            showOnResponse: true,
            showOnDesktop: true
        },
        {
            title: 'User ID',
            showOnResponse: true,
            showOnDesktop: true,
            dataIndex: 'userId',
            key: 'userId',
        },
        {
            title: 'Update',
            showOnResponse: true,
            showOnDesktop: true,
            render: (text: any, record: any, index) => {
                return (
                    <Popconfirm
                        title="Are you sure to delete this?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => deleteDisabledEmployee(record?.mapId)}
                    >
                        <Tooltip title="Delete">
                            <Button danger icon={<DeleteOutlined />} />
                        </Tooltip>
                    </Popconfirm>

                )

            }
        },

    ];

    return (
        <>
            <Card title="Disabled Employee Machine ID Map List" className='box-shadow-none'>
                <Row className="m-t-mo-30">
                    <Col span={24}>

                    </Col>
                    <Col span={24}>
                        <div className="datatable-responsive-demo">
                            <TableView
                                antTableProps={{
                                    showHeader: true,
                                    columns,
                                    dataSource: disabledEmployee,
                                    filterData: disabledEmployee,
                                    pagination: false,
                                    bordered: true,
                                    rowKey: "employeeId",
                                }}
                                mobileBreakPoint={768}
                            />

                        </div>
                    </Col>
                </Row>
            </Card>
        </>
    )
}