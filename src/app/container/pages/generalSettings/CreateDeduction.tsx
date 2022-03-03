import React, { useEffect } from 'react'
import { useState } from 'react';
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import { Button, Card, Col, message, Row, Steps, Form, Input, DatePicker, Select, InputNumber, Table, Space, Tooltip, Popconfirm, Modal, Checkbox} from 'antd'
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import TableView from '../../../contents/AntTableResponsive';

export default function CreateDeduction() {
    
    const [createForm] = Form.useForm();
    const [updateForm] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState<any>(false);
    const createDeductionForm = (value) => {
        console.log('value', value);
    }
    const updateSubmitForm = (value) => {

    }

    let tableData = [
        {serial : 1, deductionHead : "Leave Entry", status : 'Disabled' },
        {serial : 2, deductionHead : "Leave Entry", status : 'Enable' }
    ]

    const columns  = [
        {title : 'SL No.', dataIndex: 'serial', key: 'serial', showOnResponse: true, showOnDesktop: true},
        {title : 'Deduction Head', dataIndex: 'deductionHead', key: 'deductionHead', showOnResponse: true, showOnDesktop: true},
        {title : 'Status', dataIndex: 'status', key: 'status', showOnResponse: true, showOnDesktop: true},
        {title : 'Action', dataIndex: '', key: '', showOnResponse: true, showOnDesktop: true,
            render: (text: any, record: any, index) => (
                <Space size="middle">
                    <Tooltip title="Edit">
                        <Button type='primary' 
                                onClick={() => {
                                    setIsModalVisible(true)
                                    updateForm.setFieldsValue({
                                        deductionUpdate: record.deductionHead,
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


    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
      }

    return (
        <>
            <Card title="Create Deduction">
                <Row>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8, offset: 8  }} lg={{ span: 8, offset: 8  }} xl={{ span: 8, offset: 8  }} >
                        <Form
                            layout="vertical"
                            
                            onFinish={createDeductionForm}
                            form={createForm}
                        >
                            <Row>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                                    <Form.Item
                                        name="deduction"
                                        label="Deduction"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please write deduction" },
                                        ]}
                                    >
                                        <Input placeholder="write deduction" />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                                    <Checkbox onChange={onChange}>(This deduction value will be use Leave or OT Calculation)</Checkbox>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                                    <Space size="small" style={{ float:"right" }} >
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
                title="Update Designation"
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
                                name="deductionUpdate"
                                label="Deduction"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please write deduction" },
                                ]}
                            >
                                <Input placeholder="Write deduction" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="status"
                                label="Status:"
                                valuePropName="checked"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please check status" },
                                ]}
                            >
                                <Checkbox>Disable</Checkbox>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}