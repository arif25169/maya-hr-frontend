import React, { useEffect } from 'react'
import { useState } from 'react';
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import { Button, Card, Col, message, Row, Steps, Form, Input, DatePicker, Select, InputNumber, Table, Space, Tooltip, Popconfirm, Modal} from 'antd'
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import TableView from '../../../contents/AntTableResponsive';

export default function CreateEmployeeType() {
    
    const [createForm] = Form.useForm();
    const [updateForm] = Form.useForm();
    const [employeeTypeId, setEmployeeTypeId] = useState<any>();
    const [isModalVisible, setIsModalVisible] = useState<any>(false);
    const saveEmployeeType = useStoreActions((state) => state.generalSetting.saveEmployeeType);
    const fetchEmployeeTypeList = useStoreActions((state) => state.generalSetting.fetchEmployeeTypeList);
    const employeeTypeList = useStoreState((state) => state.generalSetting.employeeTypeList);
    const updateEmployeeType = useStoreActions((state) => state.generalSetting.updateEmployeeType);
    const deleteEmployeeType = useStoreActions((state) => state.generalSetting.deleteEmployeeType);

    useEffect(function() {
        fetchEmployeeTypeList();
    }, []);


    const createEmployeeTypeForm = (value) => {
        let postData:any = {
            typeId: 0,
            typeName: value.employeeTypeName,
            typeSerial: value.serial
        }
        saveEmployeeType(postData);
    }
    const updateSubmitForm = (value) => {
        let postData:any = {
            typeId: employeeTypeId,
            typeName: value.employeeTypeAddUpdate,
            typeSerial: value.updateSerial
        }
        updateEmployeeType(postData);
        setIsModalVisible(false);
    }

    const deleteEmployeeTypeSubmit = (value) => {
        deleteEmployeeType(value);
    }


    const columns  = [
        {title : 'SL No.', dataIndex: 'typeSerial', key: 'typeSerial', showOnResponse: true, showOnDesktop: true},
        {title : 'Employee Type', dataIndex: 'typeName', key: 'typeName', showOnResponse: true, showOnDesktop: true},
        {title : 'Action', dataIndex: '', key: '', showOnResponse: true, showOnDesktop: true,
            render: (text: any, record: any, index) => (
                <Space size="middle">
                    <Tooltip title="Edit">
                        <Button type='primary' 
                                onClick={() => {
                                    setIsModalVisible(true)
                                    updateForm.setFieldsValue({
                                        employeeTypeAddUpdate: record.typeName,
                                        updateSerial: record.typeSerial,
                                    });
                                    setEmployeeTypeId(record.typeId);
                                }} 
                                icon={<EditOutlined />} 
                                
                        />
                    </Tooltip>
                    <Popconfirm
                        title="Are you sure to delete this?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => deleteEmployeeTypeSubmit(record.typeId)}
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
        {serial : 1, employeeType : "Employee Type"}
    ]

    return (
        <>
            <Card title="Create Employee Type">
                <Row>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 16, offset: 4  }} lg={{ span: 16, offset: 4  }} xl={{ span: 16, offset: 4  }} >
                        <Form
                            layout="vertical"
                            
                            onFinish={createEmployeeTypeForm}
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
                                        name="employeeTypeName"
                                        label="Employee Type"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please write employee type" },
                                        ]}
                                    >
                                        <Input placeholder="write employee type" />
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
                                dataSource: employeeTypeList,
                                filterData: employeeTypeList,
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
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                            <Form.Item
                                name="updateSerial"
                                label="Serial"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please write serial" },
                                ]}
                            >
                                <InputNumber placeholder="write serial" />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                            <Form.Item
                                name="employeeTypeAddUpdate"
                                label="Employee Type"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please write employee type" },
                                ]}
                            >
                                <Input placeholder="write employee type" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}