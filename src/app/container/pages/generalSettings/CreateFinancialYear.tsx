import React, { useEffect } from 'react'
import { useState } from 'react';
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import { Button, Card, Col, message, Row, Steps, Form, Input, DatePicker, Select, InputNumber, Table, Space, Tooltip, Popconfirm, Modal} from 'antd'
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import TableView from '../../../contents/AntTableResponsive';

export default function CreateFinancialYear() {
    
    const [createForm] = Form.useForm();
    const createLeaveCategoryForm = (value) => {
        console.log('value', value);
    }

    let tableData = [
        {financialYear : "2021-2022", financialMonth : "January", year : "2022"}
    ]

    const columns  = [
        {title : 'Financial Year', dataIndex: 'financialYear', key: 'financialYear', showOnResponse: true, showOnDesktop: true},
        {title : 'Financial Month', dataIndex: 'financialMonth', key: 'financialMonth', showOnResponse: true, showOnDesktop: true},
        {title : 'Year', dataIndex: 'year', key: 'year', showOnResponse: true, showOnDesktop: true},
        {title : 'Action', dataIndex: '', key: '', showOnResponse: true, showOnDesktop: true,
            render: (text: any, record: any, index) => (
                <Space size="middle">
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
    ]

    return (
        <>
            <Card title="Financial Year">
                <Row>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 20, offset: 3  }} lg={{ span: 20, offset: 3  }} xl={{ span: 20, offset: 3  }} >
                        <Form
                            layout="vertical"
                            
                            onFinish={createLeaveCategoryForm}
                            form={createForm}
                        >
                            <Row>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                    <Form.Item
                                        name="financialYear"
                                        label="Financial Year"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please financial year" },
                                        ]}
                                    >
                                        <Input placeholder="write financial year" />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                    <Form.Item
                                        name="financialMonth"
                                        label="Financial Month"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please financial month" },
                                        ]}
                                    >
                                        <Input placeholder="write financial month" />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                    <Form.Item
                                        name="year"
                                        label="Year"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please write year" },
                                        ]}
                                    >
                                        <Input placeholder="write year" />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
                                    <Space size="small" >
                                        <Button type="primary" htmlType="submit" icon={<SaveOutlined />} >
                                            Save
                                        </Button>
                                    </Space>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
                <Row className='mt-30'>
                    <Col span={24}>
                        <TableView
                            antTableProps={{
                                showHeader: true,
                                columns:columns,
                                rowKey:"serial",
                                dataSource: tableData,
                                filterData: tableData,
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