import React, { useEffect } from 'react'
import { useState } from 'react';
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import { Button, Card, Col, message, Row, Steps, Form, Input, DatePicker, Select, InputNumber, Table, Space, Tooltip, Popconfirm} from 'antd'
import moment from 'moment';
import { SelectGender } from '../../select/SelectGender';
import { SelectThana } from '../../select/SelectThana';
import { SelectDistrict } from '../../select/SelectDistrict';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import TableView from '../../../contents/AntTableResponsive';

export default function EmployeeList() {

    const tableColumn = [
        {title : 'Full Name', dataIndex: '', key: '', showOnResponse: true, showOnDesktop: true},
        {title : 'Emp No', dataIndex: '', key: '', showOnResponse: true, showOnDesktop: true},
        {title : 'Employee Grade', dataIndex: '', key: '', showOnResponse: true, showOnDesktop: true},
        {title : 'Department', dataIndex: '', key: '', showOnResponse: true, showOnDesktop: true},
        {title : 'Designation', dataIndex: '', key: '', showOnResponse: true, showOnDesktop: true},
        {title : 'Email', dataIndex: '', key: '', showOnResponse: true, showOnDesktop: true},
        {title : 'Region', dataIndex: '', key: '', showOnResponse: true, showOnDesktop: true},
        {title : 'Action', dataIndex: '', key: '', showOnResponse: true, showOnDesktop: true,
            render: (text: any, record: any, index) => (
                <Space size="middle">
                    <Tooltip title="Edit">
                        <Button type='primary' icon={<EditOutlined />} />
                    </Tooltip>
                    <Popconfirm
                        title="Are you sure to delete this?"
                        okText="Yes"
                        cancelText="No"
                        // onConfirm={}
                    >
                        <Tooltip title="Delete">
                            <Button danger  icon={<DeleteOutlined />} />
                        </Tooltip>
                    </Popconfirm>

                </Space>
            ),
        },
    ];
    
    return (
        <>
            <Card title="Employee List">
                <Row>
                    <Col span={24}>
                        <TableView
                            antTableProps={{
                                showHeader: true,
                                columns:tableColumn,
                                rowKey:"identificationId",
                                // dataSource: classWiseListReport,
                                // filterData: classWiseListReport,
                                pagination: true,
                                bordered: true,                           
                            }}
                            mobileBreakPoint={768}
                        />
                    </Col>
                </Row>
            </Card>
        </>
    )
}