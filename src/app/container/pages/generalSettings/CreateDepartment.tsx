import React, { useEffect } from 'react'
import { useState } from 'react';
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import { Button, Card, Col, message, Row, Steps, Form, Input, DatePicker, Select, InputNumber, Table, Space, Tooltip, Popconfirm, Modal} from 'antd'
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import TableView from '../../../contents/AntTableResponsive';

export default function CreateDepartment() {
    
    const [createForm] = Form.useForm();
    const [updateForm] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState<any>(false);
    const [departmentId, setDepartmentId] = useState<any>();
    const saveDepartment = useStoreActions((state) => state.generalSetting.saveDepartment);
    const fetchDepatmentList = useStoreActions((state) => state.generalSetting.fetchDepatmentList);
    const departmentList = useStoreState((state) => state.generalSetting.departmentList);
    const updateDepartment = useStoreActions((state) => state.generalSetting.updateDepartment);
    const deleteDepartment = useStoreActions((state) => state.generalSetting.deleteDepartment);

    useEffect(function() {
        fetchDepatmentList();
    },[])

    const createDepartmentForm = (value) => {
        let postdata:any = {
            departmentId: "",
            departmentSerial: value.serial,
            departmentName: value.department
        }
        saveDepartment(postdata);
        createForm.resetFields();
    }
    const updateSubmitForm = (value) => {
        let postdata:any = {
            departmentId: departmentId,
            departmentSerial: value.serialtUpdate,
            departmentName: value.departmentUpdate
        }     
        updateDepartment(postdata);
        setIsModalVisible(false);
    }

    const deleteDepartmentSubmit = (value) => {
        deleteDepartment(value);
    }

    const columns  = [
        {title : 'SL No.', dataIndex: 'departmentSerial', key: 'departmentSerial', showOnResponse: true, showOnDesktop: true},
        {title : 'Department', dataIndex: 'departmentName', key: 'departmentName', showOnResponse: true, showOnDesktop: true},
        {title : 'Action', dataIndex: '', key: '', showOnResponse: true, showOnDesktop: true,
            render: (text: any, record: any, index) => (
                <Space size="middle">
                    <Tooltip title="Edit">
                        <Button type='primary' 
                                onClick={() => {
                                    setIsModalVisible(true)
                                    updateForm.setFieldsValue({
                                        departmentUpdate: record.departmentName,
                                        serialtUpdate: record.departmentSerial,
                                    });
                                    setDepartmentId(record.departmentId)
                                }} 
                                icon={<EditOutlined />} 
                                
                        />
                    </Tooltip>
                    <Popconfirm
                        title="Are you sure to delete this?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => deleteDepartmentSubmit(record.departmentId)}
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
            <Card title="Create Department">
                <Row>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 16, offset: 4  }} lg={{ span: 16, offset: 4  }} xl={{ span: 16, offset: 4  }} >
                        <Form
                            layout="vertical"
                            onFinish={createDepartmentForm}
                            form={createForm}
                        >
                            <Row>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 10 }} lg={{ span: 10 }} xl={{ span: 10 }}>
                                    <Form.Item
                                        name="serial"
                                        label="Serial"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please write serial" },
                                        ]}
                                    >
                                        <InputNumber placeholder="write serial" />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 10 }} lg={{ span: 10 }} xl={{ span: 10 }}>
                                    <Form.Item
                                        name="department"
                                        label="Department"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please write department" },
                                        ]}
                                    >
                                        <Input placeholder="write department name" />
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
                                dataSource: departmentList,
                                filterData: departmentList,
                                pagination: true,
                                bordered: true,                           
                            }}
                            mobileBreakPoint={768}
                        />
                    </Col>
                </Row>
            </Card>
            <Modal
                title="Update Department"
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
                                name="serialtUpdate"
                                label="Serial"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please write serial" },
                                ]}
                            >
                                <InputNumber placeholder="write serial" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="departmentUpdate"
                                label="Department"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please write department" },
                                ]}
                            >
                                <Input placeholder="write department name" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}