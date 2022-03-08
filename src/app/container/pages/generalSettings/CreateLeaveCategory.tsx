import React, { useEffect } from 'react'
import { useState } from 'react';
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import { Button, Card, Col, message, Row, Steps, Form, Input, DatePicker, Select, InputNumber, Table, Space, Tooltip, Popconfirm, Modal} from 'antd'
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import TableView from '../../../contents/AntTableResponsive';

export default function CreateLeaveCategory() {

    const leaveCategoryList = useStoreState((state) => state.generalSetting.leaveCategoryList);
    const fetchleaveCategoryList = useStoreActions((state) => state.generalSetting.fetchleaveCategoryList);
    const createLeaveCategory = useStoreActions((state) => state.generalSetting.createLeaveCategory);
    const updateLeaveCategory = useStoreActions((state) => state.generalSetting.updateLeaveCategory);
    const deleteLeaveCategory = useStoreActions((state) => state.generalSetting.deleteLeaveCategory);

    useEffect(() => {
        fetchleaveCategoryList();
    }, [])

    
    const [createForm] = Form.useForm();
    const [updateForm] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState<any>(false);
    
   
    const createLeaveCategoryForm = (value) => {
        createLeaveCategory(value);
        createForm.resetFields();
    }
    const updateSubmitForm = (value) => {
        value.leaveCategoryId= id;
        updateLeaveCategory(value);
        setIsModalVisible(false);
    }
    const [id, setId] = useState<any>()
    const columns  = [
        {title : 'SL No.', dataIndex: 'serial', key: 'serial', showOnResponse: true, showOnDesktop: true},
        {title : 'Leave Category', dataIndex: 'leaveCategoryName', key: 'leaveCategoryName', showOnResponse: true, showOnDesktop: true},
        {title : 'Action', dataIndex: '', key: '', showOnResponse: true, showOnDesktop: true,
            render: (text: any, record: any, index) => (
                <Space size="middle">
                    <Tooltip title="Edit">
                        <Button type='primary' 
                                onClick={() => {
                                    setIsModalVisible(true);
                                    setId(record.leaveCategoryId);
                                    updateForm.setFieldsValue({
                                        leaveCategoryName: record.leaveCategoryName,
                                        serial: record.serial,
                                    });
                                }} 
                                icon={<EditOutlined />} 
                                
                        />
                    </Tooltip>
                    <Popconfirm
                        title="Are you sure to delete this?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => deleteLeaveCategory(record?.leaveCategoryId)}
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
            <Card title="Leave Category">
                <Row>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24, offset: 4  }} lg={{ span: 24, offset: 4 }} xl={{ span: 24, offset: 4 }} >
                        <Form
                            layout="vertical"
                            
                            onFinish={createLeaveCategoryForm}
                            form={createForm}
                        >
                            <Row>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 6 }}>
                                    <Form.Item
                                        name="serial"
                                        label="Serial"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please input serial" },
                                        ]}
                                    >
                                        <Input placeholder="Serial No" />
                                    </Form.Item>
                                </Col>                              
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 6 }}>
                                    <Form.Item
                                        name="leaveCategoryName"
                                        label="Category Name"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please write category" },
                                        ]}
                                    >
                                        <Input placeholder="Write category name" />
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
                                rowKey:"leaveCategoryId",
                                dataSource: leaveCategoryList,
                                filterData: leaveCategoryList,
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
                                        name="serial"
                                        label="Serial"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please input serial" },
                                        ]}
                                    >
                                        <Input placeholder="Serial No" />
                                    </Form.Item>
                        </Col>                        
                        <Col span={24}>
                            <Form.Item
                                name="leaveCategoryName"
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