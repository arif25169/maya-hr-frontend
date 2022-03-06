import React, { useEffect } from 'react'
import { useState } from 'react';
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import { Button, Card, Col, message, Row, Steps, Form, Input, DatePicker, Select, InputNumber, Table, Space, Tooltip, Popconfirm, Modal} from 'antd'
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import TableView from '../../../contents/AntTableResponsive';

export default function CreateLeaveCategory() {
    
    const [createForm] = Form.useForm();
    const [updateForm] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState<any>(false);
    const createLeaveCategoryForm = (value) => {
        console.log('value', value);
    }
    const updateSubmitForm = (value) => {

    }
    const columns  = [
        {title : 'SL No.', dataIndex: 'serial', key: 'serial', showOnResponse: true, showOnDesktop: true},
        {title : 'Leave Category', dataIndex: 'leaveCategory', key: 'leaveCategory', showOnResponse: true, showOnDesktop: true},
        {title : 'Action', dataIndex: '', key: '', showOnResponse: true, showOnDesktop: true,
            render: (text: any, record: any, index) => (
                <Space size="middle">
                    <Tooltip title="Edit">
                        <Button type='primary' 
                                onClick={() => {
                                    setIsModalVisible(true)
                                    updateForm.setFieldsValue({
                                        categoryNameUpdate: record.leaveCategory,
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
        {serial : 1, leaveCategory : "Casual Leave"}
    ]

    return (
        <>
            <Card title="Leave Category">
                <Row>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8, offset: 8  }} lg={{ span: 8, offset: 8  }} xl={{ span: 8, offset: 8  }} >
                        <Form
                            layout="vertical"
                            
                            onFinish={createLeaveCategoryForm}
                            form={createForm}
                        >
                            <Row>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 20 }} lg={{ span: 20 }} xl={{ span: 20 }}>
                                    <Form.Item
                                        name="categoryName"
                                        label="Category Name"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please write category" },
                                        ]}
                                    >
                                        <Input placeholder="write category name" />
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
                title="Update Category"
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
                                name="categoryNameUpdate"
                                label="Category Name"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please write category" },
                                ]}
                            >
                                <Input placeholder="write category name" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}