import React, { useEffect } from 'react'
import { useState } from 'react';
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import { Button, Card, Col, message, Row, Steps, Form, Input, DatePicker, Select, InputNumber, Table, Space, Tooltip, Popconfirm, Modal} from 'antd'
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import TableView from '../../../contents/AntTableResponsive';

export default function CreateHoliday() {
    
    const [createForm] = Form.useForm();
    const [updateForm] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState<any>(false);
    const createHolidayForm = (value) => {
        console.log('value', value);
    }
    const updateSubmitForm = (value) => {

    }
    const columns  = [
        {title : 'SL No.', dataIndex: 'serial', key: 'serial', showOnResponse: true, showOnDesktop: true},
        {title : 'Holidays', dataIndex: 'holidays', key: 'holidays', showOnResponse: true, showOnDesktop: true},
        {title : 'Status', dataIndex: 'status', key: 'status', showOnResponse: true, showOnDesktop: true},
        {title : 'Action', dataIndex: '', key: '', showOnResponse: true, showOnDesktop: true,
            render: (text: any, record: any, index) => (
                <Space size="middle">
                    <Tooltip title="Edit">
                        <Button type='primary' 
                            onClick={() => {
                                setIsModalVisible(true)
                                updateForm.setFieldsValue({
                                    holidayTitleUpdate: record.holidays,
                                    fromDateUpdate: record.leaveCategory,
                                    toDateUpdate: record.leaveCategory,
                                });
                            }} 
                            icon={<EditOutlined />} 
                        />
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
    ]

    let tableData = [
        {serial : 1, holidays : "Eid Holiday", status : "Active"},
        {serial : 2, holidays : "Gov't Holiday", status : "Active"}
    ]

    return (
        <>
            <Card title="Create Holiday">
                <Row>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 20, offset: 3}} lg={{ span: 20, offset: 3}} xl={{ span: 20, offset: 3}} >
                        <Form
                            layout="vertical"
                            onFinish={createHolidayForm}
                            form={createForm}
                        >
                            <Row>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                    <Form.Item
                                        name="holidayTitle"
                                        label="Holiday Title"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please write holiday title" },
                                        ]}
                                    >
                                        <Input placeholder="write holiday title" />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                    <Form.Item
                                        name="fromDate"
                                        label="From Date"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Select from date" },
                                        ]}
                                    >
                                        <DatePicker placeholder="from date" style={{ width: "100%" }} />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                                    <Form.Item
                                        name="toDate"
                                        label="To Date"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Select to date" },
                                        ]}
                                    >
                                        <DatePicker placeholder="to date" style={{ width: "100%" }} />
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
            <Modal
                title="Update Holiday"
                visible={isModalVisible}
                //  onOk={handleOk}
                okButtonProps={{ form: 'update', htmlType: 'submit' }}
                onCancel={() => setIsModalVisible(false)}
                cancelText="Close"
                okText="Update"
                centered
                maskClosable={false}
            >
                <Form
                    layout="vertical"
                    id="update"
                    onFinish={updateSubmitForm}
                    form={updateForm}
                >
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                name="holidayTitleUpdate"
                                label="Holiday Title"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please write holiday title" },
                                ]}
                            >
                                <Input placeholder="write holiday title" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="fromDateUpdate"
                                label="From Date"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Select from date" },
                                ]}
                            >
                                <DatePicker placeholder="from date" style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="toDateUpdate"
                                label="To Date"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Select to date" },
                                ]}
                            >
                                <DatePicker placeholder="to date" style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}