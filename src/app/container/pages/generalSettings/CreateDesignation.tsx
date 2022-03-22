import React, { useEffect } from 'react'
import { useState } from 'react';
import { useStoreActions, useStoreState } from '../../../store/hooks/easyPeasy';
import { Button, Card, Col, message, Row, Steps, Form, Input, DatePicker, Select, InputNumber, Table, Space, Tooltip, Popconfirm, Modal} from 'antd'
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import TableView from '../../../contents/AntTableResponsive';

export default function CreateDesignation() {
    
    const [createForm] = Form.useForm();
    const [updateForm] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState<any>(false);
    const [designationId, setDesignationId] = useState<any>();
    const saveDesignation = useStoreActions((state) => state.generalSetting.saveDesignation);
    const fetchDesignationList = useStoreActions((state) => state.generalSetting.fetchDesignationList);
    const designationList = useStoreState((state) =>  state.generalSetting.designationList);
    const updateDesignation = useStoreActions((state) => state.generalSetting.updateDesignation);
    const deleteDesignation = useStoreActions((state) =>  state.generalSetting.deleteDesignation);
    useEffect( function() {
        fetchDesignationList()
    }, []);

    const createDesignationForm = (value) => {
        let postdata:any = {
            designationId: 0,
            designationName: value.designation,
            // designationSerial: value.serial
        }
        saveDesignation(postdata);
        createForm.resetFields();
    }
    const updateSubmitForm = (value) => {
        let postdata:any = {
            designationId: designationId,
            designationName: value.designationUpdate,
            designationSerial: value.serialtUpdate
        }
        updateDesignation(postdata);
        setIsModalVisible(false);
    }

    const deleteDesignationSubmit = (value) => {
        deleteDesignation(value);
    }

    const columns  = [
        {title : 'SL No.', dataIndex: 'designationSerial', key: 'designationSerial', showOnResponse: true, showOnDesktop: true},
        {title : 'Designation', dataIndex: 'designationName', key: 'designationName', showOnResponse: true, showOnDesktop: true},
        {title : 'Action', dataIndex: '', key: '', showOnResponse: true, showOnDesktop: true,
            render: (text: any, record: any, index) => (
                <Space size="middle">
                    <Tooltip title="Edit">
                        <Button type='primary' 
                                onClick={() => {
                                    setIsModalVisible(true)
                                    updateForm.setFieldsValue({
                                        designationUpdate: record.designationName,
                                        serialtUpdate: record.designationSerial
                                    });
                                    setDesignationId(record.designationId)
                                }} 
                                icon={<EditOutlined />} 
                                
                        />
                    </Tooltip>
                    <Popconfirm
                        title="Are you sure to delete this?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => deleteDesignationSubmit(record.designationId)}
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
            <Card title="Create Designation">
                <Row>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 16, offset: 4  }} lg={{ span: 16, offset: 4  }} xl={{ span: 16, offset: 4  }} >
                        <Form
                            layout="vertical"
                            
                            onFinish={createDesignationForm}
                            form={createForm}
                        >
                            <Row>
                                {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 10 }} lg={{ span: 10 }} xl={{ span: 10 }}>
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
                                </Col> */}
                                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 10 }} lg={{ span: 10 }} xl={{ span: 10 }}>
                                    <Form.Item
                                        name="designation"
                                        label="Designation"
                                        className="title-Text"
                                        rules={[
                                            { required: true, message: "Please write designation" },
                                        ]}
                                    >
                                        <Input placeholder="write designation name" />
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
                                dataSource: designationList,
                                filterData: designationList,
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
                                name="designationUpdate"
                                label="Designation"
                                className="title-Text"
                                rules={[
                                    { required: true, message: "Please write designation" },
                                ]}
                            >
                                <Input placeholder="write designation name" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}